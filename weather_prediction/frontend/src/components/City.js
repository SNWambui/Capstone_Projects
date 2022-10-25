import React from 'react'
import { FaTimes } from 'react-icons/fa'

const City = ({ city, onToggle, onDelete }) => {
  return (
    <div
      className={city}
      onDoubleClick={() => onToggle(city.id)}
    >
      <h3>
        {city.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(city.id)}
        />
      </h3>
    </div>
  )
}

export default City;