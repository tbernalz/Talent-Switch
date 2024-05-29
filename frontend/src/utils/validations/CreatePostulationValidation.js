function Validation(values){
    // alert("")
    let error = {}

    // postulant_email validation
    // if(!values.postulant_email.trim()){
    //     error.postulant_email = "Postulant Email should not be empty"
    // }else {
    //     error.postulant_email = ""
    // }

    // postulant_actual_area validation
    if(!values.postulant_actual_area.trim()){
        error.postulant_actual_area = "El área actual del postulante no debe estar vacía"
    }else {
        error.postulant_actual_area = ""
    }

    // postulant_interest_area validation
    if(!values.postulant_interest_area.trim()){
        error.postulant_interest_area = "El área de interés del postulante no debe estar vacía"
    }else {
        error.postulant_interest_area = ""
    }
    
    // postulant_skills validation
    if(!values.postulant_skills.trim()){
        error.postulant_skills = "Las habilidades del postulante no deben estar vacías"
    }else {
        error.postulant_skills = ""
    }

    return error;
}

export default Validation;