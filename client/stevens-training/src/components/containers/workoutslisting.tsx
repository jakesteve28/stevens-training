import React, { useState } from 'react';
import { selectWorkouts } from "../../features/user/userSlice"
import { useSelector } from 'react-redux';
import { Row, Col, Container, ListGroup, Tooltip } from 'react-bootstrap';
import global from '../../globals';
import WorkoutTypeIcon from '../workouts/WorkoutTypeIcon';
import * as Icon from 'react-bootstrap-icons';
import ReactTooltip from 'react-tooltip';

export function WorkoutListItem({ name = "default", tags = [], workoutType = global.workoutFocuses.other }){
    const [showQuickInfo, setShowQuickInfo] = useState(false); 
    return (
        <>
            <style type="text/css">
                {
                `  
                    .workout-desc-row {
                        padding-top: 10px;
                        min-height: 70px;
                        border-top: 1px solid #212121;
                        text-align: center;
                        cursor: auto;
                    }

                    .hide-quick {
                        display: none;
                    }

                    .workout-row {
                        min-height: 125px;
                        border-bottom: 1px solid #404040;
                    }
                
                    .sort-by-type, .sort-by-tags {
                        font-weight: 600; 
                        color: #404040;
                        font-size: 15pt;
                    }

                    .sort-by-type:hover, .sort-by-tags:hover {
                        color: #34dcbe;
                        transform: scale(1.05);
                        cursor: pointer;
                    }

                    .workout-list-item {
                        background-color: transparent;
                        color: #34dcbe;
                        height: min-content;
                        max-width: 700px;
                        min-width: 400px;
                        max-height: 250px;
                        text-align: left;
                        margin-left: -25px;
                        margin-right: auto;
                        margin-bottom: 5px;
                        overflow: hidden;
                        border-radius: 5px;
                        transition: ease all 0.25s;
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
                    }
                    .tag-bubble:hover {
                        color: #ccccccc;
                        transform: scale(1.05);
                        cursor: pointer;
                        filter: brightness(150%);
                    }
                    .tag-label {
                        text-align: center;
                        font-size: 10pt;
                        color: #404040;
                        font-weight: 700;
                        margin-bottom: 3px;
                    }
                    .focus-badge {
                        display: flex;
                        justify-content: center;
                        align-items: center; .
                        flex-direction: column;
                        min-width: 65px;
                        filter: brightness(150%) contrast(50%);
                        transition: ease all 0.5s;
                        margin-bottom:-10px;
                    }
                    .badge-label {
                        height: 10px;
                        text-align: center;
                        font-size: 10pt;
                        font-weight: 600; 
                        font-style: italic;
                        color: #707070;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .focus-badge:hover {
                        transform: scale(1.05); 
                        filter: contrast(120%) brightness(175%);
                        cursor: pointer;
                    }
                    .name-text {
                        font-size: 27pt;
                        padding-left: 15px;
                        font-weight: 600;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow:hidden;
                        margin-top: 25px;
                        color: #808080;
                    }
                    .workout-list-item:hover {
                        filter: brightness(150%);
                        cursor: pointer;
                        transform: scale(1.025);
                    }
                    .workout-tags {
                        text-align: center;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        height: 110px;
                    }
                    
                    @media only screen and (max-width: 600px) {
                        .workout-tags {
                          display: none;
                        }
                        .workout-list-item {
                            max-width: 400px;
                        }
                      }
                      .search-input {
                          background-color: transparent;
                          border: none; outline: none;
                          color: #34dcbe;
                          margin-left: 15px;
                          font-weight: 500;
                          font-size: 17pt;
                      }
                      .search-icon {
                          padding: 5px;
                          transition: ease all 0.25s;
                      }
                      .search-icon:hover {
                          transform: scale(1.03);
                          filter: hue-rotate(45deg);
                          padding: 2px;
                      }
                      .icon-quick-view {
                          color: #505050;
                          transition: all ease 0.15s;
                      }
                      .icon-quick-view:hover,
                      .icon-quick-view:active,
                      .icon-quick-view:focus,
                      .icon-quick-view:focus-visible {
                          color: #34dcbe;
                          transform: scale(1.20);
                          cursor: pointer;
                      } 
                      .bg-selected-workout-list-item { 
                          background-color: rgba(34, 150, 100, 0.1);
                      }
                `
                }
            </style>    
            <ReactTooltip effect="solid"/>
            <ReactTooltip effect="solid"/>
            <ReactTooltip effect="solid"/>
            <ListGroup.Item className={`workout-list-item ${(showQuickInfo) ? `bg-selected-workout-list-item` : ``}`}  onClick={(e) => { setShowQuickInfo(!showQuickInfo); }}>
                <Container fluid>
                    <Row className="workout-row">
                        <Col xs="2" className="workout-type-icon">
                            <div className="focus-badge"><WorkoutTypeIcon workoutType={workoutType} /></div>
                            <div className="badge-label">{workoutType}</div>
                        </Col>
                        <Col xs="9" sm="6" className="workout-name">
                            <div className="name-text h-100">{name}</div>
                        </Col>
                        <Col className="workout-tags">
                            <div className="w-100 tag-label">Tags:</div>                          
                            {tags.map(tag => (<div className="tag-bubble">{`${tag}`}</div>))}
                        </Col>
                    </Row>
                    <Row className={(showQuickInfo) ? "workout-desc-row show-quick" : "workout-desc-row hide-quick"}>
                        <Col xs="3" className="mt-3">
                            <span className="icon-quick-view" style={{ fontSize: "10pt" }}>
                                <Icon.PlayFill data-tip="Start Workout" width={40} height={40}></Icon.PlayFill>&nbsp;Start&nbsp;Workout                             
                            </span>
                        </Col>
                        <Col xs="1"></Col>
                        <Col xs="3" className="mt-3">
                            <span  className="icon-quick-view" style={{ fontSize: "10pt", fontWeight: 600 }}>
                                <Icon.EyeFill data-tip="View Workout" width={35} height={35}></Icon.EyeFill>&nbsp;View&nbsp;Workout                         
                            </span>
                        </Col>
                        <Col xs="2"></Col>
                        <Col xs="3" className="mt-3">
                            <span  className="icon-quick-view" style={{ fontSize: "10pt" }}>
                                <Icon.PencilFill data-tip="Edit Workout" width={28} height={28}></Icon.PencilFill>&nbsp;Edit&nbsp;Workout
                            </span>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        </>
    )
}

export const renderSimpleTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
        {props.tooltipText}
    </Tooltip>
);

export function ExercisesQuickList(...props: any) {
    const { exercises = [{name:"Squats"}, {name:"Bench"}, {name:"Aerobic Running"}, {name:"Testing 123 123"}] } = props; 
    return (
        <>
            <style type="text/css">
                {
                    `
                        .exercises-quick-item {
                            background-color: #303030;
                            border-radius: 5px;
                            display: flex;
                            width: 75px;
                            margin-left: 8px;
                            text-align: center;
                            padding: 20px;
                            padding-left: 10px;
                            cursor: pointer;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;                   
                        }

                        .exercises-quick-item:hover,
                        .exercises-quick-item:active,
                        .exercises-quick-item:focus,
                        .exercises-quick-item:focus-visible {
                            background-color: #202020;
                            transform: scale(1.05);
                        }

                        .exercises-list-cont {
                            width: 100%; 
                            height: 100%;
                            display: flex;
                            justify-content: start;
                        }
                    
                    `
                }

            </style>
            <div className="exercises-list-cont">
                {
                    exercises.map((exercise: any, index: any) => {
                        if(index >= 5) {
                            if(index === 4) {
                                return (
                                    <div className="exercises-quick-item">
                                        View all
                                    </div>
                                )
                            } else {
                                return;
                            }
                        } else {
                            return (
                                <div className="exercises-quick-item">
                                    {exercise.name}
                                </div>
                                
                            )
                        }              
                    })
                }
                  <div className="exercises-quick-item">
                    View&nbsp;all
                  </div>
            </div>
        </>
    )
}

export function WorkoutsList(...props: any) {
    const { workouts } = props;
    return (
            <ListGroup>
                <WorkoutListItem name="Heavy Leg Day" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Arm Day" workoutType={global.workoutFocuses.bodybuilding} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Slow Run" workoutType={global.workoutFocuses.cardio} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Jefferson Deadlifts" workoutType={global.workoutFocuses.flexibility} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Circuit" workoutType={global.workoutFocuses.mix} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Yoga" workoutType={global.workoutFocuses.other} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Squats" workoutType={global.workoutFocuses.power} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Planks" workoutType={global.workoutFocuses.stability} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
            </ListGroup>
    )
}
export function WorkoutsListView() {
    return (
        <>
            <style type="text/css">{
                `
                    @media only screen and (max-width: 600px) {
                            .workout-list-col {
                                max-height: 45vh;
                                overflow-y: auto;
                            }
                            .workouts-list-container {
                                margin-left: 0px;
                            }
                            .search-bar-row {
                                padding-left: 0px;
                                text-align: left;
                            }
                            .search-bar-col {
                                text-align: left;
                            }
                            .search-bar {
                                margin-left: -50px;
                                min-width: 150px;
                                width: 150px;
                               
                            }
                    }
                    .search-bar-col {
                        padding-left: 40px;
                    }
                    .workouts-list-container {
                        margin-top: 90px;
                        height: 100%;
                    }
                    .workout-list-col {
                        max-height: 70vh;
                        overflow-y: auto;
                        text-align: left;
                    }
                    .workout-list-col::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                        border-radius: 10px;
                        background-color: #191919;
                    }
                    .workout-list-col::-webkit-scrollbar {
                        width: 12px;
                        background-color: #191919;
                    }
                    .workout-list-col::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                        background-color: rgba(52, 220, 190, 0.5)
                    }
                    .search-bar-row {
                        padding: 20px;
                        text-align: left;
                        border-bottom: 1px solid #202020;
                        background-color: #121212;
                    }   
                    .search-bar-type {
                        color: #757575;
                        font-size: 10pt;
                        font-style: italic;
                        padding-left: 10px;
                    }
                    .search-tags, .search-focus {
                        color: #34dcbe; 
                        font-weight: 600;
                        font-style: normal;
                    }
                    .search-bar {
                        display: inline-block;
                        background-color: rgba(50, 50, 50, 0.25);
                        min-width: 400px;
                        width: 400px;
                        text-align: center;
                        padding: 10px;
                        border-radius: 5px;
                        margin-top: 30px;
                        text-align: left;
                        white-space:nowrap;
                    }
                    .search-bar:hover {
                        filter: brightness(120%);
                        cursor: pointer;
                    }
                `
            }
            </style>
            <Container fluid className="workouts-list-container">
                <Row className="search-bar-row">
                    <Col className="search-bar-col">
                        <span className="search-bar">
                            <Icon.Search className="search-icon" width={35} height={35} color={"#34dcbe"}></Icon.Search>
                            <input type="text" placeholder="Search..." className="search-input"></input>
                        </span>
                        <span className="search-bar-type">
                            Search By: <span className="search-tags">Tag</span> | <span className="search-focus">Focus</span>
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col className="workout-list-col">
                        <WorkoutsList></WorkoutsList>
                    </Col>
                </Row>
            </Container>
        </>
    )
}