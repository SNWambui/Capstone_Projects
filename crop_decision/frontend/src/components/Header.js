/*
This handles the header for the app with the title and text at the top
*/

import React from 'react'

const Header = ({ title, text}) => {
    return (
      <header className='App-header'
      style={{ height: '214px', width: '1024px', objectFit: 'cover', objectPosition: '-50% 0'}}
      >
        <h1 className='App-h1'>{title}</h1>
        <h3 className='App-h3'>{text}</h3>
      </header>
    )
  }
  
  Header.defaultProps = {
    title: 'Crop Decision Hub',
    text: 'A hub to determine crop yield based on your given set of conditions'
  }

export default Header
