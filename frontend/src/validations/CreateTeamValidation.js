function Validation(values){
    // alert("")
    let error = {}

    // team_name validation
    if(values.team_name === ""){
        error.team_name = "Team Name should not be empty"
    }else {
        error.team_name = ""
    }

    // leader_user_id validation
    if(values.leader_user_id === ""){
        error.leader_user_id = "Leader user ID should not be empty"
    }else {
        error.leader_user_id = ""
    }

    // team_area validation
    if(values.team_area === ""){
        error.team_area = "Team Area should not be empty"
    }else {
        error.team_area = ""
    }

    // description validation
    if(values.description === ""){
        error.description = "Description should not be empty"
    }else {
        error.description = ""
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