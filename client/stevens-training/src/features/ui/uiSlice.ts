import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
      showAbout: false,
      showForgotInfo: false
    },
    reducers: {
      showAbout: (state: any) => {
        if(state.showAbout == true){
          console.log("Closing About"); 
          state.showAbout = false;
        } else if(state.showAbout == false){
          console.log("Showing About"); 
          state.showAbout = true;
        }
      },
      showForgotInfo: (state: any) => {
        if(state.showForgotInfo == true){
          console.log("Closing Forgot Info"); 
          state.showForgotInfo = false;
        } else if(state.showForgotInfo == false){
          console.log("Showing Forgot Info"); 
          state.showForgotInfo = true;
        }
      },
      
    }
  });
export const { 
    showAbout,
    showForgotInfo
} = uiSlice.actions;

export const selectShowAbout = (state: any) => state.ui.showAbout; 
export const selectShowForgotInfo = (state: any) => state.ui.showForgotInfo; 

export default uiSlice.reducer;