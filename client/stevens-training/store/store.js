import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice';
import placeReducer from './features/placeSlice';
import workoutReducer from './features/workoutSlice';
import exerciseReducer from './features/exerciseSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    place: placeReducer, 
    exercise: exerciseReducer,
    workout: workoutReducer, 
  }
})