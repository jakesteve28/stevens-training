const a = {}
const runTests = async () => {
    alert("Starting tests");
    const userCreate = await tests.createUser(); 
    if(userCreate.userName) {
        document.getElementById("usercreate").innerHTML = " TRUE username: "  + userCreate.userName;
        console.log("User created passed", userCreate);
    } else {
        document.getElementById("usercreate").innerHTML = " FAIL";
    }
    const userGet = await tests.getUser(userCreate.id);
    if(userGet.userName){
        document.getElementById("userget").innerHTML = " TRUE " + userGet.userName;
        console.log("User get passed", userGet);
    } else {
        document.getElementById("userget").innerHTML = " FAIL";
    }
    const userLocation = await tests.updateLocation();
    if(userLocation.userName){
        document.getElementById("userlocation").innerHTML = " TRUE " + userLocation.userName;
        console.log("User location passed", userLocation);
    } else {
        document.getElementById("userlocation").innerHTML = " FAIL";
    }
    const userStory = await tests.getStory();
    if(userStory){
        document.getElementById("userstory").innerHTML = " TRUE " + JSON.stringify(userStory);
        console.log("User story passed", userStory);
    } else {
        document.getElementById("userstory").innerHTML = " FAIL";
    }
    const userLogin = await tests.login();
    if(userLogin){
        document.getElementById("userlogin").innerHTML = " TRUE " + JSON.stringify(userLogin);
        console.log("User login passed", userLogin);
    } else {
        document.getElementById("userlogin").innerHTML = " FAIL";
    }
}

const tests = {
    createUser: async () => {
        console.log("Testing create user");
        const testUser = {
            "firstName": "fNameTestUserStevensDev",
            "lastName": "lNameTestUserStevensDev",
            "email": "testUserStevensDev@email.com",
            "userName": "stevensdev",
            "password": "password"
        };
        const res = await fetch("https://localhost:3000/user/create", 
            { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(testUser) 
            });
        const user = await res.json();
        return user;
    },
    getUser: async (userId) => {
        console.log("Testing getUser, only works for current logged in user w/ refresh token, unless admin"); 
        const res = await fetch(`https://localhost:3000/user/${userId}`, { credentials: "include" });
        const user = await res.json();
        return user;
    },
    getStory: async () => {
        console.log("Testing getStory, only works for current logged in user w/ refresh token, unless admin"); 
        const res = await fetch(`https://localhost:3000/user/story`, { credentials: "include", method: "GET" });
        const story = await res.json();
        return story;
    },
    updateLocation: async () => {
        console.log("Testing updatelocation"); 
        const res = await fetch(`https://localhost:3000/user/location`, {
            method: "PUT", 
            body: JSON.stringify({ latitude: "45.60", longitude: "49.98" }),
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include"
        });
        const user = await res.json();
        return user;
    },
    login: async () => {
        console.log("Testing login"); 
        const res = await fetch(`https://localhost:3000/signon/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ userName: "stevensdev", password: "password" })
        }); 
        const result = await res.json(); 
        if(result) {
            return result; 
        }
    },
    refresh: async () => {
        console.log("Testing refresh, only works for current logged in user w/ refresh token"); 
        const res = await fetch(`https://localhost:3000/signon/refresh`, { credentials: "include", method: "GET" });
        if(res.status !== 500) {
            return true;
        }
    },
    logout: async () => {
        console.log("Testing logout"); 
        const res = await fetch(`https://localhost:3000/signon/logout`, {
            credentials: "include"
        }); 
        const result = await res.json(); 
        if(result) {
            return result;
        }
    },
    resetPW: async () => {

    }, 
    createWorkout: async (userId) => {
        console.log("Testing create workout"); 
        const workout = await fetch(`https://localhost:3000/workout/create`, { 
            credentials: 'include',
            method: "POST", 
            body: JSON.stringify({
                name: "Test Workout", 
                desc: "Test Description", 
                userId: userId,
                workoutFocus: "Failure",
            })
        }); 
        const result = await workout.json(); 
        if(result) return result; 
        else return null; 
    },
    getWorkout: async (workoutId) => {
        console.log("Testing get workout");
        const workout = await fetch(`https://localhost:3000/workout/${workoutId}`, {
            credentials: "include"  
        });
        const result = await workout.json(); 
        if(result) return result; 
        else return null; 
    },
    createExercise: async () => {
        console.log("Testing create exercise");
        const exercise = await fetch(`https://localhost:3000/exercise/create`, {
            credentials: "include",
            method: "POST", 
            body: JSON.stringify({
                name: "Test Exercise", 
                desc: "Test Description", 
                exercistType: "Lifting"
            })
        });
        const result = await exercise.json(); 
        if(result) return result; 
        else return null; 
    },
    getExercise: async (exerciseId) => {
        console.log("Testing get exercise");
        const exercise = await fetch(`https://localhost:3000/exercise/${exerciseId}`, {
            credentials: "include",
        });
        const result = await exercise.json(); 
        if(result) return result; 
        else return null;
    },
    addExerciseToWorkout: async (exerciseId, workoutId, sets, reps, duration, distance) => {
        console.log("Testing add exercise to workout");
        const workout = await fetch(`https://localhost:3000/workout/addexercise/${workoutId}/${exerciseId}?sets=${sets}&reps=${reps}&duration=${duration}&distance=${distance}`, {
            credentials: "include",
            method: "PUT"
        });
        const result = await workout.json(); 
        if(result) return result; 
        else return null;
    },
    removeExerciseFromWorkout: async (workoutId, mappingId) => {    
        console.log("Testing rm exercise from workout");
        const workout = await fetch(`https://localhost:3000/workout/rmexercise/${workoutId}/${mappingId}`, {
            credentials: "include",
            method: "PUT"
        });
        const result = await workout.json(); 
        if(result) return result; 
        else return null;
    },
    addPlace: async () => {
        console.log("Testing create place");
        const place = await fetch(`https://localhost:3000/place/create`, {
            credentials: "include",
            method: "POST", 
            body: JSON.stringify({
                name: "Test Gym", 
                desc: "Test Description",
                longitude: "65", 
                latitude: "65", 
                placeType: "Gym"
            })
        });
        const result = await place.json(); 
        if(result) return result; 
        else return null;
    },
    getPlace: async (placeId) => {
        console.log("Testing get place");
        const place = await fetch(`https://localhost:3000/place/${placeId}`, {
            credentials: "include"
        });
        const result = await place.json(); 
        if(result) return result; 
        else return null;
    },
    getNearbyAPlace: async (placeId, radius) => {
        console.log("Testing get nearby");
        const users = await fetch(`https://localhost:3000/place/${placeId}/users/${radius}`, {
            credentials: "include"
        });
        const result = await users.json(); 
        if(result) return result; 
        else return null;
    },
    createGoal: async () => {
        console.log("Testing create goal");
        const goal = await fetch(`https://localhost:3000/goal/create`, {
            credentials: "include",
            method: "POST", 
            body: JSON.stringify({

            })
        });
        const result = await goal.json(); 
        if(result) return result; 
        else return null;
    },
    getUserGoals: (userId) => {
        console.log("Testing get user goals");
        const goals = await fetch(`https://localhost:3000/goal/user/${userId}`, {
            credentials: "include"
        });
        const result = await goals.json(); 
        if(result) return result; 
        else return null;
    },
    getGoal: async (goalId) => {
        console.log("Testing get goal");
        const goal = await fetch(`https://localhost:3000/goal/${goalId}`, {
            credentials: "include"
        });
        const result = await goal.json(); 
        if(result) return result; 
        else return null;
    },
    uploadStory: async () => {
        console.log("Testing upload story");
        const fileInput = document.querySelector('#story-file-input') ;
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        const res = await fetch(`https://localhost:3000/upload/story`, {
            credentials: "include",
            method: "POST", 
            body: formData, 
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        });
        const result = await res.json(); 
        if(result) return result; 
        else return null;
    },
    uploadWorkout: async (workoutId) => {
        console.log("Testing upload workout");
        const fileInput = document.querySelector('#workout-file-input') ;
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        const res = await fetch(`https://localhost:3000/upload/workout/${workoutId}`, {
            credentials: "include",
            method: "POST", 
            body: formData, 
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        });
        const result = await res.json(); 
        if(result) return result; 
        else return null;
    },
    uploadPlace: async (placeId) => {
        console.log("Testing upload workout");
        const fileInput = document.querySelector('#place-file-input') ;
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        const res = await fetch(`https://localhost:3000/upload/place/${placeId}`, {
            credentials: "include",
            method: "POST", 
            body: formData, 
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        });
        const result = await res.json(); 
        if(result) return result; 
        else return null;
    },
    uploadExercise: async (exerciseId) => {
        console.log("Testing upload exercise");
        const fileInput = document.querySelector('#exercise-file-input') ;
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        const res = await fetch(`https://localhost:3000/upload/exercise/${exerciseId}`, {
            credentials: "include",
            method: "POST", 
            body: formData, 
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        });
        const result = await res.json(); 
        if(result) return result; 
        else return null;
    },
    uploadProfile: async () => {
        console.log("Testing upload profile");
        const fileInput = document.querySelector('#profile-file-input') ;
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        const res = await fetch(`https://localhost:3000/upload/profile`, {
            credentials: "include",
            method: "POST", 
            body: formData, 
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        });
        const result = await res.json(); 
        if(result) return result; 
        else return null;
    },
    testDeletes: async () => {

    },
    cleanUp: async () => {

    }
}

window.onload = function() {
    runTests();
    document.getElementById("testButton").onclick = (e) => runTests();
}

