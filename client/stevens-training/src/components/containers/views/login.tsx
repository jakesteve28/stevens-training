import React, { useEffect } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCurrentPage, showForgotInfo } from '../../../features/ui/uiSlice';
import { useHistory } from 'react-router-dom';

export default function LoginScreen(){
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(setCurrentPage("Login"));
    }, []);
    return (
        <>
            <style type="text/css">
            {`
                .background-container-cstm {
                    background-color: transparent;
                    height: 100vh;
                    overflow: hidden;
                    overflow-y: auto;
                }
                .background-container-cstm ::-webkit-scrollbar-track
                {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #191919;
                }
                .background-container-cstm::-webkit-scrollbar
                {
                    width: 12px;
                    background-color: #191919;
                }
                .background-container-cstm::-webkit-scrollbar-thumb
                {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: rgba(52, 220, 190, 0.5)
                }
                .login-cont {
                    position: absolute;
                    text-align: center;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    opacity: 0.7;
                    padding-top: 50px;
                    padding-bottom: 100px;
                    overflow: hidden;
                    transition: 1.0s ease;
                }
                
                .login-text {
                    color: #34dcbe;
                    cursor: pointer;
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
                    background-color: transparent;
                    width: 95%;
                    font-size: 30pt !important;
                    color: #40eb34 !important;
                    margin-top: 25px;
                    border-radius: 15px;
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
                    background-color: transparent;

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
                                        <Col xs="6">
                                            <Button variant="dark" className="forgot-button" onClick={() => { history.push('/signup') }}>
                                                Sign up
                                            </Button>
                                        </Col>      
                                        <Col xs="6">
                                            <Button variant="dark" className="forgot-button" onClick={() => { dispatch(showForgotInfo()); }}>
                                                Forgot Info?
                                            </Button>
                                        </Col>                          
                                    </Row>
                                </Container>       
                            </Col>
                        </Row>
                    </Container>
            </Container>
        </>
    )
}