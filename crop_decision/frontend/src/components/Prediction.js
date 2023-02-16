import React from 'react'
import './prediction.css'
import { useState } from 'react'
import axios from 'axios'
import {MdInfo} from 'react-icons/md'
import {IconButton, Tooltip} from '@mui/material'
import Select from 'react-select'

function Prediction() {
    // define the hooks for controlled input fields for prediction
    const [cropDrainedCarbonKtns, setDrainedCarbon] = useState('')
    const [cropDrainedNitrogenKtns, setDrainedNitrogen] = useState('')
    const [potashKgha, setPotassium] = useState('')
    const [nitrogenKgha, setNitrogen] = useState('')
    const [phosphateKgha, setPhosphorus] = useState('')
    const [manureNormalSoilKg, setManure] = useState('')
    const [avgRainMm, setRain] = useState('')
    const [avgTempC, setTemp] = useState('')
    const [nitrogenEmissionsKtns, setNitrogenEmission] = useState('264.7563')//default value is set to be national 2020 value
    const [carbonEmissionsKtns, setCarbonEmissions] = useState('3678.1397')//default value is set to be national 2020 value
    const [methaneEmissionsKtns, setMethaneEmissions] = useState('4449.9555')//default value is set to be national 2020 value for optional inpute
    const [pesticidesKgha, setPesticides] = useState('')

    // hook to store the user message and predicted output
    const [userOutput, setUserOutput] = useState('')

    // var to store list of crop options
    const [selectCrop, setSelectCrop] = useState({label:'Bean', value:'bean'})
    const optionsList = [
      { label: 'Beans', value: 'beans' },
      { label: 'Rice', value: 'rice' },
      { label: 'Tea', value: 'tea' },
      { label: 'Coffee', value: 'coffee' },
      { label: 'Potato', value: 'potato' }
    ];
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const params = { 
        crop: selectCrop.value, avgRainMm,avgTempC,carbonEmissionsKtns,cropDrainedCarbonKtns,cropDrainedNitrogenKtns,
        manureNormalSoilKg,methaneEmissionsKtns,nitrogenEmissionsKtns,nitrogenKgha,pesticidesKgha,phosphateKgha,potashKgha
      }
      axios
        .post(`http://localhost:8000/prediction/${selectCrop.value}`, params)
        // .post('https://crop-decision.herokuapp.com/prediction', params) //updated to include hosted site
        .then((res) => {
          const data = res.data.data
          console.log("this is data", data)
          const msg = `Total Predicted Yield of ${selectCrop.value} is ${data.prediction} Kilograms per Hectare`
          setUserOutput(msg)
          reset()
        })
        .catch((error) => alert(`Error: ${error.message}`))
    }
  
    const reset = () => {
      setSelectCrop(null);
      setDrainedCarbon('')
      setDrainedNitrogen('')
      setPotassium('')
      setNitrogen('')
      setPhosphorus('')
      setNitrogenEmission('')
      setManure('')
      setRain('')
      setTemp('')
      setCarbonEmissions('')
      setMethaneEmissions('')
      setPesticides('')
    }
  return (
    <div className="glass">
      <div className="glass__inputs">
      <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
        <h3>Crops</h3>
        {/* <Select options={optionsList} defaultValue={{ label: "Select Crop", value: 0 }}/> */}
        <Select
          options={optionsList}
          value={selectCrop}
          onChange={(choice) => setSelectCrop(choice)}
        />
        <h3>Crop Conditions</h3>
        <h4>The numbers in Brackets reflect the range for values.</h4><h4> Enter the minimum value if a condition doesn't apply</h4>
        <div className="glass__form__group">
          <p>Drained Soil CO2 (65.0 - 80.0)</p>
          <input
            id="cropDrainedCarbonKtns"
            className="glass__form__input"
            placeholder="Drained Soil CO2 (65.0 - 80.0)"
            required
            autoFocus
            min="65"
            max="80"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="Drained Soil CO2 emissions between (65.0 - 80.0)"
            type="number"
            step="0.01"
            value={cropDrainedCarbonKtns}
            onChange={(e) => setDrainedCarbon(e.target.value)}
          />
           <Tooltip title="This is how much CO2 has been drained from the soil (you can use a soil testing kit to determine the value)">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>
        <div className="glass__form__group">
          <p>Drained Soil N20 (0.0250 - 0.0350)</p>
          <input
            id="cropDrainedNitrogenKtns"
            className="glass__form__input"
            placeholder="Drained Soil N20 (0.0250 - 0.0350)"
            required
            autoFocus
            min="0.0250"
            max="0.0350"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="Drained Soil N20 emissions between (0.0250 - 0.0350)"
            type="number"
            step="0.0001"
            value={cropDrainedNitrogenKtns}
            onChange={(e) => setDrainedNitrogen(e.target.value)}
          />
           <Tooltip title="This is how much N20 has been drained from the soil (you can use a soil testing kit to determine the value)">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>

        <div className="glass__form__group">
          <p>Potassium Fertlizer in kg/ha (0 - 30)</p>
          <input
            id="potashKgha"
            className="glass__form__input"
            placeholder="Potassium Fertlizer in kg/ha (0 - 30)"
            required
            autoFocus
            min="0"
            max="30"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="Potassium Fertlizer in kg/ha (0 - 30)"
            type="number"
            step="0.01"
            value={potashKgha}
            onChange={(e) => setPotassium(e.target.value)}
          />
           <Tooltip title="This is how much potassium fertilizer you have used in the given piece of land in kg per hectare">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>

        <div className="glass__form__group">
          <p>Nitrogen Fertlizer in kg/ha (0 - 30)</p>
          <input
            id="nitrogenKgha"
            className="glass__form__input"
            placeholder="Nitrogen Fertlizer in kg/ha (0 - 30)"
            required
            autoFocus
            min="0"
            max="30"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="Nitrogen Fertlizer in kg/ha (0 - 30)"
            type="number"
            step="0.01"
            value={nitrogenKgha}
            onChange={(e) => setNitrogen(e.target.value)}
          />
           <Tooltip title="This is how much nitrogen fertilizer you have used in the given piece of land in kg per hectare">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>
        
        <div className="glass__form__group">
          <p>Phosphorus Fertlizer in kg/ha (0 - 30)</p>
          <input
            id="phosphateKgha"
            className="glass__form__input"
            placeholder="phosphorus Fertlizer in kg/ha (0 - 30)"
            required
            autoFocus
            min="0"
            max="30"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="phosphorus Fertlizer in kg/ha (0 - 30)"
            type="number"
            step="0.01"
            value={phosphateKgha}
            onChange={(e) => setPhosphorus(e.target.value)}
          />
           <Tooltip title="This is how much nitrogen fertilizer you have used in the given piece of land in kg per hectare">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>

        
        <div className="glass__form__group">
          <p>Average manure in kg (range: 100000 - 1000000)</p>
          <input
            id="manureNormalSoilKg"
            className="glass__form__input"
            placeholder="manure Average in kg (100000 - 1000000)"
            optional
            autoFocus
            min="100000"
            max="10000000"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="manure Average in kg (100000 - 1000000)"
            type="number"
            step="0.01"
            value={manureNormalSoilKg}
            onChange={(e) => setManure(e.target.value)}
          />
           <Tooltip title="This is how much manure you have used in the given piece of land in kg per hectare (this field is optional)">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>

        <div className="glass__form__group">
          <p>Annual Average Rain in mm (200 - 1500)</p>
          <input
            id="avgRainMm"
            className="glass__form__input"
            placeholder="rain annual average in mm (200 - 1500)"
            required
            autoFocus
            min="200"
            max="1500"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="rain annual average in mm (200 - 1500)"
            type="number"
            step="0.01"
            value={avgRainMm}
            onChange={(e) => setRain(e.target.value)}
          />
          <Tooltip title="This is how much rain your city has received in a given year (visit this link to see)">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>

        <div className="glass__form__group">
          <p>Annual Temperature Avg C (15 - 35)</p>
          <input
            id="avgTempC"
            className="glass__form__input"
            placeholder="temp annual avg C (15 - 35)"
            required
            autoFocus
            min="15"
            max="35"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="temp annual avg C (15 - 35)"
            type="number"
            step="0.01"
            value={avgTempC}
            onChange={(e) => setTemp(e.target.value)}
          />
          <Tooltip title="This is the average temperature your city has had in a given year (visit this link to see)">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>

        <div className="glass__form__group">
          <p>Totals Pesticides in kg/ha per croparea (0.15 - 2.00)</p>
          <input
            id="pesticidesKgha"
            className="glass__form__input"
            placeholder="pesticides Totals in kgha per croparea (0.15 - 2.00)"
            required
            autoFocus
            min="0.15"
            max="2.00"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="pesticides Totals in kgha per croparea (0.15 - 2.00))"
            type="number"
            step="0.01"
            value={pesticidesKgha}
            onChange={(e) => setPesticides(e.target.value)}
          />
          <Tooltip title="This is the total pesticides you used on your farm per hectare">
          <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <h4>These Fields are optional and country-level</h4>
          <h4>Please fill the values if you know, otherwise leave as is</h4>
        </div>
        <div className="glass__form__group">
          <p>Total Nitrogen Emissions in kt (100 - 300)</p>
          <input
            id="nitrogenEmissionsKtns"
            className="glass__form__input"
            placeholder="Nitrogen Emissions Totals in kt (100 - 300)"
            optional
            autoFocus
            min="100"
            max="300"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="Nitrogen Emissions Totals in kt (100 - 300)"
            type="number"
            step="0.0001"
            value={nitrogenEmissionsKtns}
            onChange={(e) => setNitrogenEmission(e.target.value)}
          />
          <Tooltip title="This is the total nitrogen emissions from Kenya">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>
        <div className="glass__form__group">
          <p>Total Methane Emissions in kt (1500 - 5000)</p>
          <input
            id="methaneEmissionsKtns"
            className="glass__form__input"
            placeholder="Methane Emissions Totals in kt (1500 - 5000)"
            optional
            autoFocus
            min="1500"
            max="5000"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="Methane Emissions Totals in kt (1500 - 5000)"
            type="number"
            step="0.0001"
            value={methaneEmissionsKtns}
            onChange={(e) => setMethaneEmissions(e.target.value)}
          />
          <Tooltip title="This is the total methane emissions from Kenya">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>

        <div className="glass__form__group">
          <p>Total Carbon Emissions in kt (1500 - 50000)</p>
          <input
            id="carbonEmissionsKtns"
            className="glass__form__input"
            placeholder="carbon Emissions Totals in kt (1500 - 50000)"
            optional
            autoFocus
            min="1500"
            max="50000"
            pattern="[0-9]+([\.,][0-9]+)?"
            title="carbon Emissions Totals in kt (1500 - 50000)"
            type="number"
            step="0.0001"
            value={carbonEmissionsKtns}
            onChange={(e) => setCarbonEmissions(e.target.value)}
          />
          <Tooltip title="This is the total carbon emissions from Kenya">
            <IconButton>
              <MdInfo/>
            </IconButton>
          </Tooltip>
        </div>

        <div className="glass__form__group">
          <button type="submit" className="glass__form__btn">
            Submit
          </button>
        </div>
      </form> 
      </div>
      <div className='glass__output'>
        <h3>{"Prediction"}</h3>
        <p>{userOutput}</p>
      </div>
  </div>
  
  )
}

export default Prediction;