import React from 'react'
import './prediction.css'
import { useState } from 'react'
import axios from 'axios'

function Prediction() {
    const [drainedCarbon, setDrainedCarbon] = useState('')
    const [drainedNitrogen, setDrainedNitrogen] = useState('')
    const [potassium, setPotassium] = useState('')
    const [nitrogen, setNitrogen] = useState('')
    const [phosphorus, setPhosphorus] = useState('')
    const [nitrogenEmission, setNitrogenEmission] = useState('')
    const [manure, setManure] = useState('')
    const [rain, setRain] = useState('')
    const [temp, setTemp] = useState('')
    const [carbonEmissions, setCarbonEmissions] = useState('')
    const [methaneEmissions, setMethaneEmissions] = useState('')
    const [pesticides, setPesticides] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const params = { 
        drainedCarbon,drainedNitrogen, potassium,nitrogenEmission, nitrogen, phosphorus,
        manure, rain, temp, carbonEmissions, methaneEmissions, pesticides
      }
      axios
        .post('http://localhost:8080/prediction', params)
        .then((res) => {
          const data = res.data.data
          const parameters = JSON.stringify(params)
          const msg = `Prediction: ${data.prediction}`
          alert(msg)
          reset()
        })
        .catch((error) => alert(`Error: ${error.message}`))
    }
  
    const reset = () => {
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
    <form onSubmit={(e) => handleSubmit(e)} className="glass__form">
      <h4>Crop Conditions</h4>
      <div className="glass__form__group">
        <input
          id="drainedCO2"
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
          value={drainedCarbon}
          onChange={(e) => setDrainedCarbon(e.target.value)}
        />
      </div>
      <div className="glass__form__group">
        <input
          id="drainedCO2"
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
          value={drainedNitrogen}
          onChange={(e) => setDrainedNitrogen(e.target.value)}
        />
      </div>

      <div className="glass__form__group">
        <input
          id="potassium"
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
          value={potassium}
          onChange={(e) => setPotassium(e.target.value)}
        />
      </div>


      <div className="glass__form__group">
        <input
          id="nitrogen"
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
          value={nitrogen}
          onChange={(e) => setNitrogen(e.target.value)}
        />
      </div>
      
      <div className="glass__form__group">
        <input
          id="phosphorus"
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
          value={phosphorus}
          onChange={(e) => setPhosphorus(e.target.value)}
        />
      </div>

      <div className="glass__form__group">
        <input
          id="nitrogenEmission"
          className="glass__form__input"
          placeholder="Nitrogen Emissions Totals in kt (100 - 300)"
          optional
          autoFocus
          min="100"
          max="300"
          pattern="[0-9]+([\.,][0-9]+)?"
          title="Nitrogen Emissions Totals in kt (100 - 300)"
          type="number"
          step="0.01"
          value={nitrogenEmission}
          onChange={(e) => setNitrogenEmission(e.target.value)}
        />
      </div>
      <div className="glass__form__group">
        <input
          id="carbonEmissions"
          className="glass__form__input"
          placeholder="carbon Emissions Totals in kt (100 - 300)"
          optional
          autoFocus
          min="100"
          max="300"
          pattern="[0-9]+([\.,][0-9]+)?"
          title="carbon Emissions Totals in kt (100 - 300)"
          type="number"
          step="0.01"
          value={carbonEmissions}
          onChange={(e) => setCarbonEmissions(e.target.value)}
        />
      </div>

      <div className="glass__form__group">
        <input
          id="manure"
          className="glass__form__input"
          placeholder="manure Totals in kg (100000 - 1000000)"
          optional
          autoFocus
          min="100000"
          max="10000000"
          pattern="[0-9]+([\.,][0-9]+)?"
          title="manure Totals in kg (100000 - 1000000)"
          type="number"
          step="0.01"
          value={manure}
          onChange={(e) => setManure(e.target.value)}
        />
      </div>

      <div className="glass__form__group">
        <input
          id="rain"
          className="glass__form__input"
          placeholder="rain annual average in mm (100 - 300)"
          required
          autoFocus
          min="200"
          max="1500"
          pattern="[0-9]+([\.,][0-9]+)?"
          title="rain annual average in mm (200 - 1500)"
          type="number"
          step="0.01"
          value={rain}
          onChange={(e) => setRain(e.target.value)}
        />
      </div>

      <div className="glass__form__group">
        <input
          id="temp"
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
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
        />
      </div>

      <div className="glass__form__group">
        <input
          id="pesticides"
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
          value={pesticides}
          onChange={(e) => setPesticides(e.target.value)}
        />
      </div>

      <div className="glass__form__group">
        <button type="submit" className="glass__form__btn">
          Submit
        </button>
      </div>
    </form>
  </div>
  )
}

export default Prediction;