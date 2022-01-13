import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import global from '../../../globals';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { showAbout } from '../../../features/ui/uiSlice';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
            <style type="text/css">
                {`
                    .background-container-cstm {
                        background-color: transparent;
                        height: 100vh;
                        overflow: clip;
                    }
                    .title {
                        color: #DDDDDD;   
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .title:hover{
                        transform: size(1.05);
                        cursor: pointer;
                    }
                    .container-about-cstm {
                        background-color: #191919;
                        height: 300px;
                        margin-left: none;
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
                        top: 15vh !important;
                        text-align: center;
                        left: 25%;
                        max-width: 50%;
                    }
                    @media only screen and (max-width: 700px) {
                      .title-cont {
                        left: 15%;
                      }
                      .btn-ctm {
                          width: 60vw !important;
                          margin-left: -20px;
                      }
                      .button-col {
                        width: 100% !important;
                      }
                    }
                    .buttons {
                        display: flex;
                        justify-content: middle;
                        padding: 25px;
                        width: 100%;
                    }
                    .button-text {
                            font-weight: 500;
                            font-size:20pt;
                            font-family: Monaco, sans-serif;   
                            padding-bottom: 30px;       
                            margin-left: 20px;
                            margin-right:20px;
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
                    .btn-ctm {
                        padding: 15px;
                        font-weight: 500;
                        background-color: rgba(200, 0, 0, 0.4);
                        outline: none; 
                        border: none;
                        font-size: 15pt;
                        width: 100%;
                        margin-top: 5px;
                        min-width: 150px;
                    }
                    .btn-ctm:hover {
                        color: #34dcbe;
                        background-color: rgba(200, 0, 0, 0.1);
                    }
                `}
            </style>
            <Container fluid className="background-container-cstm"> 
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
                            <Button variant="dark" className="btn-ctm" onClick={() => { history.push("/login") }}>Login <Icon.PersonBadgeFill fill="#AAAAAA" className="icon-button" /></Button>
                          </Col>
                          <Col lg="4" md="12" className="button-col">
                            <Button variant="dark" className="btn-ctm" onClick={() => { history.push("/signup") }}>Register <Icon.PersonLinesFill fill="#AAAAAA" className="icon-button" /></Button>
                          </Col>
                          <Col lg="4" md="12" className="button-col">
                            <Button variant="dark" onClick={() => dispatch(showAbout()) } className="btn-ctm"><span>About <Icon.ThreeDotsVertical fill="#AAAAAA" className="icon-button" /></span></Button>
                          </Col>
                        </Row>    
                    </Container>
            </Container>
        </>
    )
}