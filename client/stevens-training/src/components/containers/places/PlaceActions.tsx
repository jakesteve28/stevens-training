import { Button, Col } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

export default function PlaceActions() {
    return (
        <>
            <style>
            {
                `
                    .buttons {

                    }
                    .place-action-button {
                        font-size: 20pt;
                        padding: 15px;
                        border-radius: 10px;
                        text-align: left;
                    }
                `
            }
            </style>
            <Col></Col>
            <Col xs="3">
                <Button className="place-action-button" variant="dark" size="lg">
                    <Icon.ChatSquare /> &nbsp;
                    Add A Comment   
                </Button>              
            </Col>
            <Col xs="3">
                <Button className="place-action-button" variant="dark" size="lg">
                    <Icon.Map /> &nbsp;
                    Check In  
                </Button>
            </Col>  
            <Col></Col>
        </>
    )
}