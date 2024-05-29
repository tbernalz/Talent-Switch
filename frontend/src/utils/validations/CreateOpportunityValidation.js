function Validation(values) {
    let error = {};

    // Fecha de corte: un año atrás desde hoy
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // opportunity_name validation
    if (!values.opportunity_name.trim()) {
        error.opportunity_name = "Opportunity Name should not be empty";
    } else {
        error.opportunity_name = "";
    }

    // opportunity_leader_email validation
    // if (!values.opportunity_leader_email.trim()) {
    //     error.opportunity_leader_email = "Leader user ID should not be empty";
    // } else {
    //     error.opportunity_leader_email = "";
    // }

    // opportunity_area validation
    if (!values.opportunity_area.trim()) {
        error.opportunity_area = "Opportunity Area should not be empty";
    } else {
        error.opportunity_area = "";
    }

    // description validation
    if (!values.description.trim()) {
        error.description = "Description should not be empty";
    } else {
        error.description = "";
    }

    // required_skills validation
    if (values.required_skills.trim() === "") {
        error.required_skills = "Required skills should not be empty";
    } else {
        error.required_skills = "";
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