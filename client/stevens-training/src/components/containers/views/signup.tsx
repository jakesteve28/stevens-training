import React, { useState } from 'react';
import { Container, Col, Row, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function SignUpScreen(){ 
    const [showfNameError, setShowFNameError] = useState(false);
        return (
            <>
                <style type="text/css">
                {`
                    .background-container-cstm {
                        background-color: transparent;
                        height: 98vh;
                        top: 0;
                        position: absolute;
                    }
                    .signup-cont {
                        position: absolute;
                        text-align: center;
                        top: 100px;
                        left: 25%;
                        width: 50%;
                        background-color: #101010;
                        opacity: 0.7;
                        padding-top: 50px;
                        padding-bottom: 100px;
                        transition: 1.0s ease;
                    }
                    @media only screen and (max-width: 700px) { 
                        .signup-cont {
                            width: 100vw !important;
                            left: 0% !important;
                            margin-left: 0px;
                        }
                    }
                    .signup-text {
                        color: #34dcbe;
                        cursor: pointer;
                        text-shadow: 2px 2px 0px #ff0000 ;
                        margin-top: 0px;
                        font-weight: bolder;
                        font-size: 44pt;
                        transition: 1.0s ease;
                    }
                    @media only screen and (max-width: 1200px) {
                      .signup-cont {
                        left: 15%;
                        width: 80%;
                      }
                    }
                    .form-label-ctm {
                        color: #34dcbe;
                        padding-left: 10px;
                        font-style: italic;
                    }
                    .login-form {
                        text-align: left;
                    }
                    .already-button {
                        height: 75px;                        
                        border: none; 
                        font-size: 12pt !important;
                        outline: none;
                        box-shadow: none;
                    }
                    .create-button {
                        border: none; 
                        outline: none;
                        box-shadow: none;
                        margin-left: auto;
                        width: 100% !important;
                        font-size: 34pt !important;
                        transition: 1.0s ease;
                    }
                    .create-button, .already-button {
                        color: #34dcbe;
                        font-size: 16pt;
                        width: 45%;
                        margin-right: 5px;
                        margin-left: 5px;
                        background-color: #191919;
                    }
                    .already-button:hover,
                    .already-button:focus,
                    .already-button: active {
                        outline: none !important; 
                        box-shadow: none !important; 
                        border: none !important;
                        background-color: #191919 !important;
                        color: #34dcbe;
                    }
                    .create-button:hover:active:focus {
                        outline: none !important; 
                        box-shadow: none !important; 
                        border:  none !important;
                        background-color: #191919;
                    }
                    .create-button:hover {
                        border-bottom: #34dcbe;
                        border-radius: 15px;
                        background-color: #404040;
                        color: #34dcbe;
                    }
                    .ctm-control {
                        background-color: #191919;
                        outline: none;
                        border: none;
                        border-bottom: 1px solid #34dcbe;
                        border-radius: 0px;
                        color: #34dcbe;
                        font-weight: 500;
                        margin-top: 12px;
                        height: 70px;
                        border-radius: 2px;
                        transition: 0.5s ease all;
                        font-size: 22pt;
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
                `}
                </style>
                <Container fluid className="background-container-cstm"> 
                        <Container fluid className="signup-cont">
                            <Row className="login">
                                <Col xs="2"/>
                                <Col >
                                    <span className="login-span"><h1 className="signup-text">New Account</h1></span>
                                    <br>
                                    </br>
                                    <Form className="login-form">
                                        <Form.Group className="mb-5" controlId="formGroupname">
                                            <Row>
                                                <Col xs="6" className="mt-3">
                                                    <OverlayTrigger
                                                        show={showfNameError}
                                                        placement={'left'}
                                                        overlay={
                                                            <Tooltip className="error-input" id={`tooltip`}>
                                                                No numbers, no special characters
                                                            </Tooltip>
                                                        }
                                                        >
                                                            <Form.Control onChange={(e) => { if(/^[a-z ,.'-]+$/i.test(e.target.value) == false && e.target.value.length > 2) setShowFNameError(true); else setShowFNameError(false); } } className="ctm-control" placeholder="First name" />
                                                    </OverlayTrigger>
                                                </Col>
                                                <Col xs="6" className="mt-3">
                                                <Form.Control  className="ctm-control" placeholder="Last name" />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                        <Form.Group className="mb-5" controlId="formGroupEmail">
                                            <Form.Control type="email"  className="ctm-control" placeholder="Enter email" />
                                        </Form.Group>
                                        <Form.Group className="mb-5" controlId="formGroupPassword">
                                            <Form.Control type="password"  className="ctm-control" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group className="mb-5" controlId="formGroupPassword">
                                            <Form.Control type="password" className="ctm-control" placeholder="Confirm Password" />
                                        </Form.Group>
                                        <Button variant="dark" className="create-button mx-auto">
                                            Create Account
                                        </Button> 
                                    </Form>
                                    <br>
                                    </br>
                                    <span>
                                          
                                    </span>
                                </Col>
                                <Col xs="2"/>
                            </Row>
                        </Container>
                </Container>
            </>
        )
}