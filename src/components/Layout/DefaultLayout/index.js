import React from 'react'
import Header from './Header'


const DefaultLayout = ({ children }) => {
 
  return (
    <div>
      <Header />
      <div className='wrap-content'>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout