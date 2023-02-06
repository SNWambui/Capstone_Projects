# Importing necessary libraries
import uvicorn 
import pickle
import jwt
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from hashing import Hash
from urllib.request import urlopen

# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.pipeline import Pipeline
# from sklearn.pipeline import make_pipeline
# from sklearn.preprocessing import StandardScaler
# from sklearn.ensemble import RandomForestRegressor    
# from sklearn import *  
# from ml_model import final_model1                                                                          


# Initializing the fast API server
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost"
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://crop-decision-hub.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading up the trained model
# model = pickle.load(open('/Users/stevedavieswambui/Desktop/Capstone_projects/Different_Apps/crop_decision/backend/api-1/model/bean_normal_model', 'rb'))
model = pickle.load(open('bean_normal_model.pkl', 'rb'))
# import cloudpickle as cp
# model = cp.load(urlopen("https://github.com/SNWambui/Capstone_Projects/blob/99ceecc42da3ffcad91bec2ec927fff047017ad6/crop_decision/backend/api/model/bean_normal_model.pkl"))
# crops_lst = ["dryBeansHgha", "greenCoffeeHgha", "potatoesHgha", "riceHgha", "teaLeavesHgha"] 
# soil_lst = ["manureLeachedSoilKg", "manureNormalSoilKg", "manureVolatiliseSoilKg"]

# uploaded csv to google then converted url to tiny, read the csv
# crop_data = pd.read_csv("https://tinyurl.com/crops-datas")

# def final_model(data, crop, soil, soils, crops=crops_lst):
#     lst_copy = soils.copy()
#     lst_copy.remove(soil)
#     # print("This is dcrop data",data)
#     X = data.drop(crops+lst_copy, axis =1)
#     y = data[crop]
#     sc = StandardScaler()
    
    
#     x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=123)
#     print("x_train", len(x_train.columns))
#     # x_train = sc.fit_transform(x_train)
#     # y_train = sc.fit_transform(y_train)
#     regr = make_pipeline(StandardScaler(), RandomForestRegressor())
#     # regr = RandomForestRegressor()
#     regr.fit(x_train, y_train)

#     return regr

# models = final_model(crop_data, "dryBeansHgha","manureNormalSoilKg",soil_lst)
# model = final_model1(crop_data, "dryBeansHgha","manureNormalSoilKg",soil_lst)

# Defining the model input types for normal soil
class YieldNormal(BaseModel):
    cropDrainedCarbonKtns: float
    cropDrainedNitrogenKtns:  float
    potashKgha: float
    nitrogenEmissionsKtns: float
    nitrogenKgha: float
    phosphateKgha: float
    manureNormalSoilKg: float
    avgRainMm: float
    avgTempC: float
    carbonEmissionsKtns: float
    methaneEmissionsKtns: float 
    pesticidesKgha: float

# Defining the model input types for leached soil
class YieldLeached(BaseModel):
    cropDrainedCarbonKtns: float
    cropDrainedNitrogenKtns:  float
    potashKgha: float
    nitrogenEmissionsKtns: float
    nitrogenKgha: float
    phosphateKgha: float
    manureLeachedSoilKg: float
    avgRainMm: float
    avgTempC: float
    carbonEmissionsKtns: float
    methaneEmissionsKtns: float 
    pesticidesKgha: float

# Defining the model input types for votalise soil
class YieldVotalise(BaseModel):
    cropDrainedCarbonKtns: float
    cropDrainedNitrogenKtns:  float
    potashKgha: float
    nitrogenEmissionsKtns: float
    nitrogenKgha: float
    phosphateKgha: float
    manureVolatiliseSoilKg: float
    avgRainMm: float
    avgTempC: float
    carbonEmissionsKtns: float
    methaneEmissionsKtns: float 
    pesticidesKgha: float


SECERT_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

test_users = {
    1:{
    "username": "stevedavies",
    "password": "temipassword",
    "email": "stevedaviesndegwa@gmail.com"
    }
}

class LoginItem(BaseModel):
    username: str
    password: str

class User(BaseModel):
    username: str
    email: str
    password1: str
    password2: str
    # password2: str

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to crop yield prediction system"}

# Setting up the prediction route
@app.post("/prediction/")
async def get_predict(data: YieldNormal):
    sample = [[
        data.cropDrainedCarbonKtns,
        data.cropDrainedNitrogenKtns,
        data.potashKgha,
        data.nitrogenEmissionsKtns,
        data.nitrogenKgha,
        data.phosphateKgha,
        data.manureNormalSoilKg,
        data.avgRainMm,
        data.avgTempC,
        data.carbonEmissionsKtns,
        data.manureNormalSoilKg,
        data.pesticidesKgha
    ]]
    
    # print("THis is sample", sample)
    return {
        "data":{
            'prediction': model.predict(sample).tolist()[0],
            'interpretation': "hehe"
        }
    }

# function to handle login and authentication
@app.post("/login/")
async def user_login(loginitem:LoginItem):


    data = jsonable_encoder(loginitem)
    for i in test_users:
        if data['username']== test_users[i]['username'] and data['password1']== test_users[i]['password']:

            encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
            return {"token": encoded_jwt}

        else:
            return {"message":"login failed"}

@app.post("/register/")
async def register(request: User):

    data = jsonable_encoder(User)
    print("this is data", data)
    # hashed_pass = Hash.bcrypt(request.password)
    user_object = dict(request)
    user_object["username"] = request.username
    user_object["email"] = request.email
    user_object["password"] = request.password
    test_users[list(test_users)[-1]+1] = user_object
    return {"message":"created"}


# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')
    uvicorn.run(app, host='0.0.0.0', port=8080, debug=True)