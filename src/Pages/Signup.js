import React, { useState, useEffect, } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import FormValidationError from '../Components/FormValidationError';
import { register } from '../Services/auth-service';
import {toast} from 'react-toastify'

export default function Signup() {


  //Declaring the state varibles
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');

  //Form submit is valid state variable
  const [isSubmitValid, setisSubmitValid] = useState(null);

  //Errors for respective fields with messages
  const [nameErr, setnameErr] = useState({
    isValid : null,
  });

  const [emailErr, setemailErr] = useState({
    isValid : null,
  });

  const [passwordErr, setpasswordErr] = useState({
    isValid : null,
  });

  const [aboutErr, setaboutErr] = useState({
    isValid : null
  });



    //handlers for changing state variables,whenever it is changed also it is validated

    //Name change handler
    const nameChangeHandler = (event) => {
      console.log("Inside name change handler");
      const userName = event.target.value;
      setName(userName);
      nameValidateHandler(userName);
    }
  
    //Email change Handler
    const emailChangeHandler = (event => {
      setEmail(event.target.value);
      const userEmail = event.target.value;
      emailValidateHandler(userEmail);
    })
  
    //Password change handler
    const passwordChangeHandler = (event => {
      setPassword(event.target.value);
      passwordValidateHandler(event.target.value);
    })
  
    //about change handler
    const aboutChangeHandler = (event => {
      setAbout(event.target.value);
      aboutValidateHandler(event.target.value);
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

    const aboutBlurHandler = ()=>{
      aboutValidateHandler(about);
    }

  //validating name value in form
    const nameValidateHandler = (userName)=>{
        let messages = [];
        let isValid = true;

        if(userName.trim().length===0){
          messages = [...messages,'Name must be empty']
          isValid = false
        }
        else if(userName.trim().length<8 || userName.trim().length>28){
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
        else if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userEmail))){
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
        else
        {
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
      }

        setpasswordErr({isValid,messages});
    }

    //validating about in form
    const aboutValidateHandler  = (userAbout)=>{
      let isValid = true;
        let messages = [];

        if(userAbout.trim().length===0){
            isValid =false;
            messages = [...messages,'About must not be empty']
        }

        setaboutErr({isValid,messages});
    }


    //whenever an error is introduced or removed the form submit error is then changed accordingly to facilitate submit
    useEffect(() => {
      if(nameErr.isValid && passwordErr.isValid && emailErr.isValid && aboutErr.isValid)
        setisSubmitValid(true);
      else
        setisSubmitValid(false);
      
    }, [nameErr,emailErr,passwordErr,aboutErr]);

    //Form is submitted and date is passed to server for backend validation and storage
    const submitFormHandler = (event=>{
      event.preventDefault();
      
      //all the date is checked before submission
      nameValidateHandler(name);
      passwordValidateHandler(password);
      emailValidateHandler(email);
      aboutValidateHandler(about);

      // send date to server
      if(isSubmitValid===true){
      register({
        name : name,
        email : email,
        password : password,
        about : about
      }).then(res=>{
        //on successful registration
        console.log(res);
        toast("User is registered successfully")
        console.log("Success Log");
        //on successful registration reset the form
        formResetHandler(event);
      }).catch(rej=>{
        //on unsuccessful registration
        console.log(rej);
        console.log("Error log");
        //if email is duplicate to some other user
        if(rej?.response?.data?.status===500){
          toast.error("Email already in Use, Please give other email");
          return;
        }
        //if some other error occurs
        toast.error("Form is invalid, Please give valid inputs !!!")
        serverValidateHandler(rej?.response?.data);
      })
    }
    else{
      //message if the inputs are not valid
      toast.error("Form is invalid, Please give valid inputs !!!")
    }

    })

    //form is reset
    const formResetHandler = (event=>{
      event.preventDefault();
      setName('');
      setEmail('');
      setPassword('');
      setAbout('')
      setnameErr({isValid : null})
      setemailErr({isValid : null})
      setpasswordErr({isValid : null})
      setaboutErr({isValid : null});
      setisSubmitValid(false)
    })


    //validations for fields with response coming from server
    const serverValidateHandler = (data=>{
      if(data?.name){
        setnameErr({isValid : false,messages:[data?.name]})
      }

      if(data?.email){
        setemailErr({isValid : false,messages:[data?.email]})
      }

      if(data?.password){
        setpasswordErr({isValid : false , messages:[data?.password]})
      }

      if(data?.about){
        setaboutErr({isValid : false,messages: [data?.about]});
      }
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
                
                
                {/* Email field */}
                <FormGroup>
                  <Label for='email'>Email : </Label>
                  <Input id='email' type='email' placeholder='Enter Email here' value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler} valid={emailErr.isValid===true} invalid={emailErr.isValid===false}/>
                  {emailErr.isValid===false && <FormValidationError messages={emailErr.messages}/>}
                </FormGroup>

                {/* Password field */}
                <FormGroup>
                  <Label for='password'>Password : </Label>
                  <Input id='password' type='password' placeholder='Enter Password here' value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} valid={passwordErr.isValid===true} invalid={passwordErr.isValid===false}/>
                  {passwordErr.isValid===false && <FormValidationError messages={passwordErr.messages}/>}
                </FormGroup>

                {/* About field */}
                <FormGroup>
                  <Label for='desc'>Description : </Label>
                  <Input id='desc' type='textarea' placeholder='Enter Description here' style={{ height: '200px' }} value={about} onChange={aboutChangeHandler} onBlur={aboutBlurHandler} invalid={aboutErr.isValid===false} valid={aboutErr.isValid===true}/>
                  {aboutErr.isValid===false && <FormValidationError messages={aboutErr.messages}/>}
                </FormGroup>

                <Container className='text-center'>
                  <Button color='success' style={{ marginRight: '10px' }} type='submit'>Submit</Button>
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
