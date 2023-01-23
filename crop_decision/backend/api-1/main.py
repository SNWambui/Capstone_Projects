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
model = pickle.load(open('/Users/stevedavieswambui/Desktop/Capstone_projects/Different_Apps/crop_decision/backend/api-1/model/bean_normal_model.pkl', 'rb'))
# import cloudpickle as cp
# model = cp.load(urlopen("https://github.com/SNWambui/Capstone_Projects/blob/99ceecc42da3ffcad91bec2ec927fff047017ad6/crop_decision/backend/api/model/bean_normal_model.pkl"))


# Defining the model input types for normal soil
class YieldNormal(BaseModel):
    cropDrainedCarbonKtns: float
    cropDrainedNitrogenKtns:  float
    potashKgha: float
    nitrogenEmissionsKtns: float
    nitrogenKgha: float
    phosphadeKgha: float
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