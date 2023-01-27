import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor    
from sklearn import *            

crops_lst = ["dryBeansHgha", "greenCoffeeHgha", "potatoesHgha", "riceHgha", "teaLeavesHgha"] 
soil_lst = ["manureLeachedSoilKg", "manureNormalSoilKg", "manureVolatiliseSoilKg"]

# uploaded csv to google then converted url to tiny, read the csv
crop_data = pd.read_csv("https://tinyurl.com/crops-datas")

def final_model1(data, crop, soil, soils, crops=crops_lst):
    lst_copy = soils.copy()
    lst_copy.remove(soil)
    # print("This is dcrop data",data)
    X = data.drop(crops+lst_copy, axis =1)
    y = data[crop]
    sc = StandardScaler()
    
    
    x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=123)
    print("x_train", x_train.columns)
    # x_train = sc.fit_transform(x_train)
    # y_train = sc.fit_transform(y_train)
    regr = make_pipeline(StandardScaler(), RandomForestRegressor())
    # regr = RandomForestRegressor()
    regr.fit(x_train, y_train)

    return regr

model = final_model1(crop_data, "dryBeansHgha","manureNormalSoilKg",soil_lst)