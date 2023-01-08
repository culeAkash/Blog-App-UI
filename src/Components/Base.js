import React from 'react'

export default function Base({title = 'Welcome to our website',children}) {
  return (
    <React.Fragment>
        <h1>This is our header</h1>

        {children}

        <h1>This is our footer</h1>
    </React.Fragment>
  )
}
