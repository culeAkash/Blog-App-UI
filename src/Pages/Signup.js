import React from 'react'
import Base from '../Components/Base'
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap'

export default function Signup() {
  return (
      <Container className='mt-3'>
        <Row>
          <Col 
          md={{
            offset: 3,
            size: 6
          }}
          sm="12">
        <Card outline color='dark'>

          <CardHeader className='text-center'>
              <h2>Signup Page</h2>
          </CardHeader>
          <CardBody>
            {/* Creating form */}
            <Form>

              {/* Name field */}
              <FormGroup>
                <Label for='name'>Name : </Label>
                <Input id='name' type='text' placeholder='Enter your name here'/>
              </FormGroup>

              <FormGroup>
                <Label for='email'>Email : </Label>
                <Input id='email' type='email' placeholder='Enter Email here'/>
              </FormGroup>

              <FormGroup>
                <Label for='password'>Password : </Label>
                <Input id='password'  type='password' placeholder='Enter Password here'/>
              </FormGroup>

              <FormGroup>
                <Label for='desc'>Description : </Label>
                <Input id='desc' type='textarea' placeholder='Enter Description here' style={{height:'200px'}}/>
              </FormGroup>

              <Container className='text-center'>
                <Button color='success' style={{marginRight:'10px'}} type='submit'>Submit</Button>
                <Button color='warning' type='reset'>Reset</Button>
              </Container>

            </Form>
          </CardBody>

        </Card>
        </Col>
        </Row>
      </Container>
  )
}
