import { createSlice } from '@reduxjs/toolkit';
export const placeSlice = createSlice({
  name: 'place',
  initialState: {
    places: {}
  },
  reducers: {
    addPlace(state: any, action: any) {
        if(!state.places[`${action.payload.id}`]) {
            state.places[`${action.payload.id}`] = action.payload; 
        } else {
            state.places[`${action.payload.id}`] = Object.assign(state.places[`${action.payload.id}`], ...action.payload);
        }   
    },
    removePlace(state: any, action: any) {
        delete state.places[`${action.payload}`]
    }
  }
});
export default placeSlice.reducer;
