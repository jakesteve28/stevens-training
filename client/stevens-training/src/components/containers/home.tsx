import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { global } from '../../globals';
import { Particles } from 'react-particles-js';
import * as Icon from 'react-bootstrap-icons';
export default function Home() {
    return (
        <>
            <style type="text/css">
                {`
                    .background-container-cstm {
                        background-color: #0F020D;
                        height: 100vh;
                        overflow: clip;
                    }
                    .title {
                        color: #DDDDDD;   
                        border-bottom: 1px outset ${global.loggedInColor};    
                    }
                    .title:hover{
                        transform: size(1.05);
                        cursor: pointer;
                    }
                    .container-about-cstm {
                        
                    }
                    .container-strength-cstm {
                        
                    }
                    .container-insights-cstm {
                        
                    }
                    .title-span {
                        text-align: center;
                    }
                    .title-text {
                        padding-top: 25px;
                        font-weight: 800;
                        font-size:40pt;
                        font-family: Monaco, sans-serif;
                        text-transform: uppercase;
                        word-spacing: 5vw;   
                        padding-bottom: 30px;       
                        transition: all ease 0.5s;
                    }
                    .title-text:hover {
                        color: #34ebde;
                        text-shadow: 5px 5px 1px #ff0000;
                        opacity: 0.7;
                    }
                    .title-cont {
                        position: absolute;
                        top: 25% !important;
                        text-align: center;
                        left: 25%;
                        max-width: 50%;
                    }
                    @media only screen and (max-width: 700px) {
                      .title-cont {
                        left: 17.5%;
                      }
                    }
                    .buttons {
                        display: flex;
                        justify-content: space-around;
                        padding: 25px;
                        width: 100%;
                    }
                    .button-text {
                            font-weight: 500;
                            font-size:20pt;
                            font-family: Monaco, sans-serif;   
                            padding-bottom: 30px;       
                            transition: all ease 1.0s;    
                            word-spacing: 10px;     
                            max-width: 120px;
                            background-color: transparent;
                            outline: none;
                            border: none;
                            text-align: center;
                            max-height: 50px;
                            white-space: nowrap !important;
                            color: #DDDDDD;
                    }
                    .button-text:hover {
                        color: #34ebde;
                        opacity: 1.3;
                        border: none;
                        outline: none; 
                        background-color: transparent;
                        transform: scale(1.02);
                    }
                    .button-text:active:focus {
                        color: #ff0000;
                        border: none !important;
                        outline: none !important; 
                        background-color: transparent;
                        transform: scale(1.02);
                        box-shadow: none;
                    }
                    .button-text:hover .icon-button {
                        filter: drop-shadow(0px 0px 10px #ff0000);
                    }
                    .icon-button {
                        transition: 0.5s ease;
                    }
                    .height-100 {
                      height: 100vh;
                      width: 100vw;
                    }
                `}
            </style>
            <Container fluid className="background-container-cstm"> 
            <Particles
                style={{
                        width: '100%',
                        height: '100%'
                    }}
                    className="height-100"
                params={{
                    particles: {
                        "number": {
                            "value": 65,
                            "density": {
                              "enable": true,
                              "value_area": 400
                            }
                          },
                          "color": {
                            "value": ["#54ebf1"]
                          },
                          "shape": {
                            "type": "circle",
                            "stroke": {
                              "width": 0,
                              "color": "#000000"
                            },
                            "polygon": {
                              "nb_sides": 12
                            },
                            "image": {
                              "src": "img/github.svg",
                              "width": 100,
                              "height": 100
                            }
                          },
                          "opacity": {
                            "value": 0.5,
                            "random": false,
                            "anim": {
                              "enable": false,
                              "speed": 1,
                              "opacity_min": 0.1,
                              "sync": false
                            }
                          },
                          "size": {
                            "value": 6.0,
                            "random": true,
                            "anim": {
                                "enable": true,
                                "speed": 12.181158184520175,
                                "size_min": 5.0,
                                "sync": false
                            }
                          },
                          "line_linked": {
                            "enable": true,
                            "distance": 400,
                            "color": "#dd0000",
                            "opacity": 0.25,
                            "width": 0.5
                          },
                          "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": "top",
                            "random": true,
                            "straight": true,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                              "enable": false,
                              "rotateX": 600,
                              "rotateY": 1200
                            }
                          }
                        },
                        "interactivity": {
                          "detect_on": "window",
                          "events": {
                            "onhover": {
                              "enable": false,
                              "mode": "repulse"
                            },
                            "onclick": {
                              "enable": false,
                              "mode": "push"
                            },
                            "resize": true
                          },
                          "modes": {
                            "grab": {
                              "distance": 400,
                              "line_linked": {
                                "opacity": 1
                              }
                            },
                            "bubble": {
                              "distance": 400,
                              "size": 40,
                              "duration": 2,
                              "opacity": 8,
                              "speed": 3
                            },
                            "repulse": {
                              "distance": 200,
                              "duration": 0.4
                            },
                            "push": {
                              "particles_nb": 4
                            },
                            "remove": {
                              "particles_nb": 2
                            }
                        }
                    }
                }}
                    /> 
                    <Container fluid className="title-cont">
                        <Row className="title">
                            <div>
                                <span className="title-span"><h1 className="title-text">Welcome to Strength</h1></span>
                                <br>
                                </br>
                            </div>
                        </Row>
                        <Row className="buttons">
                          <Col lg="4" md="12" className="button-col">
                            <button className="button-text"><span>Login <Icon.PersonBadgeFill fill="#AAAAAA" className="icon-button" /></span></button>
                          </Col>
                          <Col lg="4" md="12" className="button-col">
                            <button className="button-text"><span>Register <Icon.PersonLinesFill fill="#AAAAAA" className="icon-button" /></span></button>
                          </Col>
                          <Col lg="4" md="12" className="button-col">
                            <button className="button-text"><span>About <Icon.ThreeDotsVertical fill="#AAAAAA" className="icon-button" /></span></button>
                          </Col>
                        </Row>
                    </Container>
                    <Row className="about-row">
                        <Col sm="4">
                            <Container fluid className="container-about-cstm">

                            </Container>
                        </Col>
                        <Col sm="4">
                            <Container fluid className="container-strength-cstm">

                            </Container>
                        </Col>
                        <Col sm="4">
                            <Container fluid className="container-insights-cstm">

                            </Container>
                        </Col>
                    </Row>
            </Container>
        </>
    )
}