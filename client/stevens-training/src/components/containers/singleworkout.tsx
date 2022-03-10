import React, { FunctionComponent, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { Workout, DefaultWorkout } from '../../globals'; 
import { Redirect, useParams } from 'react-router-dom';
import { selectUser, selectWorkouts } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';

export const SingleWorkoutView: FunctionComponent = () => {
    const workoutId: any = useParams();
    const _workouts = useSelector(selectWorkouts);
    const [workout, setWorkout] = useState(DefaultWorkout); 
    useEffect(() => {
        const _workout = _workouts.find((wkout: any) => wkout.id === workoutId.workoutId);
        if(_workout) {
            setWorkout(_workout);
        } else {
            let redirect = { ...DefaultWorkout };
            redirect.id = 'redirect workout';
            setWorkout(redirect);
        }
    }, [_workouts]);
    if(workout.id === 'redirect workout') {
        //try to fetch workout from other user's library if they've shared it 
        return <Redirect to='/workouts'/>;
    } else { 
        return (
            <>
                <SingleWorkout workout={workout} />
            </>
        );
    }
    //pull it up from your workout library
}

export const SingleWorkout: FunctionComponent<{ workout: Workout }> = ({ workout }) => {
    const { name, workoutFocus, uploads,  primaryUpload, exerciseMapping } = workout; 
    return (
        <>
            <style type="text/css">
            {
                `
                    .single-workout-cont {
                        margin-top: 250px;
                        min-height: 500px;
                        color: white;

                    }
                `
            }
            </style>
            <Container fluid className="single-workout-cont">
                <div style={{ fontSize: "50pt" }}>{name}</div>
            </Container>
        </>
    )   
}   