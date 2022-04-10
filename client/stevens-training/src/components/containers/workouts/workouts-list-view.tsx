import { Col, Container, ListGroup, Row } from "react-bootstrap";
import WorkoutListItem from "./workouts-list-item";
import global from '../../../globals';
import * as Icon from 'react-bootstrap-icons'; 

function ExampleWorkoutsList() { 
    return (
    <>
            <WorkoutListItem name="Heavy Leg Day" workoutType={global.workoutFocuses.strength} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
            <WorkoutListItem name="Arm Day" workoutType={global.workoutFocuses.bodybuilding} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
            <WorkoutListItem name="Slow Run" workoutType={global.workoutFocuses.cardio} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
            <WorkoutListItem name="Jefferson Deadlifts" workoutType={global.workoutFocuses.flexibility} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
            <WorkoutListItem name="Circuit" workoutType={global.workoutFocuses.mix} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
            <WorkoutListItem name="Yoga" workoutType={global.workoutFocuses.other} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
            <WorkoutListItem name="Squats" workoutType={global.workoutFocuses.power} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
            <WorkoutListItem name="Planks" workoutType={global.workoutFocuses.stability} tags={['Tough', 'Tiring', 'Burn', 'Tiring', 'Tiring', 'Tiring', 'Tiring', 'Tiring'] as any}/>
    </>
) }

export default function WorkoutsListView() {
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
                        background-color: rgba(12, 12, 12, 0.4);
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
                        <ListGroup>
                            <ExampleWorkoutsList />
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}