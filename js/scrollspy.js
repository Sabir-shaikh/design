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

        console.log("screen.width:", window.innerWidth)
        if (screen.width < 767) {
            hamburgerMenu2.classList.toggle("active");
            mainMenu2.classList.toggle("menu-active");
            document.body.classList.toggle("menu-active");
            alert()
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