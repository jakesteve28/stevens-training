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

    },
    logout: async () => {

    },
    resetPW: async () => {

    }, 
    createWorkout: async () => {

    },
    getWorkout: async () => {

    },
    addWorkout: async () => {

    },
    createExercise: async () => {

    },
    getExercise: async () => {

    },
    addExerciseToWorkout: async () => {

    },
    removeExerciseFromWorkout: async () => {

    },
    addPlace: async () => {

    },
    getPlace: async () => {

    },
    getNearbyAPlace: async () => {

    },

}

window.onload = function() {
    runTests();
    document.getElementById("testButton").onclick = (e) => runTests();
}

