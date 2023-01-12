import React from 'react'
import Header from './Header'


export default function Base({title = 'Welcome to our website',children}) {
  return (
    <div>
        <Header/>
      <div style={{paddingTop:'50px'}}>

      
        {children}
        
        
</div>

    </div>
  )
}
