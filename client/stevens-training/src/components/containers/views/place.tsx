import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Image, ListGroup, Card } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { selectNearbyPlaces, selectUser } from '../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../../features/ui/uiSlice';
import SinglePlaceContainer from '../singleplace';
import { useParams } from 'react-router-dom';
import { DefaultPlace } from '../../../globals';

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

export default function SinglePlaceView() {
    const placeId: any = useParams();
    const _places = useSelector(selectNearbyPlaces);
    const dispatch = useDispatch();
    const [place, setPlace] = useState(DefaultPlace);
    useEffect(() => {
        const _place = _places.find((pl: any) => pl.id === placeId.placeId);
        if(_place) {
            dispatch(setCurrentPage(`${_place?.name || ''}`));
            setPlace(_place);
            dispatch(setCurrentPage(`${_place.name}`));
        } else {
            let redirect = { ...DefaultPlace };
            redirect.id = 'redirect place';
            setPlace(redirect);
            dispatch(setCurrentPage(`${_place.name}`));
        }
    }, [_places]);
    return (
        <>
            <style type="text/css">
            {`      
                .background-container-cstm {
                  
                    height: 100vh;
                    overflow-y: auto;
                }      
                .background-container-cstm::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #191919;
                }
                .background-container-cstm::-webkit-scrollbar {
                    width: 12px;
                    background-color: #191919;
                }
                .background-container-cstm::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: rgba(52, 220, 190, 0.5)
                } 
            `}
            </style>
            <Container fluid className="background-container-cstm"> 
                   <SinglePlaceContainer place={place} />
            </Container>
        </>
    )
}