
/************************** variables **************************/
/* DOM elements */
const coursesTitle = document.querySelectorAll(".course-title");
const coursesAuthors = document.querySelectorAll(".course-authors");
const coursesRates = document.querySelectorAll(".rate");
const coursesRaters = document.querySelectorAll(".raters");
const coursesOldPrice = document.querySelectorAll(".old-price");
const coursesNewPrice = document.querySelectorAll(".new-price");
const coursesImage = document.querySelectorAll(".course-img img");
const coursesCard = document.querySelectorAll(".course-card");
const bestSeller = document.createElement("div");
bestSeller.classList.add("best-seller");
bestSeller.textContent = "Best Seller";
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-navbar");

/************************** functions **************************/
/* courses data fetching */
const getCoursesInfo = async () => {
    let response = await fetch("http://localhost:3000/courses");
    let json = await response.json();
    return json;
}

/* search courses */
const handleSearch = (e) => {
    e.preventDefault();
    const searchKeyword = searchInput.value;
    const len = coursesTitle.length;
    let count = 0;
    for (let x of coursesTitle) {
        const courseTitle = x.textContent;
        if (!courseTitle.includes(searchKeyword)) {
            x.parentElement.style.display = "none";
            count++;
        }
    }
    if (count === len || searchKeyword === "") {
        for (let x of coursesTitle)
            x.parentElement.style.display = "block";
    }
}

/************************** algorithms **************************/
/* populate courses data to the DOM elements */
getCoursesInfo().then(
    coursesInfo => {
        for (let i = 0; i < coursesInfo.length; ++i) {
            coursesTitle[i].textContent = coursesInfo[i].title;
            coursesAuthors[i].textContent = coursesInfo[i].author;
            coursesRates[i].textContent = coursesInfo[i].rate;
            coursesRaters[i].textContent = `(${coursesInfo[i].noOfRaters})`;
            coursesOldPrice[i].textContent = `E£${coursesInfo[i].oldPrice}`;
            coursesNewPrice[i].textContent = `E£${coursesInfo[i].newPrice}`;
            coursesImage[i].src = coursesInfo[i].image;
            if (coursesInfo[i].bestSeller) coursesCard[i].appendChild(bestSeller);
        }
    }
);

/* get courses on click */
searchBtn.addEventListener("click", handleSearch);