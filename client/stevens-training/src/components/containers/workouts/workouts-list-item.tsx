import { useState } from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap'; 
import ReactTooltip from 'react-tooltip';
import global, { Workout } from '../../../globals';
import WorkoutTypeIcon from '../../workouts/WorkoutTypeIcon';
import * as Icon from 'react-bootstrap-icons';

interface WorkoutListItem extends React.HTMLAttributes<Element> {
    workout: Workout; 
}

export default function WorkoutListItem({ workout }: WorkoutListItem){
    const [showQuickInfo, setShowQuickInfo] = useState(false); 
    const { name = "default", tags = [], workoutFocus = "strength", desc = "default desc", userId } = workout;
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
                        width: 95%;
                        min-width: 400px;
                        max-height: 400px;
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
                        align-items: center; 
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
                        font-size: 24pt;
                        padding-left: 15px;
                        font-weight: 600;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow:hidden;
                        margin-top: 25px;
                        color: #808080;
                    }
                    .workout-list-item:hover {
                        background-color: #121212;
                        cursor: pointer;
                    }
                    .workout-tags {
                        text-align: center;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        height: 110px;
                        padding-top: 5px;
                    }
                    
                    @media only screen and (max-width: 600px) {
                        .workout-tags {
                          display: none;
                        }
                        .workout-list-item {
                            max-width: 400px;
                        }
                        .workout-list-item-desc { display: none; }
                        .tags-span { max-width: 80%; }
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
                      .tags-span {
                        max-width: 70%;
                        display: inline-block;
                        padding-top: 5px;
                        padding-bottom: 15px;
                      }
                      .workout-name {
                          padding-bottom: 15px;
                      }
                      .workout-list-item-desc {
                          padding: 15px;
                          margin-top: auto; 
                          margin-bottom: auto;
                          text-align: left;
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
                        <Col xs="2" sm="1" className="workout-type-icon pt-3">
                            <div className="focus-badge"><WorkoutTypeIcon workoutType={workoutFocus} /></div>
                            <div className="badge-label">{workoutFocus}</div>
                        </Col>
                        <Col xs="10" sm="6" className="workout-name">
                            <div className="name-text">{name}</div>
                            <span className="tags-span">{tags.map(tag => (<div className="tag-bubble">{`${tag}`}</div>))}</span>          
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