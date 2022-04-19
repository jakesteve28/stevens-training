import { Button,Col,Row  } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons'; 

export interface CheckinActionsProps extends React.HTMLAttributes<Element> {
    currentSelectedLocation: string;
    lastWorkout: string;
}

export default function CheckinActions({ currentSelectedLocation, lastWorkout } : CheckinActionsProps) {
    return (
        <>
            <style>
            {
                `
                    .checkin-button  {
                        font-size: 30pt;
                        font-weight: 500;
                        box-shadow: 1px 1px 5px 0px #191919;
                        color: #94dcbe;
                        border-radius: 7px;
                        width: 350px;
                        margin-right: 30px;
                    }
                    .currentlyselected {
                        color: #34dcbe;
                        font-size: 22pt; 
                        font-weight: 500;
                        text-align: left;
                    }
                    .checkin-cont-actions-label {
                        color: #909090;
                        font-size: 16pt; 
                        font-weight: 300;
                        margin-right: 15px;
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
                    .search-bar-type {
                        color: #757575;
                        font-size: 10pt;
                        font-style: italic;
                        padding-left: 10px;
                    }
                    .search-input { 
                        background-color: rgba(12, 12, 12, 0.4);
                        border: none; 
                        outline: none;
                        color: #34dcbe;
                    }
                    .search-icon {
                        margin-right: 15px;
                    }
                `
            }
            </style>
            <Row className="pt-4">
                <Col xs="2" />
                <Col className="currentlyselected">
                    <span className="checkin-cont-actions-label">
                        Selected: 
                    </span>{`${currentSelectedLocation}`}
                </Col>
                <Col  xs="1" />
            </Row>
            <Row className="pt-4">
                <Col xs="2"  />
                <Col className="currentlyselected">
                    <span className="checkin-cont-actions-label">
                    Last Workout:
                    </span>{`${lastWorkout}`}
                </Col>
                <Col xs="1" />
            </Row>
            <Row>
                <Col xs="2" />
                <Col className="currentlyselected pb-4 pt-4">
                    <Button variant="dark" className="checkin-button" size="lg">
                        Check In
                    </Button>     
                    <span className="search-bar">
                        <Icon.Search className="search-icon" width={35} height={35} color={"#34dcbe"}></Icon.Search>
                        <input type="text" placeholder="Search..." className="search-input"></input>
                    </span>
                </Col>
                <Col xs="1"  />
            </Row>
            
        </>
    )
}