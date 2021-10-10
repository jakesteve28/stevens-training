export const evaluateUsername = (username: string) => {
    return /^([A-Za-z0-9]){8,24}$/.test(username); 
}
export const evaluatePassword = (pw: string) => {
    return /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,24}$/g.test(pw); 

}
export const evaluateName = (name: string) => {
    return /^([A-Za-z]){8,24}$/.test(name); 
}
export const evaluateEmail = (email: string) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}
