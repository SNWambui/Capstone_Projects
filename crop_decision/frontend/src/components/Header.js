import React from 'react'

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
    title: 'Crop Decision Hub',
  }

export default Header