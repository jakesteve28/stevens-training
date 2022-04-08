import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Accordion, Card, useAccordionButton, AccordionContext } from "react-bootstrap";
import { Workout, DefaultWorkout, ExerciseMapping } from '../../globals'; 
import { Redirect, useParams } from 'react-router-dom';
import { selectUser, selectWorkouts } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import WorkoutTypeIcon from '../workouts/WorkoutTypeIcon';
import * as Icon from 'react-bootstrap-icons';
import benchlogo from '../../imgs/462bench.jpg';

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
    const { name, workoutFocus, uploads,  primaryUpload, exerciseMapping, tags } = workout; 
    const [tagEditing, setTagEditing] = useState(false);
    const [tagAdd, setTagAdd] = useState(false);
    const [exercisesOpen, setExercisesOpen] = useState(false); 
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
                    .chevron-single-active {
                        transform: rotate(180deg);
                    }
                    .chevron-single-span {
                        display: inline-block;
                        transition: ease-in all 0.3s;
                    }              
                    .single-workout-cont {
                        margin-top: 85px;
                        border-radius: 15px;
                        color: #CCCCCC;
                        background-color: rgba(12, 12, 12, 0.2);                       
                        min-width: 100%;
                    }
                    .exercises-list-card-body::-webkit-scrollbar-track
                    {
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                        border-radius: 10px;
                        background-color: #191919;
                    }
                    .exercises-list-card-body::-webkit-scrollbar
                    {
                        width: 12px;
                        background-color: #191919;
                    }
                    .exercises-list-card-body::-webkit-scrollbar-thumb
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
                        display: flex;
                        white-space: nowrap;
                        transition: ease all 0.5s;
                    }
                    .single-workout-field-label-span {
                        color: #0090b0;
                    }
                    .single-workout-field-span {
                        font-size: 12pt;
                        color: #aaaaaa;
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
                        background-color: transparent;
                        border-top-left-radius: 15px;
                        border-top-right-radius: 15px;
                        height: 60px;
                        text-align: left;
                        padding-top: 10px;
                    }
                    .single-title-span,
                    .single-title-icon {             
                        color: #757575;
                        font-size: 14pt;
                        display: flex;
                        align-items: center;
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
                        font-size: 28pt;
                        font-weight: 700;
                        padding-left: 8px;
                        margin-bottom: 2px
                    }
                    .exercises-list {
                        background-color: transparent;
                    }            
                    .workout-tags {
                        text-align: center;
                        margin-left: auto;
                        margin-right: auto;
                        text-overflow: ellipsis;
                    }
                    .tag-label {
                        text-align: center;
                        margin-bottom: 20px;
                        font-size: 14pt;
                        color: #34dcbe;
                        font-weight: 600;
                        whitespace: nowrap;
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
                    .icon-tag-add {
                        ${(tagAdd) ? 'color: #34ffbe; transform: scale(1.3);' : ''}                      
                    }
                    .icon-tag-edit {
                        ${(tagEditing) ? 'color: #34ffbe; transform: scale(1.3);' : ''}                      
                    }
                    .icon-tag-add,
                    .icon-tag-edit {
                        transition: all ease 0.25s;
                    }
                    .icon-tag-add:hover,
                    .icon-tag-edit:hover {
                        cursor: pointer;
                        transform: scale(1.1);
                        color: #34dcbe;
                    }
                    .workout-single-action-col {
    
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
                    .single-workout-add-tag {
                        background-color: #303030;
                        box-shadow: 5px 5px 5px 5px #191919;
                        border: none; 
                        outline: none;
                        color: #34dcbe;
                        margin-left: 20px;
                    }
                    .icon-tag-confirm {
                        color: #22dd44;
                    }
                    .icon-tag-confirm:hover,
                    .icon-tag-confirm:active,
                    .icon-tag-confirm:focus {
                        color: #66FF99;
                        cursor: pointer;
                    }
                    .icon-tag-delete {
                        color: #990000;
                    }
                    .pin-workout-text {
                        color: #606060;
                        font-weight: 500;
                        text-align: center;
                    }
                    .label-focus { 
                        vertical-align: 75%;
                        padding-right: 20px;
                        color: #757575;
                    }
                    .single-workout-tags-row {
                        border-top: 1px solid #303030;
                        border-bottom: 1px solid #303030;
                        padding-bottom: 10px;
                        padding-top: 15px;
                        margin-left: 15px;
                        margin-right: 15px;
                        min-height: 150px;
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
                    .pointer:hover {
                        cursor: pointer;
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
                    .single-title-label {
                        color: #757575;
                        font-size: 16pt;
                        font-weight: 300;
                    }
                    
                `
            }
            </style>
            <Container fluid className="single-workout-cont mobile-top-margin-cont">
                <Row className="single-workout-title-row">
                    <Col xs="1" className="pointer">
                        <span className="single-title-icon"><Icon.ArrowLeft className="workout-single-action back-button" width={30} height={30} /></span>
                    </Col>
                    <Col className="single-title-span">
                        <span className="single-title-label">Name:</span><span className="single-title-name">{name}</span>
                    </Col>
                </Row>
                     <Row className="single-workout-cont-row">
                        <Col className="single-workout-fields">
                            <Row className="field-single-workout single-workout-focus-span hidden-exercises-open">
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
                                <Col xs="6"><span className="single-title-label no-show-narrow">Focus:</span> <span className="single-title-name">{workoutFocus}</span></Col>                               
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
                            <Row className="mt-3 mb-3 single-workout-tags-row hidden-exercises-open">
                                <Col xs="10" className="workout-tags">
                                <div className="w-100 tag-label">
                                    Tags&nbsp;&nbsp;&nbsp;
                                    <Icon.PlusCircle onClick={() => {setTagAdd(!tagAdd); setTagEditing(false);}} className="icon-tag-add" width={30} height={30} />&nbsp;&nbsp;&nbsp;
                                    <Icon.PencilFill onClick={() => {setTagEditing(!tagEditing); setTagAdd(false);}} className="icon-tag-edit" width={30} height={30} />
                                    {
                                        (tagAdd) ? (<><input className="single-workout-add-tag" type="text" autoFocus={true}/><Icon.Check className="icon-tag-confirm" width={40} height={40} /></>) : (<></>)
                                    }
                                </div>                          
                                    {tags.map(tag => 
                                        (<div className="tag-bubble">{`${tag}`}{(tagEditing) ? (<Icon.X className="icon-tag-delete" width={20} height={20} />) : (<></>)}</div>))
                                    }
                                </Col>
                            </Row>
                            <Row className="field-single-workout mt-4 mb-4">
                                <Accordion>
                                    <Card style={{ backgroundColor: "transparent" }}>
                                        <Card.Header className="accordion-header">
                                            <ContextAwareToggle setExercisesOpen={setExercisesOpen} eventKey="0">
                                                <span>Exercises</span><span className="minimize-msg">{(exercisesOpen) ? `Click to minimize` : ``}</span>
                                            </ContextAwareToggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body className="exercises-list-card-body">
                                                <Container className="exercises-list">
                                                    {
                                                        exerciseMapping.map(mapping => {
                                                            console.log(mapping)
                                                            return (
                                                                <SingleWorkoutExerciseBlock exerciseMapping={mapping} />
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

  interface CtxAwareToggleProps extends React.HTMLAttributes<Element> {
      children: React.ReactNode;
      eventKey: any; 
      callback?: any;
      setExercisesOpen: any;
  }

  function ContextAwareToggle({ children, eventKey, callback, setExercisesOpen }: CtxAwareToggleProps): JSX.Element {
    const { activeEventKey } = useContext(AccordionContext);
  
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => {
          if(callback && callback(eventKey)) {
              return true;
          }
          let isCurrentEventKey = activeEventKey === eventKey;
          setExercisesOpen(!isCurrentEventKey);
          ;
        }
      ,
    );
  
    const isCurrentEventKey = activeEventKey === eventKey;
  
    return (
        <div
            style={{ backgroundColor: 'transparent', width: "100%", display: "flex", justifyContent: "space-between" }}
            onClick={decoratedOnClick}
        >
            <div className="chevron-single-title">{children}</div>
            <div><Icon.ChevronDown className={`chevron-single-span ${(isCurrentEventKey) ? "chevron-single-active" : ""}`} color="rgba(33, 87, 88, 1)"/></div>
        </div>
    );
  }
  

export const SingleWorkoutExerciseBlock: React.FunctionComponent<{ exerciseMapping: ExerciseMapping }> = ({ exerciseMapping }) => {
    const { quantity, duration, sets } = exerciseMapping; 
    const { name, primaryUpload } = exerciseMapping.exercise; 
    return (
        <> 
            <style type="text/css">
                {`
                    .single-workout-block-row {
                        border-bottom: 1px solid #404040;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        background-color: transparent;
                        transition: ease all 0.5s;
                        cursor: pointer;
                    }
                     .single-workout-block-row:active, .single-workout-block-row:hover, .single-workout-block-row:focus {
                        background-color: #181818;
                    }
                     @media only screen and (max-width: 400px) {
                        .no-show-narrow {
                        display: none;
                        visibility: hidden;
                    }
                     }
                     @media only screen and (max-width: 400px) {
                        .exercises-list-card-body {
                        max-height: 60vh;
                    }
                     .block-name {
                        font-size: 14pt !important;
                    }
                     }
                     .block-name {
                        font-weight: 500;
                        font-size: 18pt;
                        padding-bottom: 10px;
                        min-height: 50px;
                        overflow-wrap: break-word;
                    }
                     .block-img {
                        text-align: left;
                        border: 1px solid #191919;
                        box-shadow: 3px 3px 2px 2px #151515;
                        border-radius: 75px;
                        width: 100px;
                        height: 100px;
                        object-fit: cover;
                    }
                     .block-actions, .block-sets, .block-quant {
                        display: flex;
                        border-bottom: 1px solid #404040;
                        padding-top: 10px;
                        padding-bottom: 10px;
                    }
                     .block-sets {
                        text-align: left;
                        color: #34dcbe;
                        font-weight: 600;
                    }
                     .block-quant {
                        text-align: left;
                        color: #34dcbe;
                        font-weight: 600;
                    }
                     .block-actions {
                        text-align: left;
                        color: #34dcbe;
                        font-weight: 600;
                        border-bottom: none;
                    }
                     .block-actions-label {
                        text-align: left;
                        color: #606060;
                        font-weight: 300;
                        font-size: 12pt;
                    }
                     .block-icon-actions {
                        color: #707070;
                    }
                     .block-share-fill {
                        margin-left: 10px;
                    }
                     .block-icon-action {
                        transition: ease all 0.5s;
                    }
                     .block-icon-action:hover, .block-icon-action:active, .block-icon-action:focus {
                        transform: scale(1.10);
                        color: #34dcbe;
                        cursor: pointer;
                    }
                     .exc-block-sets-text {
                        font-size: 16pt;
                        font-weight: 700;
                    }
                    
                `}
            </style>
            <Row className="single-workout-block-row">
                <Col className="single-workout-block-name-col" xs="8" sm="6">                 
                    <div>
                        <img src={benchlogo} alt="Bench Logo" className="block-img"></img>
                    </div>  
                    <div className="block-name">
                        {name}
                    </div>                            
                </Col>
                <Col className="single-workout-block-info-col" xs="4" sm="4">
                    <div className="block-sets"><span><span className="exc-block-sets-text">{sets}</span>&nbsp;&nbsp;set(s)</span></div>
                    <div className="block-quant"><span className="exc-block-sets-text">{quantity}</span>&nbsp;&nbsp;rep(s)</div>
                    <div className="block-actions">                 
                        <span className="block-icon-actions">
                            <Icon.ShareFill className="block-icon-action block-share-fill" height={25} width={25} />
                        </span>
                    </div>
                </Col>
            </Row>
        </>
       
    )
} 