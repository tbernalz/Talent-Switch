function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    // email validation
    if (!values.email) {
        error.email = "El correo electrónico no debe estar vacío";
    } else if (!email_pattern.test(values.email)) {
        error.email = "El correo electrónico no coincide con el formato válido";
    } else {
        error.email = "";
    }

    // password validation
    if (!values.password) {
        error.password = "La contraseña no debe estar vacía";
    } else if (!password_pattern.test(values.password)) {
        error.password = "La contraseña no cumple con los requisitos mínimos";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation;