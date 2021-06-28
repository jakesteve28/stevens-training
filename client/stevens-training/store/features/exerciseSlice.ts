import { createSlice } from '@reduxjs/toolkit';
export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    exercises: {}
  },
  reducers: {
    addExercise(state: any, action: any) {
        if(!state.exercises[`${action.payload.id}`]) {
            state.exercises[`${action.payload.id}`] = action.payload; 
        } else {
            state.exercises[`${action.payload.id}`] = Object.assign(state.exercises[`${action.payload.id}`], ...action.payload);
        }   
    },
    removeExercise(state: any, action: any) {
        delete state.exercises[`${action.payload}`]
    }
  }
});
export default exerciseSlice.reducer;
