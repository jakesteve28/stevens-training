import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
      showAbout: false,
      showForgotInfo: false,
      currentPage: 'Default Page',
      showBottomNav: false
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
      setCurrentPage: (state: any, action: any) => {
          console.log("Setting Current Page: " + action.payload); 
          state.currentPage = action.payload;
      },
      showBottomNav: (state: any) => {
        state.showBottomNav = true;
      },
      hideBottomNav: (state: any) => {
        state.showBottomNav = false;
      }
    }
  });
export const { 
    showAbout,
    showForgotInfo,
    setCurrentPage,
    showBottomNav,
    hideBottomNav
} = uiSlice.actions;

export const selectCurrentPage = (state: any) => state.ui.currentPage;
export const selectShowAbout = (state: any) => state.ui.showAbout; 
export const selectShowForgotInfo = (state: any) => state.ui.showForgotInfo; 
export const selectShowBottomNav = (state: any) => state.ui.showBottomNav;

export default uiSlice.reducer;