import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    user: {
      id: "",
      firstName: "", 
      lastName: "", 
      email: "", 
      height: "", 
      weight: "", 
      darkMode: true, 
      maxes: "", 
      status: "", 
      latitude: "", 
      longitude: "", 
      primaryUpload: "", 
    },
    story: [], 
    profilePictures: [], 
    currentWorkout: {}, 
    workouts: [], 
    exercises: [], 
    uploads: [], 
    goals: [], 
    sentmessages: [], 
    receivedmessages: []
  },
  reducers: {
    login: (state: any, action: any) => {
      console.log("setting user state after login call", action.payload); 
      for(let key in action.payload.user) {
        let val = action.payload.user[`${key}`]; 
        if(val !== undefined && val !== "" && state.user[`${key}`] !== undefined) {
          state.user[`${key}`] = val;  
        }
      }
      state.loggedIn = true;
    },
    refresh: (state: any, action: any) => {
      state.user = action.payload;
    },
    update: (state: any, action: any) => {
      for(let key in state.user){
        let val = action.user[`${key}`]; 
        if(val && val !== "") {
          state.user[`${key}`] = val;  
        }
      }
    },
    logout: (state: any) => {
      state.loggedIn = false;
      for(let key in state.user){
        if(key === 'darkMode'){
          state.user[`${key}`] = true;
          continue;
        }
        state.user[`${key}`] = "";
      }
    },
    addUploadToStory: (state: any, action: any) => {
      if(state.story.some((storyUpload: any) => storyUpload.id === action.payload.id)) {
        console.error("Error: Cannot add upload to story, already exists in state"); 
        return;
      }
      else state.story.push(action.payload); 
    },
    rmFromStory: (state: any,  action: any) => {
      state.story = state.story.filter((upload: any) => {
          return upload.id !== action.payload; 
      });
    },
    addProfilePic: (state: any, action: any) => {
      if(state.profilePictures.some((pic: any) => pic.id === action.payload.id)) {
        console.error("Error: Cannot add profile pic, already exists in state"); 
        return;
      }
      else state.profilePictures.push(action.payload); 
    }, 
    rmProfilePic: (state: any,  action: any) => {
      state.profilePictures = state.profilePictures.filter((pic: any) => {
        return pic.id !== action.payload; 
      });
    },
    addExercise: (state: any,  action: any) => {
      if(state.exercises.some((exercise: any) => exercise.id === action.payload.id)) {
        console.error("Error: Cannot add exercise, already exists in state"); 
        return;
      }
      else state.exercises.push(action.payload); 
    },
    rmExercise: (state:  any, action: any) => {
      state.exercises = state.exercises.filter((exercise: any) => {
        return exercise.id !== action.payload; 
      });
    },
    addWorkout: (state:  any, action: any) => {
      if(state.workouts.some((workout: any) => workout.id === action.payload.id)) {
        console.error("Error: Cannot add workout, already exists in state"); 
        return;
      }
      else state.workouts.push(action.payload); 
    },
    rmWorkout: (state:  any, action: any) => {
      state.workouts = state.workouts.filter((workout: any) => {
        return workout.id !== action.payload; 
      });
    },
    addMessage: (state:  any, action: any) => {
      if(state.receivedmessages.some((message: any) => message.id === action.payload.id)) {
        console.error("Error: Cannot add received message, already exists in state"); 
        return;
      }
      else state.receivedmessages.push(action.payload); 
    },
    rmMessage: (state:  any, action: any) => {
      state.receivedmessages = state.receivedmessages.filter((msg: any) => {
        return msg.id !== action.payload; 
      });
    },
    addSentMessage: (state:  any, action: any) => {
      if(state.sentmessages.some((message: any) => message.id === action.payload.id)) {
        console.error("Error: Cannot add sent message, already exists in state"); 
        return;
      }
      else state.sentmessages.push(action.payload); 
    },
    rmSentMessage: (state:  any, action: any) => {
      state.sentmessages = state.sentmessages.filter((msg: any) => {
        return msg.id !== action.payload; 
      });
    },
    addGoal: (state:  any, action: any) => {
      if(state.goals.some((goal: any) => goal.id === action.payload.id)) {
        console.error("Error: Cannot add goal, already exists in state"); 
        return;
      }
      else state.profilePictures.push(action.payload); 
    },
    rmGoal: (state:  any, action: any) => {
      state.goals = state.goals.filter((goal: any) => {
        return goal.id !== action.payload; 
      });
    }, 
    addUpload: (state:  any, action: any) => {
      if(state.uploads.some((upload: any) => upload.id === action.payload.id)) {
        console.error("Error: Cannot add upload posted by user, already exists in state"); 
        return;
      }
      else state.profilePictures.push(action.payload); 
    },
    rmUpload: (state:  any, action: any) => {
      state.uploads = state.uploads.filter((upload: any) => {
        return upload.id !== action.payload; 
      });
    },
    clear: (state: any) => {

    }
  }
});

export const { login, 
  logout, 
  refresh, 
  update,
  addExercise,
  addGoal,
  addMessage,
  addSentMessage,
  addUpload,
  addProfilePic,
  addWorkout,
  addUploadToStory,
  rmGoal,
  rmMessage,
  rmSentMessage,
  removeExercise,
  removeFromStory,
  removeWorkout,
  removeProfilePic,
  rmUpload
  } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;
export const selectStory = (state: any) => state.story;
export const selectInbox = (state: any) => state.receivedmessages; 
export const selectSent = (state: any) => state.sentmessages; 
export const selectGoals = (state: any) => state.goals; 
export const selectUploads = (state: any) => state.uploads; 
export const selectExercises = (state: any) => state.exercises; 
export const selectWorkouts = (state: any) => state.workouts; 
export const selectProfilePictures = (state: any) => state.profilePictures; 

export default userSlice.reducer;
