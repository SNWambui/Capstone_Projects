import React from 'react'
import City from './City'

const Cities = ({ cities, onToggle, onDelete }) => {
  return (
    <>
      {cities.map((city, index) => (
        <City key={index} city={city} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Cities