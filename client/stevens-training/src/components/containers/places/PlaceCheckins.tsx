import { Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { Checkin } from "../../../globals";
interface PlaceCheckinsProps extends React.HTMLAttributes<Element> {
    place: any;
    checkins?: Array<Checkin>; 
}

export default function PlaceCheckins({ place, checkins }: PlaceCheckinsProps) {
    return (
        <>
            <style type="text/css">
                {
                    `
                        .place-checkins-cont {
                            width: 100%;
                            min-height: 350px;
                            background-color: #202020;
                            margin-top: 20px;
                            border-radius: 10px;
                        }
                        .stats-title-row {
                            text-align: left; 
                            font-size: 22pt;
                            font-weight: 500;
                            paddding-left: 15px;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            border-bottom: 1px solid #404040;
                        }
                        .no-data-checkins {
                            text-align: center;
                            font-size: 13pt; 
                            color: #404040;
                        }
                    `
                }
            </style>
            <Container fluid className="place-checkins-cont">
                <Row className="stats-title-row">
                    <Col xs="9" md="10">Recent Checkins</Col>
                    <Col><Icon.ThreeDotsVertical className="more-stats-icon" /></Col>
                </Row>
                {
                    (checkins) ? checkins.map(checkin => (
                        <>
                            <Row>
                                {
                                    checkin.workout.name
                                }
                                {
                                    checkin.username
                                }
                            </Row>
                        </>
                    )) : <Row className="no-data-checkins"><Col>No checkins found</Col></Row>
                }
            </Container>
        </>
    );
}