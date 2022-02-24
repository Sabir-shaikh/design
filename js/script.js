const hamburgerMenu = document.querySelector("#hamburger-menu");
const mainMenu = document.querySelector("#main-menu");

function toggleNav() {
    hamburgerMenu.classList.toggle("active");
    mainMenu.classList.toggle("menu-active");
    document.body.classList.toggle("menu-active");
}

hamburgerMenu.addEventListener("click", toggleNav);



// js for submenu

const dropdown = document.querySelectorAll(".has-dropdown")
dropdown.forEach(element => {
    element.addEventListener('focusin', () => {
        element.classList.add('active')
    })
    element.addEventListener('focusout', () => {
        element.classList.remove('active')
    })
});



// tab js
const tab = document.querySelector(".tab__wrapper");
tab.addEventListener("click", (e) => {
    e.preventDefault()
    const el = e.target;
    if (el.classList.contains("tab__btn")) {
        el.closest(".tab__wrapper").querySelectorAll(".tab__btn").forEach(el => {
            el.classList.remove("active");
        })
        e.target.classList.add("active")

        let tabId = el.getAttribute("href").substr(1);
        el.closest(".tab__wrapper").querySelectorAll(".tab__content").forEach(el => {
            el.classList.remove("active");
        })
        el.closest(".tab__wrapper").querySelector(`.tab__content[data-id="${tabId}"]`).classList.add("active")
    }
})


const btnTheme = document.querySelector(".toggle-theme");
const theme = localStorage.getItem("theme")
theme == "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark")
btnTheme.addEventListener("click", (e) => {
    e.preventDefault()
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark")
        localStorage.removeItem("theme")
    } else {
        localStorage.setItem("theme", "dark")
        document.body.classList.add("dark")
    }
})

const delay = 3000; //ms

const carousel = document.querySelector(".carousel");
const slides = document.querySelector(".carousel__slides");
const slidesCount = slides.childElementCount;

const maxLeft = (slidesCount - 1) * 100 * -1;
let current = 0;
let slide = 1;
const div = document.createElement("div")
div.classList.add("pagination")
for (let j = 1; j <= slidesCount; j++) {
    const child = document.createElement("div")
    child.setAttribute("data-index", j)
    div.appendChild(child)
}
carousel.appendChild(div)
const pagination = document.querySelector(".pagination");
pagination.querySelector(`div:nth-child(1)`).classList.add('active')

pagination.addEventListener("click", (e) => {
        const ele = e.target.getAttribute("data-index")
        setPagination(ele)
        current = parseInt(ele) - 1
        clearInterval(autoChange);
        slides.style.left = ((current * -1) * 100) + "%";
    })
    // Controls
function changeSlide(next = true) {
    // console.log("changeSlide:", current / 100)
    if (next) {
        current += current > maxLeft ? -100 : current * -1;
        setPagination()

    } else {
        current = current < 0 ? current + 100 : maxLeft;
    }

    slides.style.left = current + "%";
}

function setPagination(current) {
    const child = pagination.querySelectorAll('div');
    child.forEach(element => {
        element.classList.remove('active')
    });
    if (current) {
        pagination.querySelector(`div:nth-child(${current})`).classList.add('active')
    } else {
        slide >= slidesCount ? slide = 1 : slide++;

        pagination.querySelector(`div:nth-child(${slide})`).classList.add('active')
    }
}

let autoChange = setInterval(changeSlide, delay);
const restart = function() {
    clearInterval(autoChange);
    autoChange = setInterval(changeSlide, delay);
};
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

const navTarget = document.querySelectorAll("a.nav-link")

const navLink = () => {

        navTarget.forEach(section => {
            const container = document.querySelector(section.getAttribute('href'));

            const containerOffset = container.offsetTop;
            const containerHeight = container.clientHeight;
            const containerBottom = containerOffset + containerHeight;
            const scrollPosition = window.scrollY;
            const headerHeight = document.querySelector(".header").clientHeight;
            // console.log("scrollPosition:", scrollPosition)
            try {
                if (scrollPosition < containerBottom - headerHeight && scrollPosition >= containerOffset - headerHeight) {
                    section.closest("li").classList.add('active')
                } else {
                    section.closest("li").classList.remove('active')
                }
            } catch (error) {

            }

        });
    }
    // navLink()
window.addEventListener("scroll", () => {
    navLink()
});


// console.log(navTarget)
const hamburgerMenu2 = document.querySelector("#hamburger-menu");
const mainMenu2 = document.querySelector("#main-menu");
navTarget.forEach(el => {
    el.addEventListener("click", (el) => {
        el.preventDefault()
        if (window.innerWidth < 767) {
            hamburgerMenu2.classList.toggle("active");
            mainMenu2.classList.toggle("menu-active");
            document.body.classList.toggle("menu-active");
        }

        const container = document.querySelector(el.target.getAttribute('href'));
        const containerOffset = container.offsetTop - document.querySelector(".header").clientHeight;
        // console.log("containerOffset:", containerOffset)
        window.scrollTo({
            top: containerOffset,
            behavior: 'smooth'
        })
    })
})