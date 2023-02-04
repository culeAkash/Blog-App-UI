import React from 'react'
import { Container } from 'reactstrap'
import NewFeed from '../Components/NewFeed'

export default function Home() {
  return (
    <React.Fragment>
      <Container className='mt-4'>
        <NewFeed/>
      </Container>
    </React.Fragment>
  )
}
