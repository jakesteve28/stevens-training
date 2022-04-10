import { Workout } from "../../../globals";
import React from 'react';
import { Col, Row, Container } from "react-bootstrap";
interface WorkoutMediaProps extends React.HTMLAttributes<Element> {
    workout: Workout;
}

export default function WorkoutMedia({ workout }: WorkoutMediaProps){
    return (
        <>
            <style type="text/css">
            {
                `
                .single-workout-tags-row {
                    border-top: 1px solid #303030;
                    border-bottom: 1px solid #303030;
                    padding-bottom: 10px;
                    padding-top: 15px;
                    margin-left: 15px;
                    margin-right: 15px;
                    min-height: 150px;
                }
                `
            }
            </style>
            <Row className="mt-3 mb-3 single-workout-tags-row">
                <Col xs="12">
                    <Container fluid>
                        
                    </Container>
                </Col>
            </Row>
        </>
    )
} 