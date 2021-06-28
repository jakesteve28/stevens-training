import { createSlice } from '@reduxjs/toolkit';
export const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    workouts: {}
  },
  reducers: {
    addWorkout(state: any, action: any) {
        if(!state.workouts[`${action.payload.id}`]) {
            state.workouts[`${action.payload.id}`] = action.payload; 
        } else {
            state.workouts[`${action.payload.id}`] = Object.assign(state.workouts[`${action.payload.id}`], ...action.payload);
        }   
    },
    removeWorkout(state: any, action: any) {
        delete state.workouts[`${action.payload}`]
    }
  }
});
export default workoutSlice.reducer;
