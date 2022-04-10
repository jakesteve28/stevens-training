import React from 'react';
import { Row } from "react-bootstrap";
import benchlogo from '../../imgs/462bench.jpg';
import ExerciseNamePic from "./ExerciseNamePic";
import ExerciseDataActions from "./ExerciseDataActions";

interface SingleWorkoutExerciseBlockProps extends React.HTMLAttributes<Element> {
    exerciseMapping: any;
}

export default function SingleWorkoutMappedExerciseListItem({ exerciseMapping }: SingleWorkoutExerciseBlockProps) {
    const { quantity, duration, sets } = exerciseMapping; 
    const { name, primaryUpload } = exerciseMapping.exercise; 
    return (
        <> 
            <style type="text/css">
                {`
                    .single-workout-block-row {
                        border-bottom: 1px solid #404040;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        background-color: transparent;
                        transition: ease all 0.5s;
                        cursor: pointer;
                    }
                     .single-workout-block-row:active, .single-workout-block-row:hover, .single-workout-block-row:focus {
                        background-color: #181818;
                    }
                     @media only screen and (max-width: 400px) {
                        .no-show-narrow {
                        display: none;
                        visibility: hidden;
                    }
                     }
                     @media only screen and (max-width: 400px) {
                        .exercises-list-card-body {
                        max-height: 60vh;
                    }
                `}
            </style>
            <Row className="single-workout-block-row">
                <ExerciseNamePic xs="8" sm="6" logo={benchlogo} name="Exercises" />
                <ExerciseDataActions xs="4" sm="4" sets={sets} quantity={quantity} duration={duration} />
            </Row>
        </>     
    )
} 