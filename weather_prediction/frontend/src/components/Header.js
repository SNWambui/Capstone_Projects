import PropTypes from 'prop-types'
import React from 'react';
// import { useLocation } from 'react-router-dom'
// import Button from './Button'

const Header = ({ title,text }) => {
  return (
    <header className='App-header'
    style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: 'auto' }}
    >
      <h1 className='App-h1'>{title}</h1>
      <h3 className='App-h3'>{text}</h3>
    </header>
  )
}

Header.defaultProps = {
  title: 'Farmer Weather Hub',
  text: "A Hub to get 5 day weather forecast, look at historical weather patterns and get 12 month forecast"
}



// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header