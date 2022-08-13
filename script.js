const fetchCourses = async () => {
  let response = await fetch("http://localhost:3000/courses");
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  courses = await response.json();
  for (let x of courses) {
    //console.log(x);
    appendCourse(x);
  }

  return courses;
};
fetchCourses();

function appendCourse(course) {
  newli = document.createElement("li");
  newli.className = "course";

  img = document.createElement("img");
  img.src = course.imgurl;
  img.alt = "course image";
  newli.appendChild(img);

  title = document.createElement("h3");
  title.className = "course-title";
  title.innerText = course.title;
  newli.appendChild(title);

  instructor = document.createElement("p");
  instructor.className = "instructor";
  instructor.innerText = course.author;
  newli.appendChild(instructor);

  ratingcontainer = document.createElement("div");
  ratingcontainer.className = "rating-container";
  rating = document.createElement("span");
  rating.className = "rating";
  rating.innerText = course.rating;
  ratingcontainer.appendChild(rating);

  for (let i = 0; i < Math.floor(course.rating); i++) {
    star = document.createElement("i");
    star.className = "fa-solid fa-star";
    ratingcontainer.appendChild(star);
  }
  if (course.rating % 1 > 0.25) {
    star = document.createElement("i");
    star.className = "fa-solid fa-star-half";
    ratingcontainer.appendChild(star);
  }

  noOfRaters = document.createElement("span");
  noOfRaters.className = "raters-number";
  noOfRaters.innerText = " (" + numberWithCommas(course.raters_no) + ") ";
  ratingcontainer.appendChild(noOfRaters);

  newli.appendChild(ratingcontainer);
  pricecontainer = document.createElement("div");
  pricecontainer.className = "price-container";
  newPrice = document.createElement("span");
  newPrice.className = "new-price";
  newPrice.innerText = "E£" + course.newPrice + " ";
  pricecontainer.appendChild(newPrice);
  oldPrice = document.createElement("span");
  oldPrice.className = "old-price";
  oldPrice.innerText = "E£" + course.oldPrice;
  pricecontainer.appendChild(oldPrice);
  newli.appendChild(pricecontainer);
  if (course.isBestSeller === "True") {
    bs = document.createElement("span");
    bs.className = "best-seller";
    bs.innerText = "Bestseller";
    newli.appendChild(bs);
  }

  list = document.getElementsByClassName("course-list")[0];
  list.appendChild(newli);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const courselist = document.getElementsByClassName("course-list")[0].children;
searchForm = document.getElementsByClassName("search-form")[0];
searchForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  searchString = document.getElementsByClassName("input-field")[0].value;
  for (let item of courselist) {
    if (
      item
        .getElementsByClassName("course-title")[0]
        .innerText.toLowerCase()
        .includes(searchString.toLowerCase())
    ) {
      item.className = "course";
    } else item.className = "hidden-course";
  }
}
