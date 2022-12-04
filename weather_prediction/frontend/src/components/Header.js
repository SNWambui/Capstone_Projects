import PropTypes from 'prop-types'
import React from 'react';
// import { useLocation } from 'react-router-dom'
// import Button from './Button'

const Header = ({ title }) => {
  return (
    <header className='header'
    style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '100px' }}
    >
      <h1>{title}</h1>
    </header>
  )
}

Header.defaultProps = {
  title: 'Farmer Weather Hub',
}



// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header