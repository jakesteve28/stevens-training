const a = {}
const runTests = async () => {
    alert("Starting tests");
    const userCreate = await tests.createUser(); 
    const userGet = await tests.getUser(userCreate.id);
    if(userGet){
        document.getElementById("userget").innerHTML += " TRUE, User: " + JSON.stringify(userGet);
        console.log("User get passed", userGet);
    }
    const userRefresh = await tests.refresh(); 
    if(userRefresh){
        document.getElementById("userrefresh").innerHTML += " TRUE, User: " + JSON.stringify(userRefresh);
        console.log("User refresh passed", userRefresh);
    }
    const userLocation = await tests.updateLocation();
    if(userLocation){
        document.getElementById("userlocation").innerHTML += " TRUE, User: " + JSON.stringify(userLocation);
        console.log("User location passed", userGet);
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
        if(user){
            document.getElementById("usercreate").innerHTML += " TRUE, User: " + user;
            console.log("User created passed", user);
        }
        return user;
    },
    getUser: async (userId) => {
        console.log("Testing getUser, only works for current logged in user w/ refresh token, unless admin"); 
        const res = await fetch(`https://localhost:3000/user/${userId}`);
        return res.json();
    },
    refresh: async () => {
        console.log("Testing refresh"); 
        const res = await fetch(`https://localhost:3000/user/refresh`)
        return res.json();
    },
    updateLocation: async () => {
        console.log("Testing refresh"); 
        const res = await fetch(`https://localhost:3000/user/location`, {
            method: "PUT", 
            body: JSON.stringify({ latitude: "45.60", longitude: "49.98" }),
            headers: {
                "Content-Type" : "application/json"
            }
        });
        return res.json();
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

