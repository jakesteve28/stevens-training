import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultExercise, DefaultPlace, DefaultWorkout, ExampleCheckins } from '../../globals';
export const host = "https://localhost:3000"; 

const testWorkout = DefaultWorkout;

// const testWorkout = {
//   id: "test",
//   name: "test",
//   workoutFocus: "Strength", 
//   uploads: ["/uploads/uuid", "/uploads/uuid2"],  
//   primaryUpload: "/uploads/uuid", 
//   exerciseMapping: [{
//     mappingId: "uuid",
//     exercise: {
//       id: "uuid5", 
//       name: "bench",
//       desc: "flat bench heavy",
//       uploads: ["/uploads/uuid3", "/uploads/uuid4"],
//       exerciseType: "Heavy",
//       createdAt: "03-03-2022",
//       primaryUpload: "/uploads/uuid3"
//     },
//     sets: "3",
//     rest: "1:30",
//     quantity: "15",
//     duration: "45 seconds",
//     order: 0 
//   }],
//   userId: "uuiduser",
//   tags: ['Tough', 'Tiring', 'Burn', 'Challenging', 'New', 'TagTest', 'idk','idk','idk','idk','idk','idk','idk','idk','idk', ]
// }

const getNearbyUsers = createAsyncThunk(
  'user/getNearbyUsers', 
  async (distance: number, { getState, requestId, rejectWithValue, signal}) => {
    const state =  getState() as { user: { currentNearbyRequestId: string } }; 
    if(requestId !== state.user.currentNearbyRequestId) { 
      const res = await fetch(`${host}/user/nearby/${distance || 5}`, {
          credentials: "include", 
          signal: signal,
      });
      const users = await res.json();
      if(!users || !Array.isArray(users)) {
        rejectWithValue("Error fetching users"); 
      }
      return users;
    }
  }
)

const getNearbyPlaces = createAsyncThunk(
  'user/getNearbyPlaces',
  async (distance: number, { getState, requestId, rejectWithValue, signal}) => {
    const state =  getState() as { user: { currentPlaceRequestId: string } }; 
    if(requestId !== state.user.currentPlaceRequestId) { 
      const res = await fetch(`${host}/user/nearbyplaces/${distance || 5}`, {
          credentials: "include", 
          signal: signal,
      });
      const places = await res.json();
      if(!places || !Array.isArray(places)) {
        rejectWithValue("Error fetching nearby places"); 
      }
      return places;
    } 
  }
)

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
    currentWorkout: DefaultWorkout, 
    workouts: [testWorkout, DefaultWorkout], 
    exercises: [DefaultExercise], 
    uploads: [], 
    goals: [], 
    sentmessages: [], 
    receivedmessages: [],
    nearbyUsers: [], 
    nearbyPlaces: [DefaultPlace, DefaultPlace, DefaultPlace],
    loadingPlaces: false, 
    loadingNearbyUsers: false,
    currentPlaceRequestId: "",
    currentNearbyRequestId: "",
    checkins: ExampleCheckins
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
        if(key === 'darkMode') {
          state.user[`${key}`] = val; 
        }
        else if(val && val !== "") {
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
    setCurrentWorkout: (state: any, action: any) => {
      state.currentWorkout = action.payload;
    },    
    clear: (state: any) => {
      state.loggedIn = false;
      state.user = {
        id: "",
        firstName: "", 
        lastName: "", 
        email: "", 
        height: "", 
        weight: "", 
        darkMode: true, 
        maxes: "", 
        status: "(empty)", 
        latitude: "", 
        longitude: "", 
        primaryUpload: ""
      };
      state.story = [];
      state.profilePictures = []; 
      state.currentWorkout = {}; 
      state.workouts = [];
      state.exercises = []; 
      state.uploads = []; 
      state.goals = [];
      state.sentmessages = [];
      state.receivedmessages = [];
      state.nearbyUsers = [];
      state.loadingNearbyUsers = false; 
      state.loadingPlaces = false; 
      state.nearbyPlaces = [];
      state.loadingPlaces = false;
      state.loadingNearbyUsers = false;
      state.currentPlaceRequestId = "";
      state.currentNearbyRequestId = "";
    }
  },

  extraReducers: builder => {
    builder.addCase(getNearbyUsers.fulfilled, (state, action) => {
      if(state.loadingNearbyUsers === true && 
         state.currentNearbyRequestId === action.meta.requestId) {
           state.loadingNearbyUsers = false; 
           state.nearbyUsers = action.payload; 
           state.currentNearbyRequestId = "";
         }
    }).addCase(getNearbyUsers.pending, (state, action) => {
      if(state.loadingNearbyUsers === false) {
        state.loadingNearbyUsers = true; 
        state.currentNearbyRequestId = action.meta.requestId;
      }
    }).addCase(getNearbyUsers.rejected, (state, action) => {
      if(state.loadingNearbyUsers === true && 
         state.currentNearbyRequestId === action.meta.requestId) {
          state.loadingNearbyUsers = false; 
          state.currentNearbyRequestId = ""; 
        }
    }).addCase(getNearbyPlaces.fulfilled, (state, action) => {
      if(state.loadingPlaces === true && 
        state.currentPlaceRequestId === action.meta.requestId) {
          state.loadingPlaces = false; 
          state.nearbyPlaces = action.payload; 
          state.currentPlaceRequestId = "";
        }
    }).addCase(getNearbyPlaces.pending, (state, action) => {
      if(state.loadingPlaces === false) {
        state.loadingPlaces = true; 
        state.currentPlaceRequestId = action.meta.requestId;
      }
    }).addCase(getNearbyPlaces.rejected, (state, action) => {
      if(state.loadingPlaces === true && 
         state.currentPlaceRequestId === action.meta.requestId) {
         state.loadingPlaces = false; 
         state.currentPlaceRequestId = ""; 
       }
    })
  }
});

export const { 
  login, 
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
  rmExercise,
  rmFromStory,
  rmWorkout,
  rmProfilePic,
  rmUpload,
  setCurrentWorkout
  } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;
export const selectLoggedIn = (state: any) => state.user.loggedIn;
export const selectStory = (state: any) => state.user.story;
export const selectInbox = (state: any) => state.user.receivedmessages; 
export const selectSent = (state: any) => state.user.sentmessages; 
export const selectGoals = (state: any) => state.user.goals; 
export const selectUploads = (state: any) => state.user.uploads; 
export const selectExercises = (state: any) => state.user.exercises; 
export const selectWorkouts = (state: any) => state.user.workouts; 
export const selectProfilePictures = (state: any) => state.user.profilePictures; 
export const selectNearbyUsers = (state: any) => state.user.nearbyUsers; 
export const selectNearbyPlaces = (state: any) => state.user.nearbyPlaces; 
export const selectCheckins = (state: any) => state.user.checkins;
export const selectCurrentWorkout = (state: any) => state.user.currentWorkout;
// export const selectWorkoutById = (workoutId: string) => (state: any) => { return state.workouts.filter((workout: any) => workout.id === workoutId)[0] || null }



export default userSlice.reducer;
