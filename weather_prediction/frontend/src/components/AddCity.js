import React from 'react'
import { useState } from 'react'


// allow a user to enter a city name in a form and submit it
const AddCity = ({ onAdd }) => {
  const [city, setCity] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    // if city doesn't excist, ask user to add a city
    if (!city) {
      alert('Please add a city')
      return
    }

    // pass an object to the function
    onAdd({ city })

    // clear the form
    setCity('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>City</label>
        <input
          type='text'
          placeholder='Add City'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <input type='submit' value='Get City Weather' className='btn btn-block' />
    </form>
  )
}

export default AddCity;