import { FunctionComponent, useEffect, useState } from 'react';
import { DefaultWorkout } from '../../../globals'; 
import { Redirect, useParams } from 'react-router-dom';
import { selectWorkouts } from '../../../features/user/userSlice';
import { useSelector } from 'react-redux';
import SingleWorkoutContainer from '../singleworkoutcontainer';

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
                <SingleWorkoutContainer workout={workout} />
            </>
        );
    }
}





  