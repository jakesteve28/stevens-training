const globals = {}
const runTests = async () => {
    const root = document.getElementById('root'); 
    for(let test in tests) {
        const invoke = tests[`${test}`];
        if(invoke.length > 0) { 
            switch(invoke.name){
                case "getUser":  root.innerHTML += 
                    `<div class='flex-cont'>
                        <div class='flex-item'><span class="test_title">Test&nbsp;Name:</span>&nbsp;${test}</div>
                        <div class='flex-item-input'><input type="text" class="testinput" id="input_${test}" placeholder="Username"></input></div>
                        <div class='flex-item-small'><button id="start_${test}">Start Test</button></div>
                        <div class='flex-item'>Passed/Failed: <span class="result" id="result_${test}"></span></div>
                    </div>`; 
                    break; 
                case "getWorkout":  root.innerHTML += 
                    `<div class='flex-cont'>
                        <div class='flex-item'><span class="test_title">Test&nbsp;Name:</span>&nbsp;${test}</div>
                        <div class='flex-item-input'><input type="text" class="testinput" id="input_${test}" placeholder="Workout ID"></input></div>
                        <div class='flex-item-small'><button id="start_${test}">Start Test</button></div>
                        <div class='flex-item'>Passed/Failed: <span class="result" id="result_${test}"></span></div>
                    </div>`; 
                    break; 
                case "getExercise":  root.innerHTML += 
                    `<div class='flex-cont'>
                        <div class='flex-item'><span class="test_title">Test&nbsp;Name:</span>&nbsp;${test}</div>
                        <div class='flex-item-input'><input type="text" class="testinput" id="input_${test}" placeholder="Exercise ID"></input></div>
                        <div class='flex-item-small'><button id="start_${test}">Start Test</button></div>
                        <div class='flex-item'>Passed/Failed: <span class="result" id="result_${test}"></span></div>
                    </div>`; 
                break; 
                case "getGoal":  root.innerHTML += 
                    `<div class='flex-cont'>
                        <div class='flex-item'><span class="test_title">Test&nbsp;Name:</span>&nbsp;${test}</div>
                        <div class='flex-item-input'><input type="text" class="testinput" id="input_${test}" placeholder="Goal ID"></input></div>
                        <div class='flex-item-small'><button id="start_${test}">Start Test</button></div>
                        <div class='flex-item'>Passed/Failed: <span class="result" id="result_${test}"></span></div>
                    </div>`; 
                break; 
                case "getPlace":  root.innerHTML += 
                    `<div class='flex-cont'>
                        <div class='flex-item'><span class="test_title">Test&nbsp;Name:</span>&nbsp;${test}</div>
                        <div class='flex-item-input'><input type="text" class="testinput" id="input_${test}" placeholder="Place ID"></input></div>
                        <div class='flex-item-small'><button id="start_${test}">Start Test</button></div>
                        <div class='flex-item'>Passed/Failed: <span class="result" id="result_${test}"></span></div>
                    </div>`; 
                break; 
                case "addExerciseToWorkout":  root.innerHTML += 
                    `<div class='flex-cont'>
                        <div class='flex-item'><span class="test_title">Test&nbsp;Name:</span>&nbsp;${test}</div>
                        <div class='flex-item-input'><input class="testinput" type="text" id="input_exercise_${test}" placeholder="Exercise ID"></input></div>
                        <div class='flex-item-input'><input class="testinput" type="text" id="input_workout_${test}" placeholder="Workout ID"></input></div>
                        <div class='flex-item-input number-input'><input class="testinputnumber" placeholder="0" type="number" id="input_sets_${test}"></input></div>
                        <div class='flex-item-input number-input'><input class="testinputnumber" placeholder="0" type="number" id="input_reps_${test}"></input></div>
                        <div class='flex-item-input number-input'><input class="testinputnumber" placeholder="0" type="number" id="input_duration_${test}"></input></div>
                        <div class='flex-item-input number-input'><input class="testinputnumber" placeholder="0" type="number" id="input_distance_${test}"></input></div>
                        <div class='flex-item-small'><button id="start_${test}">Start Test</button></div>
                        <div class='flex-item'>Passed/Failed: <span class="result" id="result_${test}"></span></div>
                    </div>`; 
                break; 
                case "removeExerciseFromWorkout":  root.innerHTML += 
                `<div class='flex-cont'>
                    <div class='flex-item'><span class="test_title">Test&nbsp;Name:</span>&nbsp;${test}</div>
                    <div class='flex-item-input'><input class="testinput" type="text" id="input_${test}" placeholder="Workout ID"></input></div>
                    <div class='flex-item-input'><input class="testinput" type="text" id="input_${test}" placeholder="Mapping ID"></input></div>
                    <div class='flex-item-small'><button id="start_${test}">Start Test</button></div>
                    <div class='flex-item'>Passed/Failed: <span class="result" id="result_${test}"></span></div>
                </div>`; 
                break; 
                default: break;
            }
        } else root.innerHTML += `
            <div class='flex-cont'>
                <div class='flex-item'><span class="test_title">Test&nbsp;Name:</span>&nbsp;${test}</div>
                <div class='flex-item-small'><button id="start_${test}">Start Test</button></div>
                <div class='flex-item'>Passed/Failed: <span class="result" id="result_${test}"></span></div>
            </div>
        `;
    }
    for(let test in tests) {
        document.getElementById(`start_${test}`).onclick = () => {
            const invoke = tests[`${test}`];
            if(invoke.length > 0) { 
                switch(invoke.name){
                    case "getUser": invoke(globals?.user?.id); break; 
                    case "getWorkout": invoke(globals?.workout?.id); break;
                    case "getExercise": invoke(globals?.exercise?.id); break;
                    case "getGoal": invoke(globals?.user?.id); break;
                    case "getPlace": invoke(globals?.place?.id); break;
                    case "addExerciseToWorkout": invoke(globals?.exercise?.id, globals?.workout?.id, 10, 10, 10, 10); break; 
                    case "removeExerciseFromWorkout": invoke(globals?.workout.id, globals?.exercise?.mappingId); break;
                    default: break;
                }
            } else invoke();
        }
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
        const text = user.userName ? "PASS" : "FAIL";
        const color = user.userName ? "green": "red";
        document.getElementById(`result_createUser`).innerHTML = text;
        document.getElementById(`result_createUser`).style = `color:${color};`
        return user;
    },
    getUser: async (userId) => {
        console.log("Testing getUser, only works for current logged in user w/ refresh token, unless admin"); 
        const res = await fetch(`https://localhost:3000/user/${userId}`, { credentials: "include" });
        const user = await res.json();
        globals.user = user;
        return user;
    },
    getStory: async () => {
        console.log("Testing getStory, only works for current logged in user w/ refresh token, unless admin"); 
        const res = await fetch(`https://localhost:3000/user/story`, { credentials: "include", method: "GET" });
        const story = await res.json();
        globals.story = story; 
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
        globals.user = user;
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
    createWorkout: async () => {
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
        globals.workout = result;
        if(result) return result; 
        else return null; 
    },
    getWorkout: async (workoutId) => {
        console.log("Testing get workout");
        const workout = await fetch(`https://localhost:3000/workout/${workoutId}`, {
            credentials: "include"  
        });
        const result = await workout.json(); 
        globals.workout = result; 
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
        globals.exercise = result; 
        if(result) return result; 
        else return null; 
    },
    getExercise: async (exerciseId) => {
        console.log("Testing get exercise");
        const exercise = await fetch(`https://localhost:3000/exercise/${exerciseId}`, {
            credentials: "include",
        });
        const result = await exercise.json(); 
        globals.exercise = exercise; 
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
        globals.workout = result; 
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
        globals.workout = result; 
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
        globals.place = result;
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
    getUserGoals: async (userId) => {
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
}

