const form = document.querySelector("#contact-form");
const txtName = document.querySelector("#txtName");
const txtEmail = document.querySelector("#txtEmail");
const txtPassword = document.querySelector("#txtPassword");
const txtCpassword = document.querySelector("#txtCpassword");
const txtCmt = document.querySelector("#txtCmt");
let isValid = true;
let timeout;
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(checkValidation())
})
const showAlert = (msg) => {
    clearTimeout(timeout)
    const alert = document.querySelector(".alert")
    alert.innerHTML = msg;
    alert.classList.add("active")
    timeout = setTimeout(() => {
        alert.classList.remove("active")
    }, 3000);
}
const toggleError = (target, isvalid) => {
    if (!isvalid) {
        console.log("toggle:", target)
        target.classList.add("invalid");
        target.focus()
    } else {
        target.classList.remove("invalid");
    }
}

const checkValidation = () => {
    const txtNameValue = txtName.value
    const txtEmailValue = txtEmail.value
    const txtPasswordValue = txtPassword.value
    const txtCpasswordValue = txtCpassword.value
    const txtCmtValue = txtCmt.value
    console.log(txtNameValue,
        txtEmailValue,
        txtPasswordValue,
        txtCpasswordValue,
        txtCmtValue)

    // name
    if (txtNameValue.trim().length != 0) {
        var regex = /^[a-zA-Z]{2,30}$/;
        if (!regex.test(txtNameValue)) {
            showAlert("Please enter valid name")
            toggleError(txtName, false)
            isValid = false
            return;
        } else {
            toggleError(txtName, true)
            isValid = true
        }
    } else {
        showAlert("Please enter name")
        toggleError(txtName, false)
        isValid = false
        return;
    }
    // email
    if (txtEmailValue.trim().length != 0) {
        var regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/;
        if (!regex.test(txtEmailValue)) {
            showAlert("Please enter valid email")
            toggleError(txtEmail, false)
            isValid = false
            return;
        } else {
            toggleError(txtEmail, true)
            isValid = true
        }
    } else {
        showAlert("Please enter email")
        toggleError(txtEmail, false)
        isValid = false
        return;
    }

    // password
    if (txtPasswordValue.trim().length != 0) {
        var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
        if (!regex.test(txtPasswordValue)) {
            showAlert("Please enter at least one number and one special character")
            toggleError(txtPassword, false)
            isValid = false
            return;
        } else {
            toggleError(txtPassword, true)
            isValid = true
        }
    } else {
        showAlert("Please enter minimum 8 and maximum 15 characters")
        toggleError(txtPassword, false)
        isValid = false
        return;
    }

    // cpassword
    if (txtCpasswordValue != txtPasswordValue) {
        showAlert("confirm password not match")
        toggleError(txtCpassword, false)
        isValid = false
        return;
    } else {
        toggleError(txtCpassword, true)
        isvalid = true
    }

    // comment
    if (txtCmtValue.trim().length != 0) {
        toggleError(txtCmt, true)
        isValid = true
    } else {
        showAlert("Please enter comment")
        toggleError(txtCmt, false)
        isValid = false
        return;
    }
    return isValid
}