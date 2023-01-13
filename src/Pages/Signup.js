import React, { useState, useEffect, useCallback } from 'react'
import Base from '../Components/Base'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import FormValidationError from '../Components/FormValidationError';

export default function Signup() {


  //Declaring the state varibles
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');

  const [isSubmitValid, setisSubmitValid] = useState(false);

  const [error, setError] = useState();

  const [nameErr, setnameErr] = useState({
    isValid : null,
  });

  const [emailErr, setemailErr] = useState({
    isValid : null,
  });

  const [passwordErr, setpasswordErr] = useState({
    isValid : null,
  });



    //handlers for changing state variables
    const nameChangeHandler = (event) => {
      console.log("Inside name change handler");
      const userName = event.target.value;
      setName(userName);
      nameValidateHandler(userName);
    }
  
    const emailChangeHandler = (event => {
      setEmail(event.target.value);
      const userEmail = event.target.value;
      emailValidateHandler(userEmail);
    })
  
    const passwordChangeHandler = (event => {
      setPassword(event.target.value);
      passwordValidateHandler(event.target.value);
    })
  
    const aboutChangeHandler = (event => {
      setAbout(event.target.value);
    })


    //handling blurs
    const onNameBlurHandler = ()=>{
      nameValidateHandler(name);
    }

    const emailBlurHandler = ()=>{
      emailValidateHandler(email);
    }

    const passwordBlurHandler = ()=>{
      passwordValidateHandler(password);
    }

  //validating name value in form
    const nameValidateHandler = (userName)=>{
        let messages = [];
        let isValid = true;
        if(userName.trim().length<8 || userName.trim().length>28){
            messages = [...messages,'Name must be between 8 and 28 characters']
            isValid = false;
        }
        var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(format.test(userName.trim())){
            console.log("Contains special character");
            messages = [...messages,'Name must not contain special characters']
            isValid = false;
        }
        
        setnameErr({isValid,messages});
    }

    

    //Validating email value in form
    const emailValidateHandler = (userEmail)=>{
        let isValid = true;
        let messages = [];
        if(userEmail.trim().length===0){
            isValid = false;
            messages =[...messages,'Email must not be empty']
        }
        if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userEmail))){
            messages = [...messages,'Enter a valid Email']
            isValid = false
        }
        setemailErr({isValid,messages})
    }

    //Validating Password
    const passwordValidateHandler = (userPassword)=>{
        let isValid = true;
        let messages = [];

        if(userPassword.trim().length===0){
            isValid =false;
            messages = [...messages,'Password must not be empty']
        }

        if(/[A-Z]/.test(userPassword)===false){
            isValid =false;
            messages = [...messages,'Password must contain one Uppercase Character']
        }

        if(/[a-z]/.test(userPassword)===false){
            isValid =false;
            messages = [...messages,'Password must contain one Lowercase Character']
        }

        if(/\d/.test(userPassword)===false){
            isValid = false;
            messages = [...messages,'Password must contain one numeric digit']
        }

        let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(!format.test(userPassword)){
            isValid = false;
            messages = [...messages,'Password must contain one special character']
        }

        setpasswordErr({isValid,messages});
    }


    useEffect(() => {
     const timeout =  setTimeout(() => {

      if(nameErr.isValid && passwordErr.isValid && emailErr.isValid)
        setisSubmitValid(true);
      }, 500);
      
      return () => {
        clearTimeout(timeout)
      };
    }, [name,email,password,about,nameValidateHandler,passwordValidateHandler,emailValidateHandler]);

    const submitFormHandler = (event=>{
      event.preventDefault();
      nameValidateHandler(name);
      passwordValidateHandler(password);
      emailValidateHandler(email);

      console.log(name,password,email,about);

      formResetHandler(event);

    })

    const formResetHandler = (event=>{
      event.preventDefault();
      setName('');
      setEmail('');
      setPassword('');
      setAbout('')
      setnameErr({isValid : null})
      setemailErr({isValid : null})
      setpasswordErr({isValid : null})
      setisSubmitValid(false)
    })




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
              <Form onSubmit={submitFormHandler} onReset={formResetHandler}>

                {/* Name field */}
                <FormGroup>
                  <Label for='name'>Name : </Label>
                  <Input id='name' type='text' placeholder='Enter your name here' value={name} onChange={nameChangeHandler} onBlur={onNameBlurHandler} valid={nameErr.isValid===true} invalid={nameErr.isValid===false}/>
                  {nameErr.isValid===false && <FormValidationError messages={nameErr.messages}/>}
                </FormGroup>
                
                

                <FormGroup>
                  <Label for='email'>Email : </Label>
                  <Input id='email' type='email' placeholder='Enter Email here' value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler} valid={emailErr.isValid===true} invalid={emailErr.isValid===false}/>
                  {emailErr.isValid===false && <FormValidationError messages={emailErr.messages}/>}
                </FormGroup>

                <FormGroup>
                  <Label for='password'>Password : </Label>
                  <Input id='password' type='password' placeholder='Enter Password here' value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} valid={passwordErr.isValid===true} invalid={passwordErr.isValid===false}/>
                  {passwordErr.isValid===false && <FormValidationError messages={passwordErr.messages}/>}
                </FormGroup>

                <FormGroup>
                  <Label for='desc'>Description : </Label>
                  <Input id='desc' type='textarea' placeholder='Enter Description here' style={{ height: '200px' }} value={about} onChange={aboutChangeHandler} />
                </FormGroup>

                <Container className='text-center'>
                  <Button color='success' style={{ marginRight: '10px' }} type='submit' disabled={!isSubmitValid}>Submit</Button>
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
