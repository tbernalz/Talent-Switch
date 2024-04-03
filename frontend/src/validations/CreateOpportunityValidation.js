function Validation(values){
    // alert("")
    let error = {}

    // opportunity_name validation
    if(values.opportunity_name === ""){
        error.opportunity_name = "Opportunity Name should not be empty"
    }else {
        error.opportunity_name = ""
    }

    // leader_user_id validation
    if(values.leader_user_id === ""){
        error.leader_user_id = "Leader user ID should not be empty"
    }else {
        error.leader_user_id = ""
    }

    // opportunity_area validation
    if(values.opportunity_area === ""){
        error.opportunity_area = "Opportunity Area should not be empty"
    }else {
        error.opportunity_area = ""
    }

    // description validation
    if(values.description === ""){
        error.description = "Description should not be empty"
    }else {
        error.description = ""
    }
    
    // required_skills validation // por ahora puede ser null
    if(values.required_skills === ""){
        error.required_skills = "Required skills should not be empty"
    }else {
        error.required_skillsuser_type = ""
    }

    // start_date validation
    if(values.start_date === ""){
        error.start_date = "Start Date should not be empty"
    }else {
        error.start_date = ""
    }
    
    // description validation
    if(values.final_date === ""){
        error.final_date = "Final Date should not be empty"
    }else {
        error.final_date = ""
    }
    

    return error;
}

export default Validation;