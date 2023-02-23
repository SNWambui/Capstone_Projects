import React from 'react'
import { useState } from 'react'


// allow a user to enter a city name in a form and submit it
const AddCity = ({ onAdd }) => {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')

  // handle submission to form and check that a user enterned the city
  const onSubmit = (e) => {
    e.preventDefault()

    // if city doesn't exist, ask user to add a city
    if (!city) {
      // alert('Please add a city')
      setError("Please Add A City")
      return
    }

    // pass an object to the function
    onAdd({ city })

    // clear the form
    // setCity('')
    setError(""); // clear error message
  }
  
  // handle changes to the form 
  const onChange = (e) =>{
    setCity(e.target.value)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <input
          type='text'
          placeholder='Add City'
          value={city}
          onChange={onChange}
        />
      </div>
      <div>
        {error && 
        <p style={{color: 'red'}}>{error}</p>}
      </div>
      <input type='submit' value='Get 5-day Forecast' className='btn btn-block' />
    </form>
  )
}

export default AddCity;