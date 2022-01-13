import React from 'react';
import { selectWorkouts } from "../../features/user/userSlice"
import { useSelector } from 'react-redux';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import global from '../../globals';
import WorkoutTypeIcon from '../workouts/WorkoutTypeIcon';
import * as Icon from 'react-bootstrap-icons';

export function WorkoutListItem({ name = "default", tags = [], workoutType = global.workoutFocuses.other }){
    return (
        <>
            <style type="text/css">
                {
                `
                    .workout-list-item {
                        background-color: rgba(20, 20, 20, 0.85);
                        color: #34dcbe;
                        height: min-content;
                        max-width: 700px;
                        min-width: 400px;
                        max-height: 125px;
                        text-align: left;
                        margin-left: auto;
                        margin-right: auto;
                        margin-bottom: 2px;
                        overflow: hidden;
                        border-radius: 5px;
                        opacity: 0.95;
                        transition: ease all 0.25s;
                        box-shadow: 0px 1px 2px 2px black;
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
                    .search-bar {
                        background-color: rgba(50, 50, 50, 0.25);
                        max-width: 690px;
                        min-width: 400px;
                        text-align: left;
                        padding: 5px;
                        border-radius: 5px;
                        margin-right: auto;   
                        margin-left: auto;
                        margin-bottom: 10px;
                    }
                    .search-bar:hover {
                        filter: brightness(120%);
                        cursor: pointer;
                    }
                    @media only screen and (max-width: 600px) {
                        .workout-tags {
                          display: none;
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
                `
                }
            </style>
            <ListGroup.Item className="workout-list-item">
                <Container fluid>
                    <Row className="h-100">
                        <Col xs="2" className="workout-type-icon">
                            <div className="focus-badge"><WorkoutTypeIcon /></div>
                            <div className="badge-label">Power</div>
                        </Col>
                        <Col xs="10" sm="6" className="workout-name">
                            <div className="name-text h-100">{name}</div>
                        </Col>
                        <Col className="workout-tags">
                            <div className="w-100 tag-label">Tags:</div>                          
                            {tags.map(tag => (<div className="tag-bubble">{`${tag}`}</div>))}
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        </>
    )
}

export function WorkoutsList(...props: any) {
    const { workouts } = props;
    return (
            <ListGroup>
                <WorkoutListItem name="Heavy Squats" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Heavy Squats" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Heavy Squats" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Heavy Squats" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Heavy Squats" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Heavy Squats" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Heavy Squats" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Heavy Squats" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
                <WorkoutListItem name="Heavy Squats" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>

            
            
            </ListGroup>
    )
}
export function WorkoutsListView() {
    return (
        <>
            <style type="text/css">{
                `
                    .workouts-list-container {
                        margin-top: 100px;
                        height: 70vh;
                    }
                    .workout-list-col {
                        height: 100%;
                        overflow-y: auto;
                        background-color: rgba(12, 12, 12, 0.5);
                        max-width: 800px;
                        margin-left: auto;
                        margin-right: auto;
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
                `
            }
            </style>
            <Container fluid className="workouts-list-container">
                <Row className="mb-4">
                    <Col>
                        <span style={{ color: "#34dcbe" , fontSize: "40pt", fontWeight: 700}}>Workouts <Icon.Bullseye width={60} height={60} color={"#34dcbe"}></Icon.Bullseye></span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="search-bar">
                            <Icon.Search className="search-icon" width={35} height={35} color={"#34dcbe"}></Icon.Search>
                            <input type="text" placeholder="Search..." className="search-input"></input>
                        </div>
                    </Col>
                </Row>
                <Row className="h-100">
                    <Col className="workout-list-col">
                        <WorkoutsList></WorkoutsList>
                    </Col>
                </Row>
            </Container>
        </>
    )
}