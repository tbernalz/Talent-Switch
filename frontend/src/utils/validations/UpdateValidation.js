function Validation(values) {
    let error = {};

    // Required patterns
    //const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    // Name validation
    if (!values.name) {
        error.name = "El nombre no debe estar vacío";
    } else {
        error.name = "";
    }

    // Email validation
    // if (!values.email) {
    //     error.email = "Email should not be empty";
    // } else if (!email_pattern.test(values.email)) {
    //     error.email = "Email didn't match";
    // } else {
    //     error.email = "";
    // }

    // Actual area validation
    if (!values.actual_area) {
        error.actual_area = "El área actual no debe estar vacía";
    } else {
        error.actual_area = "";
    }

    // Interest area validation
    if (!values.interest_area) {
        error.interest_area = "El área de interés no debe estar vacía";
    } else {
        error.interest_area = "";
    }

    // Skills validation
    if (!values.skills) {
        error.skills = "Las habilidades no deben estar vacías";
    } else {
        error.skills = "";
    }

    // Password validation
    // if (!values.password) {
    //     error.password = "Password should not be empty";
    // } else {
    //     let passwordErrors = [];
    //     if (values.password.length < 8) {
    //         passwordErrors.push("Password must be at least 8 characters long");
    //     } else if (!/[a-z]/.test(values.password)) {
    //         passwordErrors.push("Password must contain at least one lowercase letter");
    //     } else if (!/[A-Z]/.test(values.password)) {
    //         passwordErrors.push("Password must contain at least one uppercase letter");
    //     } else if (!/\d/.test(values.password)) {
    //         passwordErrors.push("Password must contain at least one digit");
    //     }

    //     if (passwordErrors.length > 0) {
    //         error.password = passwordErrors.join(". ");
    //     } else {
    //         error.password = "";
    //     }
    // }

    return error;
}

export default Validation;