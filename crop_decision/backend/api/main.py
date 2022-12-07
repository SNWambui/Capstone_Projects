# Importing necessary libraries
import uvicorn
import pickle
import jwt
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder


# Initializing the fast API server
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost"
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading up the trained model
model = pickle.load(open('/Users/stevedavieswambui/Desktop/Capstone_projects/Different_Apps/crop_decision/backend/model/bean_normal_model', 'rb'))

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

test_user = {
   "username": "temitope",
    "password": "temipassword"

}

class LoginItem(BaseModel):
    username: str
    password: str


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

    if data['username']== test_user['username'] and data['password']== test_user['password']:

        encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt}

    else:
        return {"message":"login failed"}

# Configuring the server host and port
if __name__ == '__main__':
    # uvicorn.run(app, port=8080, host='0.0.0.0')
    uvicorn.run(app, host='0.0.0.0', port=8080, debug=True)