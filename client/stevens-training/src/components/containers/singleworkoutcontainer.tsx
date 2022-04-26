// @ts-nocheck
import { Accordion, Card, Col, Container, Row, CloseButton } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import SingleWorkoutMappedExerciseListItem from '../exercises/MappedExerciseListItem';
import { useEffect, useState, useRef } from "react";
import { Workout } from "../../globals";
import QuickListToggle from "./quicklisttoggle";
import WorkoutInfoActions from "./workouts/workout-actions";
import WorkoutTags from "./workouts/workout-tags";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MediaGallery from "./media-gallery";
import benchlogo from '../../imgs/jacked.jpg';
import { setCurrentWorkout } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { showBottomNav } from "../../features/ui/uiSlice";

interface SingleWorkoutContainerProps extends React.HTMLAttributes<Element> {
    workout: Workout;
}

export default function SingleWorkoutContainer({ workout }: SingleWorkoutContainerProps){
    const { name, workoutFocus, uploads,  primaryUpload, exerciseMapping, tags } = workout; 
    const [exercisesOpen, setExercisesOpen] = useState(false);
    const dispatch = useDispatch(); 
    const workoutCont = useRef(null);
    useEffect(() => {
        dispatch(setCurrentWorkout(workout));
        // dispatch(showBottomNav());
    }, []);
    useEffect(() => {
        if(workoutCont && workoutCont !== null && workoutCont.current !== null && exercisesOpen) {
            workoutCont.current.scrollTop = 0;
        }
    }, [exercisesOpen]);
    return (
        <>
            <style type="text/css">
            {
                `   
                    ${
                        exercisesOpen ? 
                            `
                                .hidden-exercises-open {
                                    display: none !important;
                                }
                                .field-single-workout {

                                }
                            `: 
                            `
                                
                            `
                    }         
                    .single-workout-cont {
                        margin-top: 85px;
                        border-radius: 15px;
                        color: #CCCCCC;
                        background-color: rgba(12, 12, 12, 0.2);                       
                        min-width: 100%;
                        overflow-y: auto;
                        height: 100vh;
                    }
                    .exercises-list-card-body::-webkit-scrollbar-track,
                    .single-workout-cont::-webkit-scrollbar-track
                    {
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                        border-radius: 10px;
                        background-color: #191919;
                    }
                    .exercises-list-card-body::-webkit-scrollbar,
                    .single-workout-cont::-webkit-scrollbar
                    {
                        width: 12px;
                        background-color: #191919;
                    }
                    .exercises-list-card-body::-webkit-scrollbar-thumb,
                    .single-workout-cont::-webkit-scrollbar-thumb
                    {
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                        background-color: rgba(52, 220, 190, 0.5)
                    }
                    
                    .single-workout-fields {
                        padding-top: 25px;
                        height: 100%;
                        height: calc(100vh - 110px);
                    }

                    .single-workout-cont-row {
                        height: 150%;
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
                   
                    .single-workout-field-label-span {
                        color: #0090b0;
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
                        font-size: 30pt;
                        color: #34dcbe;
                        font-weight: 500;
                    }
                    .single-workout-title-row {
                        background-color: #080808;
                        border-top-left-radius: 15px;
                        border-top-right-radius: 15px;
                        text-align: left;
                        padding-top: 10px;
                    }
                    .single-title-span,
                    .single-title-icon {             
                        color: #757575;
                        align-items: center;
                        margin-top: auto; 
                        margin-bottom: auto;
                        display: inline-block;
                    }
                    .single-title-icon {
                         padding-top: 10px !important;
                    }
                    .single-title-span {
                        margin-left: 10px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .single-title-name {
                        color: #34dcbe;
                        font-size: 16pt;
                        font-weight: 700;
                        padding-left: 8px;
                        margin-bottom: 2px
                    }
                    .exercises-list {
                        background-color: transparent;
                    }            

                    .tag-bubble {
                        border-radius: 15px;
                        background-color: rgba(50, 50, 50, 0.4);
                        color: #aaaaaa;
                        font-weight: 500;
                        padding: 5px;
                        width: min-content;
                        display: inline-block;
                        margin: 5px;
                        height: min-content;
                        transition: ease all 0.25s;
                        white-space: nowrap;
                    }
                    .tag-bubble:hover {
                        color: #ccccccc;
                        transform: scale(1.05);
                        cursor: pointer;
                        filter: brightness(150%);
                    }
                    .workout-single-action {
                        color: #34dcbe;
                        transition: all ease 0.25s;
                    }
                    @keyframes animate-single-workout-action-buttons {
                        0%   { transform: rotate(-5deg) scale(1.05);}
                        25%  { transform: rotatee(15deg) scale(1.1);}
                        50%  { transform: rotate(5deg) scale(1.15);}
                        100% { transform: rotate(0deg) scale(1.2);}
                      }
                    .single-workout-exercises-list-header {
                        background-color: rgba(23, 77, 88, 0.4);
                        width: 100%;
                    }
                    .exercises-list-card-body {
                        background-color: transparent;   
                        overflow-y: scroll;
                        padding-bottom: 5px;
                        border-bottom: 5px solid rgba(23, 77, 88, 0.4);
                        max-height: 65vh;
                        min-height: 100px;
                        box-shadow: 0px 2px 5px 5px #000000;
                    }
                    .single-workout-exercises-list-header-text {
                        color: #34dcbe;
                        font-weight: 300;
                        font-size: 15pt;
                    }
                    .back-button {
                        color: #34dcbe;
                    }
                    @media only screen and (max-width: 400px) {
                        .mobile-top-margin-cont {
                            margin-top: 120px;
                        }
                    }
                    .accordion-header {
                        padding-left: 35px;
                        color: #34dcbe;
                        font-size: 20pt;
                        font-weight: 600;
                        text-align: left;
                        padding-bottom: 30px; 
                        cursor: pointer;
                        border-bottom: 1px solid #404040;
                    }
                    .minimize-msg {
                        padding-left: 30px;
                        font-size: 9pt;
                        color: #404040;
                        font-weight: 600;
                    } 
                    .workout-gallery {
                        border-top: 1px solid #404040;
                    }
                    .single-title-name-label {
                        font-weight: 300; 
                        font-size: 12pt;
                    }
                    .col-actions {
                        overflow-x: hidden;

                    }
                    .workout-gall-col {
                        border-bottom: 1px solid #191919;
                    }
                `
            }
            </style>
            <Container fluid ref={workoutCont} className="single-workout-cont mobile-top-margin-cont">
                    <Row className="single-workout-title-row sticky-top">
                        <Col xs="1" className="pointer">
                            <span className="single-title-icon"><CloseButton variant="white"  aria-label="Hide" /></span>
                        </Col>
                        <Col className="single-title-span">
                            <span className="single-title-name-label">Name:</span><span className="single-title-name">{name}</span>
                        </Col>
                    </Row>
                     <Row className="single-workout-cont-row">
                        <Col className="single-workout-fields">
                            <Row className="field-single-workout workout-gallery">
                                <Col xs="12" md="6" className="workout-gall-col">
                                    <MediaGallery images={[benchlogo]} hidden={exercisesOpen} />
                                </Col>
                                <Col xs="12" md="6" className="col-actions">
                                    <WorkoutInfoActions hidden={exercisesOpen} workoutFocus={workoutFocus} workout={workout} callbacks={[setExercisesOpen]} />
                                    <WorkoutTags hidden={exercisesOpen} workout={workout} />
                                </Col>
                            </Row>
                            <Row className="field-single-workout mt-4 mb-4">
                                <Accordion activeKey={(exercisesOpen) ? `0` : null }>
                                    <Card style={{ backgroundColor: "transparent" }}>
                                        <Card.Header className="accordion-header">
                                            <QuickListToggle setOpen={setExercisesOpen} eventKey="0" >Exercises</QuickListToggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body className="exercises-list-card-body">
                                                <Container className="exercises-list">
                                                    {
                                                        exerciseMapping.map((mapping, index) => {
                                                            console.log(mapping)
                                                            return (
                                                                <SingleWorkoutMappedExerciseListItem index={index + 1} exerciseMapping={mapping} />
                                                            )
                                                        })
                                                    }                                 
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