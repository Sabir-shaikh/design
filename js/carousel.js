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