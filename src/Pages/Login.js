import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'

export default function Login() {
  return (
    <Container style={{marginTop:'20vh'}}>

      <Row>
        <Col
        md={{
          offset: 3,
          size: 6
        }}
        sm="12"
        >
          <Card outline color='dark'> 
            <CardHeader className='text-center'>
              <h2>Login here</h2>
            </CardHeader>

            <CardBody>
              <Form>
                <FormGroup>
                  <Label for='useremail'>Email : </Label>
                  <Input id='useremail' placeholder='Enter your email' type='email'/>
                </FormGroup>

                <FormGroup>
                  <Label for='pass'>Password : </Label>
                  <Input id='pass' placeholder='Enter your password' type='password'/>
                </FormGroup>

                <Container className='text-center' fluid>
                  <Button color='primary' type='submit' outline>Login</Button>
                  <Button color='warning' type='reset' className='mx-2'>Reset</Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}
