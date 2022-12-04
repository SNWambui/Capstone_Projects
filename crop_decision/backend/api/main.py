# Importing necessary libraries
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    Crop_Drained_CO2_ktns: float
    Crop_Drained_N2O_ktns:  float
    K2O_kgha_per_croparea: float
    Nitrogen_emissions_ktns: float
    Nitrogen_kgha_per_croparea: float
    P205_kgha_per_croparea: float
    avg_manure_soil_kg: float
    avg_rain_mm: float
    avg_temp_c: float
    carbon_emissions_ktns: float
    methane_emissions_ktns: float 
    pesticides_kgha_per_croparea: float

# Defining the model input types for leached soil
class YieldLeached(BaseModel):
    Crop_Drained_CO2_ktns: float
    Crop_Drained_N2O_ktns:  float
    K2O_kgha_per_croparea: float
    Nitrogen_emissions_ktns: float
    Nitrogen_kgha_per_croparea: float
    P205_kgha_per_croparea: float
    avg_manure_leach_soil_kg: float
    avg_rain_mm: float
    avg_temp_c: float
    carbon_emissions_ktns: float
    methane_emissions_ktns: float 
    pesticides_kgha_per_croparea: float

# Defining the model input types for votalise soil
class YieldVotalise(BaseModel):
    Crop_Drained_CO2_ktns: float
    Crop_Drained_N2O_ktns:  float
    K2O_kgha_per_croparea: float
    Nitrogen_emissions_ktns: float
    Nitrogen_kgha_per_croparea: float
    P205_kgha_per_croparea: float
    avg_manure_votalise_soil_kg: float
    avg_rain_mm: float
    avg_temp_c: float
    carbon_emissions_ktns: float
    methane_emissions_ktns: float 
    pesticides_kgha_per_croparea: float

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to online employee hireability prediction model"}

# Setting up the prediction route
@app.post("/prediction/")
async def get_predict(data: YieldNormal):
    sample = [[
        data.Crop_Drained_CO2_ktns,
        data.Crop_Drained_N2O_ktns,
        data.K2O_kgha_per_croparea,
        data.Nitrogen_emissions_ktns,
        data.Nitrogen_kgha_per_croparea,
        data.P205_kgha_per_croparea,
        data.avg_manure_soil_kg,
        data.avg_rain_mm,
        data.avg_temp_c,
        data.carbon_emissions_ktns,
        data.methane_emissions_ktns,
        data.pesticides_kgha_per_croparea
    ]]
    
    

    return {
        "data":{
            'prediction': model.predict(sample).tolist()[0],
            'interpretation': "hehe"
        }
    }

# Configuring the server host and port
if __name__ == '__main__':
    # uvicorn.run(app, port=8080, host='0.0.0.0')
    uvicorn.run(app, host='0.0.0.0', port=8080, debug=True)