function Validation(values){
    let error = {}

    // Fecha de corte: un año atrás desde hoy
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // team_name validation
    if(!values.team_name.trim()){
        error.team_name = "Team Name should not be empty";
    }else {
        error.team_name = "";
    }

    // team_leader_email validation
    // if(!values.team_leader_email.trim()){
    //     error.team_leader_email = "Team Leader Email should not be empty";
    // }else {
    //     error.team_leader_email = "";
    // }

    // team_area validation
    if(!values.team_area.trim()){
        error.team_area = "Team Area should not be empty";
    }else {
        error.team_area = "";
    }

    // description validation
    if(!values.description.trim()){
        error.description = "Description should not be empty";
    }else {
        error.description = "";
    }

    // start_date validation
    if (!isValidDate(values.start_date)) {
        error.start_date = "Start Date should not be empty or invalid";
    } else if (new Date(values.start_date) < oneYearAgo) {
        error.start_date = "Start Date should not be more than one year ago";
    } else {
        error.start_date = "";
    }

    // final_date validation
    if (!isValidDate(values.final_date)) {
        error.final_date = "Final Date should not be empty or invalid";
    } else if (new Date(values.final_date) < oneYearAgo) {
        error.final_date = "Final Date should not be more than one year ago";
    } else {
        error.final_date = "";
    }
    
// Date comparison validation
if (isValidDate(values.start_date) && isValidDate(values.final_date)) {
    const startDate = new Date(values.start_date);
    const finalDate = new Date(values.final_date);

    if (startDate > finalDate) {
        error.final_date = 'Final date cannot be earlier than start date';
    }
}

return error;
}

function isValidDate(dateString) {
    if (!dateString) return false;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false; // Check if the date is valid
    return dateString !== '0000-00-00' && date.getFullYear() > 0;
}

export default Validation;