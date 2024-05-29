function Validation(values){
    let error = {}

    // Fecha de corte: un año atrás desde hoy
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Validación del nombre del equipo
    if(!values.team_name.trim()){
        error.team_name = "El nombre del equipo no debe estar vacío";
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
        error.team_area = "El área del equipo no debe estar vacía";
    }else {
        error.team_area = "";
    }

    // description validation
    if(!values.description.trim()){
        error.description = "La descripción no debe estar vacía";
    }else {
        error.description = "";
    }

    // start_date validation
    if (!isValidDate(values.start_date)) {
        error.start_date = "La fecha de inicio no debe estar vacía o ser inválida";
    } else if (new Date(values.start_date) < oneYearAgo) {
        error.start_date = "La fecha de inicio no debe ser hace más de un año";
    } else {
        error.start_date = "";
    }

    // final_date validation
    if (!isValidDate(values.final_date)) {
        error.final_date = "La fecha final no debe estar vacía o ser inválida";
    } else if (new Date(values.final_date) < oneYearAgo) {
        error.final_date = "La fecha final no debe ser hace más de un año";
    } else {
        error.final_date = "";
    }
    
// Date comparison validation
if (isValidDate(values.start_date) && isValidDate(values.final_date)) {
    const startDate = new Date(values.start_date);
    const finalDate = new Date(values.final_date);

    if (startDate > finalDate) {
        error.final_date = 'La fecha final no puede ser anterior a la fecha de inicio';
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