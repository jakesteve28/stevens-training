import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Accordion, Card, useAccordionButton, AccordionContext } from "react-bootstrap";
import { Workout, DefaultWorkout } from '../../globals'; 
import { Redirect, useParams } from 'react-router-dom';
import { selectUser, selectWorkouts } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import WorkoutTypeIcon from '../workouts/WorkoutTypeIcon';
import * as Icon from 'react-bootstrap-icons';


export const SingleWorkoutView: FunctionComponent = () => {
    const workoutId: any = useParams();
    const _workouts = useSelector(selectWorkouts);
    const [workout, setWorkout] = useState(DefaultWorkout); 
    useEffect(() => {
        const _workout = _workouts.find((wkout: any) => wkout.id === workoutId.workoutId);
        if(_workout) {
            setWorkout(_workout);
        } else {
            let redirect = { ...DefaultWorkout };
            redirect.id = 'redirect workout';
            setWorkout(redirect);
        }
    }, [_workouts]);
    if(workout.id === 'redirect workout') {
        //try to fetch workout from other user's library if they've shared it 
        return <Redirect to='/workouts'/>;
    } else { 
        return (
            <>
                <SingleWorkout workout={workout} />
            </>
        );
    }
    //pull it up from your workout library
}

export const SingleWorkout: FunctionComponent<{ workout: Workout }> = ({ workout }) => {
    const { name, workoutFocus, uploads,  primaryUpload, exerciseMapping } = workout; 
    return (
        <>
            <style type="text/css">
            {
                `
                    .single-workout-cont {
                        margin-top: 125px;
                        min-height: 550px;
                        max-height: 550px;
                        border-radius: 15px;
                        color: #CCCCCC;
                        background-color: rgba(40, 40, 40, 0.6);
                        width: 40%;
                        min-width: 350px;
                        overflow: hidden;
                    }
                    .single-workout-fields {
                        padding-top: 25px;
                    }

                    .single-workout-cont-row {
                        height: 100%;
                        width: 100%;
                    }
                    .field-label-single-workout {
                        width: 100%;
                        font-size: 14pt;
                        font-weight: 400;
                        text-align: right;
                        text-shadow: 3px 3px #000000;
                        margin-bottom: 20px;
                        padding-bottom: 15px;

                    }
                    .field-single-workout {
                        white-space: nowrap;
                    }
                    .single-workout-field-label-span {
                        color: #0090b0;
                    }
                    .single-workout-field-span {
                        text-align: center;
                        font-size: 12pt;
                        color: #aaaaaa;
                        text-shadow: 2px 2px #000000;
                    }
                    .single-name {
                        font-weight: 700;
                        color: #34dcbe;
                        font-size: 40pt;
                        text-shadow: 4px 2px black;
                    }
                    .focus-single {
                        margin-bottom: 40px;
                        margin-top: 15px;
                    }
                    .desc-single {
                        font-size: 12pt;
                    }
                    .single-focus {
                        font-size: 25pt;
                        color: #34dcbe;
                        font-weight: 600;
                        text-shadow: 1px 1px #FF0000;
                    }
                    .single-workout-title-row {
                        background-color: rgba(23, 77, 88, 0.4);
                        border-top-left-radius: 15px;
                        border-top-right-radius: 15px;
                        height: 60px;
                        text-align: left;
                        padding-top: 10px;
                    }
                    .single-title-span,
                    .single-title-icon {
                        color: #606060;
                        font-weight: 700;
                        font-size: 16pt;
                        text-shadow: 1px 3px #030303;
                    }
                    .single-title-span {
                        font-size: 20pt;
                        margin-left: 10px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .single-title-name {
                        color: #34dcbe;
                       
                    }
                    .exercises-list {
                        background-color: #121212;
                        width: 100%; 
                        height: 150px;
                    }
                `
            }
            </style>
            <Container fluid className="single-workout-cont">
                <Row className="single-workout-title-row">
                    <Col xs="1" style={{ cursor: "pointer" }}>
                        <span className="single-title-icon"><Icon.ArrowLeftCircleFill color={"#34dcbe"} width={35} height={35} /></span>
                    </Col>
                    <Col className="single-title-span">
                        Name:&nbsp;&nbsp;&nbsp;<span className="single-title-name">{name}</span>
                    </Col>
                </Row>
                <Row className="single-workout-cont-row">
                    <Col className="single-workout-fields">
                        <Row className="field-single-workout">
                            <span className="single-workout-field-span single-focus">
                                <WorkoutTypeIcon workoutType={workoutFocus} />&nbsp;&nbsp;&nbsp;{workoutFocus}
                            </span>
                        </Row>
                        <Row className="field-single-workout mb-3">
                            <Col style={{ cursor: "pointer" }}>
                                <Icon.PinAngleFill color="rgba(33, 87, 88, 1)" width="40" height="40" />
                            </Col>           
                            <Col style={{ cursor: "pointer" }}>
                                <Icon.PlayFill  color="rgba(33, 87, 88, 1)" width="50" height="50" />
                            </Col>           
                            <Col style={{ cursor: "pointer" }}>
                                <Icon.ShareFill color="rgba(33, 87, 88, 1)" width="40" height="40" />
                            </Col>           
                        </Row>
                        <Row className="field-single-workout">
                        <Accordion>
                            <Card style={{ backgroundColor: "transparent"}}>
                                <Card.Header style={{ paddingLeft: "35px", color: "#1259db", fontSize: "20pt", textAlign: "left", cursor: "pointer" }}>
                                    <CustomToggle eventKey="0">
                                        <span style={{color: "#34dcbe", textShadow: "2px 1px #aa0000"}}>Exercises</span>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Container fluid className="exercises-list">
                                                
                                        </Container>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card style={{ backgroundColor: "transparent"}}>
                                <Card.Header style={{ paddingLeft: "35px", color: "#1259db", fontSize: "20pt", textAlign: "left", cursor: "pointer" }}>
                                    <CustomToggle eventKey="1">
                                    <span style={{color: "#34dcbe", textShadow: "2px 1px #aa0000"}}>Tags</span>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <Container fluid className="exercises-list">
                                                
                                        </Container>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card style={{ backgroundColor: "transparent"}}>
                                <Card.Header style={{ paddingLeft: "35px", color: "#1259db", fontSize: "20pt", textAlign: "left", cursor: "pointer" }}>
                                    <CustomToggle eventKey="1">
                                    <span style={{color: "#34dcbe", textShadow: "2px 1px #aa0000"}}>User Actions</span>
                                    </CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <Container fluid className="exercises-list">
                                                
                                        </Container>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )   
}   

function CustomToggle(props: any): JSX.Element {
    const decoratedOnClick = useAccordionButton(props.eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
      <div
        style={{ backgroundColor: 'transparent', width: "100%", display: "flex", justifyContent: "space-between" }}
        onClick={decoratedOnClick}
      >
        <div className="chevron-single-title">{props.children}</div><div className="chevron-single-span"><Icon.ChevronDown color="rgba(33, 87, 88, 1)"/></div>
      </div>
    );
  }
  