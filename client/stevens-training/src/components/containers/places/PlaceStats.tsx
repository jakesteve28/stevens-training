import { Container, Row, Col } from "react-bootstrap";
import  * as Icon from 'react-bootstrap-icons';
interface PlaceStatsProps extends React.HTMLAttributes<Element> {
    place: any;
}

export default function PlaceStats({ place }: PlaceStatsProps) {
    return (
        <>
        <style type="text/css">
            {
                `
                    .place-stats-cont {
                        width: 100%;
                        min-height: 350px;
                        background-color: #202020;
                        margin-top: 20px;
                        border-radius: 10px;
                        padding-bottom: 20px;
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
                    .stats-data-row {
                        margin-top: 15px;
                        text-align: left;
                    }
                    .stats-data-label {
                        color: #34dcbe;
                        font-weight: 200;
                        font-size: 14pt;
                    }
                    .more-stats-icon {
                        color: #34dcbe; 
                        width: 20; 
                        height: 20;
                        text-align: right;
                        margin-left: auto;
                    }
                `
            }
        </style>
            <Container fluid className="place-stats-cont">
                <Row className="stats-title-row">
                    <Col xs="9" md="10">Stats</Col>
                    <Col><Icon.ThreeDotsVertical className="more-stats-icon" /></Col>
                </Row>
                <Row className="stats-data-row">
                    <Col xs="5" className="stats-data-label">
                        Busiest Time
                    </Col>
                    <Col>
                        6pm
                    </Col>
                </Row>
                <Row className="stats-data-row">
                    <Col xs="5" className="stats-data-label">
                        Dead Time
                    </Col>
                    <Col>
                        11am
                    </Col>
                </Row>
                <Row className="stats-data-row">
                    <Col xs="5" className="stats-data-label">
                        Popular Workout
                    </Col>
                    <Col>
                        Legs
                    </Col>
                </Row>
                <Row className="stats-data-row">
                    <Col xs="5" className="stats-data-label">
                        Popular Training Type
                    </Col>
                    <Col>
                        Powerlifting
                    </Col>
                </Row>
                <Row className="stats-data-row">
                    <Col xs="5" className="stats-data-label">
                        Users at location
                    </Col>
                    <Col>
                        54
                    </Col>
                </Row>
            </Container>
        </>
    );
}