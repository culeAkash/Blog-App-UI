import React, { useState, useEffect,useContext } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { login } from '../Services/auth-service';
import { toast } from 'react-toastify'
import { doLogin } from '../Auth/auth';
import { getCurrentUserDetails } from '../Auth/auth';
import { LoginContext } from '../Context/login-context';
import { Navigate } from 'react-router-dom';

export default function Login() {

  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');

  const [validSubmission, setvalidSubmission] = useState(false);

  const context = useContext(LoginContext);

  const userNameChangeHandler = (event) => {
    setuserName(event.target.value);
  }

  const passwordChangeHandler = (event => {
    setpassword(event.target.value);
  })

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setvalidSubmission(userName.trim().length !== 0 && password.trim().length !== 0);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [userName, password]);


  const loginSubmitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      username: userName,
      password: password
    }

    login(loginData).then(response => {
      console.log(response);
      //save the data to local storage
      doLogin(response, () => {
        console.log("Login Detail is stored in Local Storage");
      })
      console.log(getCurrentUserDetails());
      toast.success("Login Successful")
      context.toggleLogin();
      loginResetHandler(e);
      //redirect to user dashboard page
    }).catch(error => {
      // setisLoginValid(false);
      toast.error(error?.response?.data?.message);
      console.log(error.response.data);
    })

  }

  const loginResetHandler = (e) => {
    e.preventDefault();
    setuserName('')
    setpassword('')
    setvalidSubmission(false)
    // setisLoginValid(false)
  }

  if(context.isLogin){
    return(
      <Navigate to='/user' replace/>
    )
  }


  return (
    <Container style={{ marginTop: '20vh' }}>

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

            <div style={{ color: 'red', padding: '10px', marginLeft: '20px' }}>* All fields are mandatory</div>
            <CardBody>

              <Form onSubmit={loginSubmitHandler} onReset={loginResetHandler}>
                <FormGroup>
                  <Label for='useremail'>Email : </Label>
                  <Input id='useremail' placeholder='Enter your email' type='email' value={userName} onChange={userNameChangeHandler} />
                </FormGroup>

                <FormGroup>
                  <Label for='pass'>Password : </Label>
                  <Input id='pass' placeholder='Enter your password' type='password' value={password} onChange={passwordChangeHandler} />
                </FormGroup>

                <Container className='text-center' fluid>
                  <Button color='primary' type='submit' outline disabled={!validSubmission}>Login</Button>
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
