
//preLoader
const loader = document.querySelector(".preloader");
window.addEventListener("load" , () => {
        loader.style.display = "none";
        hiddenElements.forEach((elem) => observer.observe(elem));
});

const hiddenElements = document.querySelectorAll(".hidden");

const observerOptions = {
   root: null,
   threshold: 0.4,
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting && entry.intersectionRatio > 0.4){
            setTimeout(()=>entry.target.classList.add("show"))
            console.log(entry)
        }else{
            entry.target.classList.remove("show")
        }
    });
}, observerOptions);


// slider scroll
const slideButtons = document.querySelectorAll(".slider-nav");
const slider = document.querySelector(".card-container");
const card = document.querySelector(".card-wrapper");
const maxScrollWidth = slider.scrollWidth - slider.clientWidth - 2;
const cardSlider = () =>{
    slideButtons.forEach((button) =>{
        button.addEventListener("click",()=>{
            const direction = button.id === "next-card" ? -1 : 1;
            const scrollAmount = slider.clientWidth  * direction;
            slider.scrollBy({left :scrollAmount ,behavior: "smooth"});
        })
    })
}
const handleSliderbuttons = () =>{
    slideButtons[0].style.display = slider.scrollLeft <= 0 ? "none": "flex";
    slideButtons[1].style.display = slider.scrollLeft >= maxScrollWidth ? "none": "flex";
    console.log(maxScrollWidth)
    console.log(slider.scrollLeft)
}

slider.addEventListener("scroll", handleSliderbuttons)

cardSlider()

//favorite button

const favoriteButton = document.querySelectorAll(".favorite-button")
const downlaodButton = document.querySelectorAll(".downlaod-button")

const handleFavorite = (btn) => {
    if(btn.classList.contains("fa-regular")){
        btn.classList.remove("fa-regular")
        btn.classList.add("fa-solid")
        btn.style.color = "red"
    }else if(btn.classList.contains("fa-solid")){
        btn.classList.remove("fa-solid")
        btn.classList.add("fa-regular")
        btn.style.color = "white"
    } 
}
favoriteButton.forEach((btn)=>{btn.addEventListener("click",()=>handleFavorite(btn))})
