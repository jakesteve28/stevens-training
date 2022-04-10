import * as Icon from 'react-bootstrap-icons';
import { Col, Row } from 'react-bootstrap'; 
import React from 'react';
import WorkoutTypeIcon from '../../workouts/WorkoutTypeIcon';
import { Workout, WorkoutFocus } from '../../../globals';

interface WorkoutActionsProps extends React.HTMLAttributes<Element> {
    hidden: boolean; 
    workoutFocus: WorkoutFocus; 
    workout: Workout; 
}

export default function WorkoutInfoActions({ hidden, workoutFocus, workout }: WorkoutActionsProps) {
    return (
        <>
            <style type="text/css">
                {
                    `
                    ${
                        hidden ? 
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
                    .field-single-workout {
                        display: flex;
                        white-space: nowrap;
                        transition: ease all 0.5s;
                    }
                    .label-focus { 
                        vertical-align: 75%;
                        padding-right: 20px;
                        color: #757575;
                    }
                    .single-workout-field-span {
                        font-size: 12pt;
                        color: #aaaaaa;
                    }
                    .workout-single-action-col:hover, 
                    .workout-single-action-col:active, 
                    .workout-single-action-col:focus {
                        cursor: pointer;
                        color: #34dcbe;    
                    }
                    .workout-single-action-col:hover .workout-single-action, 
                    .workout-single-action-col:active .workout-single-action, 
                    .workout-single-action-col:focus .workout-single-action  {
                        cursor: pointer;
                        color: #34dcbe;
                        animation-name: animate-single-workout-action-buttons;
                        animation-duration: 3.0s;
                    }
                    .pointer:hover {
                        cursor: pointer;
                    }
                    .pin-workout-text {
                        color: #606060;
                        font-weight: 500;
                        text-align: center;
                    }
                    .single-title-label {
                        color: #757575;
                        font-size: 16pt;
                        font-weight: 300;
                    }
                    .single-title-label {
                        color: #757575;
                        font-size: 16pt;
                        font-weight: 300;
                    }
                    .single-title-name {
                        color: #34dcbe;
                        font-size: 28pt;
                        font-weight: 700;
                        padding-left: 8px;
                        margin-bottom: 2px
                    }      
                    `
                }
            </style>
        <Row className="field-single-workout hidden-exercises-open">
            <Col xs="6">
                <span className="label-focus"></span><span className="single-workout-field-span single-focus"><WorkoutTypeIcon workoutType={workoutFocus} /></span>
            </Col>
            <Col xs="2"  className="workout-single-action-col pointer">
                <span className="pin-workout-text">Pin</span>
                <br></br>
                <Icon.PinAngleFill className="workout-single-action" width="40" height="40" />
            </Col>           
            <Col xs="2" className="workout-single-action-col pointer">
                <span className="pin-workout-text">Start</span>
                <br></br>
                <Icon.PlayFill className="workout-single-action" width="50" height="50" />
            </Col> 
        </Row>
        <Row className="field-single-workout mb-3 hidden-exercises-open"> 
            <Col xs="6"><span className="single-title-label">Focus:</span> <span className="single-title-name">{workoutFocus}</span></Col>                               
            <Col xs="2" className="workout-single-action-col pointer">
                <span className="pin-workout-text">Share</span>
                <br></br>
                <Icon.ShareFill className="workout-single-action" width="40" height="40" />
            </Col> 
            <Col xs="2" className="workout-single-action-col pointer">
                <span className="pin-workout-text">Edit</span>
                <br></br>
                <Icon.PencilFill className="workout-single-action" width="40" height="40" />
            </Col>            
        </Row>
        </>
    )
}