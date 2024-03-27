function Validation(values){
    // alert("")
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    if(values.name === ""){
        error.name = "Name should not be empty"
    }else {
        error.name = ""
    }

    if(values.email === ""){
        error.email = "Email should not be empty"
    }else if(!email_pattern.test(values.email)){
        error.email = "Email Didn't match"
    }else {
        error.email = ""
    }

    // if(values.actual_area === ""){
    //     error.actual_area = "Actual Area should not be empty"
    // }else {
    //     error.actual_area = ""
    // }

    // if(values.interest_area === ""){
    //     error.interest_area = "Interest Area should not be empty"
    // }else {
    //     error.interest_area = ""
    // }

    // if(values.skils === ""){
    //     error.skils = "Skills should not be empty"
    // }else {
    //     error.skils = ""
    // }
    
    // if(values.user_type === ""){
    //     error.user_type = "User type should not be empty"
    // }else {
    //     error.user_type = ""
    // }

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