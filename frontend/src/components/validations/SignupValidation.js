function Validation(values){
    // alert("")
    let error = {}

    // required patterns
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    // name validation
    if(values.name === ""){
        error.name = "Name should not be empty"
    }else {
        error.name = ""
    }

    // email validation
    if(values.email === ""){
        error.email = "Email should not be empty"
    }else if(!email_pattern.test(values.email)){
        error.email = "Email Didn't match"
    }else {
        error.email = ""
    }

    // actual_area validation
    if(values.actual_area === ""){
        error.actual_area = "Actual Area should not be empty"
    }else {
        error.actual_area = ""
    }

    // ineterest_area validation
    if(values.interest_area === ""){
        error.interest_area = "Interest Area should not be empty"
    }else {
        error.interest_area = ""
    }

    // skills validation
    if(values.skills === ""){
        error.skills = "Skills should not be empty"
    }else {
        error.skills = ""
    }
    
    // user_type validation
    if(values.user_type === ""){
        error.user_type = "User type should not be empty"
    }else {
        error.user_type = ""
    }

    // password validation
    if(values.password === ""){
        error.password = "Password should not be empty"
    }else if(!password_pattern.test(values.password)){
        error.password = "Password didn't match"
    }else {
        error.password = ""
    }

    return error;
}

export default Validation;