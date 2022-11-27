import urllib.request
from rest_framework.response import Response
from rest_framework import viewsets, views, permissions
from rest_framework.decorators import api_view
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from django.conf import settings
from django.http import HttpResponse, StreamingHttpResponse
from django.template import engines
from django.views.generic import TemplateView

# modules and libraries for prediction
import pandas as pd
import numpy as np
import scipy
from pandas import read_json, DataFrame
# from sklearn.preprocessing import MinMaxScaler
# from tensorflow import keras
# from tensorflow.keras.preprocessing.sequence import TimeseriesGenerator
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense
# from tensorflow.keras.layers import LSTM

def iter_response(response, chunk_size=65536):
    '''Function to deal with increasingly large file sizes for development
    since production builds are optimized. Function uses django's streaming
    response API
    '''
    try:
        while True:
            data = response.read(chunk_size)
            if not data:
                break
            yield data
    finally:
        response.close()

def catchall_dev(request, upstream='http://localhost:3000'):
    '''Function to get the templates from the react path for development
    settings instead of using URL temlate loader. Handles html, CSS and 
    JS
    '''
    upstream_url = upstream + request.path
    response = urllib.request.urlopen(upstream_url)
    content_type = response.getheader('Content-Type')

    if content_type == 'text/html; charset=UTF-8':
        response_text = response.read().decode()
        response.close()
        return HttpResponse(
            engines['django'].from_string(response_text).render(),
            content_type=content_type,
            status=response.status,
            reason=response.reason,
        )
    else:
        return StreamingHttpResponse(
            iter_response(response),
            content_type=content_type,
            status=response.status,
            reason=response.reason,
        )

class FileView(APIView):

    def post(self, request, format=None):
        # the current format is a list of dictionaries
        file_obj = request.data

        # read list of dict into dict, if json, use read_json
        weather = DataFrame(file_obj)

        # clean up the data
        weather = weather.rename(columns={'Month Average': 'months', 'Temperature - (Celsius)': 'temp', 'Rainfall - (MM)': 'rain'})
        weather['months'] = weather['months'].str.replace(' Average', '')       
        d = dict(zip(pd.date_range('2000-01-01', freq='M', periods=12).strftime('%b'), range(1,13)))
        weather['months_num'] = weather.months.map(d)
        weather.drop('months', axis=1, inplace=True)
        weather['months'] = weather['Year'].astype('str') + '-' + weather['months_num'].astype('str') + '-01'
        weather['months'] = pd.to_datetime(weather.months)        
        weather.drop(['Year', 'months_num'], axis=1, inplace=True)
        weather.set_index('months', inplace=True)

        rnn_train = weather[:300]
        rnn_test = weather[300:]

        from sklearn.preprocessing import MinMaxScaler
        scaler = MinMaxScaler()
        scaler.fit(rnn_train)
        scaled_train = scaler.transform(rnn_train)
        scaled_test = scaler.transform(rnn_test)

        # from tensorflow import keras
        from keras.preprocessing.sequence import TimeseriesGenerator

        # define generator
        n_input = 12
        n_features = 2
        generator = TimeseriesGenerator(
            scaled_train, scaled_train, length=n_input, batch_size=1)

        from keras.models import Sequential
        from keras.layers import Dense
        from keras.layers import LSTM

        # define model
        model = Sequential()
        model.add(LSTM(100, activation='relu',
                  input_shape=(n_input, n_features)))
        model.add(Dense(2))
        model.compile(optimizer='adam', loss='mse')

        model.summary()
        #change epochs as appropriate
        model.fit(generator, epochs=10)

        # last_train_batch = scaled_train[-12:]
        # last_train_batch = last_train_batch.reshape((1, n_input, n_features))
        # model.predict(last_train_batch)

        test_predictions = []

        first_eval_batch = scaled_train[-n_input:]
        current_batch = first_eval_batch.reshape((1, n_input, n_features))

        for i in range(len(rnn_test)):
            # get the prediction value for the first batch
            current_pred = model.predict(current_batch)[0]

            # append the prediction into the array
            test_predictions.append(current_pred)

            # use the prediction to update the batch and remove the first value
            current_batch = np.append(current_batch[:, 1:, :], [
                                      [current_pred]], axis=1)

        true_predictions = scaler.inverse_transform(test_predictions)
        rnn_test[['temp_preds', 'rain_preds']] = true_predictions

        # print("This is rnn test", rnn_test.to_json())

        return Response({
            "data": rnn_test.to_json(),})
        # return Response({"data": 20})

# during production, the template is loaded from frontend/build/static
catchall_prod = TemplateView.as_view(template_name='index.html')

# run the dev static from react side if debug is true else from frontend i
# ie deebug is false and we are in production.
catchall = catchall_dev if settings.DEBUG else catchall_prod