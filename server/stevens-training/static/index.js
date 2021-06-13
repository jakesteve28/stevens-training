const a = {}
const testUser = {
    "firstName": "fNameTestUserStevensDev",
    "lastName": "lNameTestUserStevensDev",
    "email": "testUserStevensDev@email.com",
    "userName": "stevensdev",
    "password": "password"
}
const runTests = async () => {
    console.log("Initiating tests");
    alert("Starting tests");
    res = await fetch("https://localhost:3000/user/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(testUser) });
    a["usercreate"] = await res.json();
    if(a["usercreate"]){
        document.getElementById("usercreate").innerHTML += "TRUE";
        console.log("User create passed", a["usercreate"]);
    }
}
window.onload = function() {
    runTests();
    document.getElementById("testButton").onclick = (e) => runTests();
}

