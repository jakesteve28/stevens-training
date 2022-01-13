import React from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { showForgotInfo } from '../../../features/ui/uiSlice';
import { useHistory } from 'react-router-dom';

export default function LoginScreen(){
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
            <style type="text/css">
            {`
                .background-container-cstm {
                    background-color: transparent;
                    height: 100vh;
                    overflow: hidden;
                }
                .login-cont {
                    position: absolute;
                    text-align: center;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    background-color: #101010;
                    opacity: 0.7;
                    padding-top: 50px;
                    padding-bottom: 100px;
                    overflow: hidden;
                    transition: 1.0s ease;
                }
                
                .login-text {
                    color: #34dcbe;
                    cursor: pointer;
                    text-shadow: 2px 2px 0px #ff0000 ;
                    margin-top: 0px;
                    font-weight: bolder;
                    font-size: 44pt;
                }
                @media only screen and (max-width: 700px) {
                  .login-cont {
                    width: 100vw !important;
                    left:0;
                  }
                }
                .form-label-ctm {
                    color: #34dcbe;
                    padding-left: 10px;
                    font-style: italic;
                    margin-top: 12px;
                }
                .login-form {
                    text-align: left;
                }
                .login-button {
                    height: 100px;
                    border: none; 
                    outline: none;
                    box-shadow: none;
                    background-color: #191919;
                    width: 95%;
                    max-width: 400px;
                    font-size: 30pt !important;
                    color: #40eb34 !important;
                    margin-top: 25px;
                }
                .forgot-button {
                    margin-top:15px;
                    height: 75px;
                    background-color: #121212;
                    max-width: 400px;
                    border-radius: 15px;
                    border: none; 
                    outline: none;
                    box-shadow: none;
                    width: 100%;
                }
                .forgot-button, .login-button {
                    color: #34dbce;
                    font-size: 16pt;
                    font-weight: bolder;
                }
                .login-button:hover
                .login-button:focus
                .login-button: active {
                    outline: none !important; 
                    box-shadow: none !important; 
                    border: none !important;
                    background-color: #191919 !important;
                    border-radius: 10px;
                }
                .forgot-button:hover:active:focus {
                    outline: none !important; 
                    box-shadow: none !important; 
                    border:  none !important;
                    background-color: #191919;
                    border-radius: 10px;

                }
                .ctm-control {
                    background-color: #191919;
                    outline: none;
                    border: none;
                    border-bottom: 1px solid #34dcbe;
                    border-radius: 0px;
                    color: #34dcbe;
                    font-weight: 500;
                    margin-left: auto;
                    margin-right: auto;
                    max-width: 400px;
                    font-size: 22pt;
                    margin-top: 12px;
                    height: 70px;
                    border-radius: 2px;
                    transition: 0.5s ease all;
                }
                .ctm-control:hover, 
                .ctm-control:focus,
                .ctm-control:active {
                    background-color: #404040;
                    color: #34dcbe;
                    outline: none;
                    border-bottom: 3px solid #3adbef;
                    box-shadow: none;
                    border-radius: 20px;
                }
                .login {
                    padding-left: 5vw;
                    padding-right: 5vw;
                    
                }
            `}
            </style>
            <Container fluid className="background-container-cstm"> 
                    <Container fluid className="login-cont">
                        <Row className="login">
                            <Col >
                                <span className="login-span"><h1 className="login-text">Login Here</h1></span>
                                <br>
                                </br>
                                <Form className="login-form">
                                    <Form.Group className="mb-5" controlId="formGroupEmail">
                                        <Form.Control type="email" className="ctm-control" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group className="mb-5" controlId="formGroupPassword">
                                        <Form.Control type="password" className="ctm-control" placeholder="Password" />
                                    </Form.Group>
                                </Form>
                                <Container fluid>
                                    <Row>
                                        <Col xs="12">
                                            <Button variant="dark" className="login-button">
                                                Login   
                                            </Button>
                                        </Col>                                     
                                    </Row>
                                    <Row>
                                        <Col></Col>
                                        <Col xs="6">
                                            <Button variant="dark" className="forgot-button" onClick={() => { history.push('/signup') }}>
                                                Sign up
                                            </Button>
                                        </Col>      
                                        <Col></Col>                            
                                    </Row>
                                    <Row>
                                        <Col></Col>
                                        <Col xs="6">
                                            <Button variant="dark" className="forgot-button" onClick={() => { dispatch(showForgotInfo()); }}>
                                                Forgot Info?
                                            </Button>
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                </Container>       
                            </Col>
                        </Row>
                    </Container>
            </Container>
        </>
    )
}