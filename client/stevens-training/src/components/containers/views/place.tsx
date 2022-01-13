import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, ListGroup, Card } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { selectUser } from '../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export function EditableProfileAttribute(...props: any) {
    return (
        <>
        </>
    )
}

export function ProfileCheckin() {
    return (
        <div className="check-in">
            <Container fluid className="cont-check-in">
                <Row >
                    <Col xs="7">
                        <div className="gyms-title">Recent Workouts:</div>
                    </Col>
                </Row>
                <Row className="checkin-row">
                    <Col xs="7" className="quick-check-in-workouts">
                        <div className="workout-gym-label">Legs @ Gold's Gym</div>
                        <div className="workout-gym-label">Chest @ Home</div>
                        <div className="workout-gym-label">Chest @ Gold's Gym</div>
                        <div className="workout-gym-label">Back @ The Fitness Center (North Spokane)</div>
                    </Col>
                    <Col className="quick-check-in" xs="5">
                        <Row>
                            <span className="quick-check-title">Check in / Start Workout</span>
                        </Row>
                        <Row>
                            <span className="quick-check-icon"><Icon.GeoAltFill width={"50px"} height={"50px"}/></span>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default function PlaceScreen() {
    const dispatch = useDispatch();
    return (
        <>
            <style type="text/css">
            {`      
                .background-container-cstm {
                    background-color: #191919;
                    height: 100vh;
                }       
            `}
            </style>
            <Container fluid className="background-container-cstm"> 
                   
            </Container>
        </>
    )
}