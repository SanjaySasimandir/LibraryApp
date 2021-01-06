function loginValidation() {
    let password = document.getElementById("inputPassword");
    let passwordrepeat = document.getElementById("repeatPasswordInput");
    let passwordError = document.getElementById('passwordError');
    let flag = 0

    if (password.value.length < 5) {
        passwordError.innerText += ` Password should be atleast 5 characters!`;
        passwordError.removeAttribute("hidden", true);
        flag = 1;
    }
    if (password.value !== passwordrepeat.value) {
        passwordError.innerText = `Passwords don't match!`;
        passwordError.removeAttribute("hidden", true);
        flag = 1;
    }
    if (flag == 1) {
        return false;
    }
    else {
        passwordError.setAttribute("hidden", true);
        return true;
    }
}