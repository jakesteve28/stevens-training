import { FunctionComponent, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LocationMap from "../map/location-map";
import CheckinActions from './checkins-container-actions';
import CheckinsListView from "./checkins-list";
import { prominent } from 'color.js'
import logo from '../../../imgs/462bench.jpg';
import { usePalette } from 'react-palette'
import CheckinsMap from "./checkins-map";
export const CheckinsContainer = () => {
    return (
        <>
        <style>
        {
            `
                .main-checkin-col {
                    height: 100vh;
                    background-color: transparent;
                    padding-left: 30px;
                    padding-right: 30px;
                }
                .checkins-cont {
                    overflow-y: auto;                
                }
                .checkins-cont::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #191919;
                }
                .checkins-cont::-webkit-scrollbar {
                    width: 12px;
                    background-color: #191919;
                }
                .checkins-cont::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: rgba(52, 220, 190, 0.5)
                }
                .checkin-locations-row {
                    min-height: 400px;
                    height: 50%;
                    max-height: 800px;
                    background-color: rgba(52, 220, 190, 0.2);
                }
                .checkin-locations-col {
                    min-height: 400px;
                    max-height: 800px;
                    height: 100%;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #757575;
                }
                
                .checkin-buttons-row {

                }
                .checkin-listview-row {

                }
                .checkin-listview-col {
                    overflow-y: auto;
                    overflow-x: hidden;
                    max-height: 650px; 
                    border-bottom: 5px solid #34dcbe;
                    border-top: 5px solid #404040;
                }
                .checkin-listview-col::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #191919;
                }
                .checkin-listview-col::-webkit-scrollbar {
                    width: 12px;
                    background-color: #191919;
                }
                .checkin-listview-col::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: rgba(52, 220, 190, 0.5)
                }
                .checkin-listview-title-row {     
                    max-width: 75%;
                    margin-left: auto; 
                    margin-right: auto;
                    margin-bottom: 25px;
                    color: #34dcbe;
                    font-size: 35pt;
                    font-weight: 500;
                    border-top: 1px solid #757575;
                    padding-top: 15px;
                }
            `
        }
        </style>
        <Container fluid className="checkins-cont">  
            <Row>
                <Col className="main-checkin-col" xs="12">
                    <Row className="checkin-locations-row mt-5 pt-5">
                        <Col></Col>
                        <Col className="checkin-locations-col" xs="12" sm="10">
                            <CheckinsMap />
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="checkin-buttons-row">
                        <Col></Col>
                        <Col xs="10">
                            <CheckinActions currentSelectedLocation={"Gold's Gym"} lastWorkout="Legs" />
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="checkin-listview-title-row">
                        <Col /> 
                        <Col>
                            My Checkins
                        </Col>
                        <Col />           
                    </Row>
                    <Row className="checkin-listview-row">
                        <Col xs="12" className="checkin-listview-col">
                            <CheckinsListView />
                        </Col>
                    </Row> 
                </Col>                
            </Row>
        </Container>
        </>
    )
}
