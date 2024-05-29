function Validation(values) {
    let error = {};

    // Required patterns
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    // Name validation
    if (!values.name) {
        error.name = "El nombre no debe estar vacío";
    } else {
        error.name = "";
    }

    // Email validation
    if (!values.email) {
        error.email = "El correo electrónico no debe estar vacío";
    } else if (!email_pattern.test(values.email)) {
        error.email = "El correo electrónico no coincide con el formato válido";
    } else {
        error.email = "";
    }

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
    
    // User type validation
    if (!values.user_type) {
        error.user_type = "El tipo de usuario no debe estar vacío";
    } else {
        error.user_type = "";
    }

    // Password validation
    if (!values.password) {
        error.password = "La contraseña no debe estar vacía";
    } else {
        let passwordErrors = [];
        if (values.password.length < 8) {
            passwordErrors.push("La contraseña debe tener al menos 8 caracteres");
        } else if (!/[a-z]/.test(values.password)) {
            passwordErrors.push("La contraseña debe contener al menos una letra minúscula");
        } else if (!/[A-Z]/.test(values.password)) {
            passwordErrors.push("La contraseña debe contener al menos una letra mayúscula");
        } else if (!/\d/.test(values.password)) {
            passwordErrors.push("La contraseña debe contener al menos un dígito");
        }

        if (passwordErrors.length > 0) {
            error.password = passwordErrors.join(". ");
        } else {
            error.password = "";
        }
    }

    return error;
}

export default Validation;