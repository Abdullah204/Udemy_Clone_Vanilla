// the function that fetches courses from the server (local) and renders it into the page
let allCourses = [];
let keys = ["python", "excel", "web", "js", "ds", "aws", "drawing"];

const fetchCourses = async (id, ss) => {
  ss = ss.toLowerCase();

  let courses = null;
  for (let key of keys) {
    // get json file
    let response = await fetch("http://localhost:3000/" + key);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    courses = await response.json();

    //reset carousel data
    document.getElementsByClassName("carousel-inner-" + key)[0].innerHTML = "";

    //fill carousel with items satisfying search bar
    first = true;
    let arr = [];
    for (let x of courses) {
      arr.push(x);

      newCourse = appendCourseNew(x);
      courseContainer = document.createElement("div");
      courseContainer.className += " carousel-item";
      courseContainer.className += " carousel-item" + key;

      courseContainer.appendChild(newCourse);

      ctitle = x.title.toLowerCase();

      if (id === "start" || id !== key || (id === key && ctitle.includes(ss))) {
        if (first) {
          courseContainer.className += " active";
          first = false;
        }
        document
          .getElementsByClassName("carousel-inner-" + key)[0]
          .appendChild(courseContainer);
      }
    }
    allCourses[key] = arr;
    let items = document.querySelectorAll(".carousel .carousel-item" + key);

    items.forEach((el) => {
      const minPerSlide = Math.min(
        document.getElementsByClassName("carousel-inner-" + key)[0].childNodes
          .length,
        5
      );
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
  }
  return courses;
};
fetchCourses("start", "ss");

// create all course elements and add it to the course list
function appendCourse(course) {
  //create list item (course)
  const newli = document.createElement("li");
  newli.className = "course";

  // add image
  const img = document.createElement("img");
  img.src = course.imgurl;
  img.alt = "course image";
  newli.appendChild(img);

  // add title
  const title = document.createElement("h3");
  title.className = "course-title";
  title.innerText = course.title;
  newli.appendChild(title);

  // add author
  const instructor = document.createElement("p");
  instructor.className = "instructor";
  instructor.innerText = course.author;
  newli.appendChild(instructor);

  // add rating
  const ratingcontainer = document.createElement("div");
  ratingcontainer.className = "rating-container";
  const rating = document.createElement("span");
  rating.className = "rating";
  rating.innerText = course.rating;
  ratingcontainer.appendChild(rating);

  // adding star icon in rating
  for (let i = 0; i < Math.floor(course.rating); i++) {
    const star = document.createElement("i");
    star.className = "fa-solid fa-star";
    ratingcontainer.appendChild(star);
  }

  // add half star
  if (course.rating % 1 > 0.25) {
    const star = document.createElement("i");
    star.className = "fa-solid fa-star-half";
    ratingcontainer.appendChild(star);
  }

  // number of raters
  const noOfRaters = document.createElement("span");
  noOfRaters.className = "raters-number";
  noOfRaters.innerText = " (" + numberWithCommas(course.raters_no) + ") ";
  ratingcontainer.appendChild(noOfRaters);
  // after puting rating , stars and no of raters adding the whole container
  newli.appendChild(ratingcontainer);

  // adding price container (including old and new price)
  const pricecontainer = document.createElement("div");
  pricecontainer.className = "price-container";

  // new price
  const newPrice = document.createElement("span");
  newPrice.className = "new-price";
  newPrice.innerText = "E£" + course.newPrice + " ";
  pricecontainer.appendChild(newPrice);
  // old price
  const oldPrice = document.createElement("span");
  oldPrice.className = "old-price";
  oldPrice.innerText = "E£" + course.oldPrice;
  pricecontainer.appendChild(oldPrice);

  // add pricecontainer
  newli.appendChild(pricecontainer);

  // check bestseller and mark the course as bestseller if true
  if (course.isBestSeller === "True") {
    const bs = document.createElement("span");
    bs.className = "best-seller";
    bs.innerText = "Bestseller";
    newli.appendChild(bs);
  }

  // add item (course) to course list
  const list = document.getElementsByClassName("course-list")[0];
  list.appendChild(newli);
}

// used to add thousand comma to number of raters e.g. 1234 --> 1,234
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// variable containing list items of course list (list of courses)
const courselist = document.getElementsByClassName("course-list")[0].children;

// get search form and link its submit to search function
const searchForm = document.getElementsByClassName("search-form")[0];
searchForm.addEventListener("submit", search);

// search course titles including search key as substring (and hiding ones not including)
function search(event) {
  event.preventDefault();
  // get key from input
  ss = document.getElementsByClassName("input-field")[0].value;
  id = document.getElementsByClassName("tab-pane active")[0].id + "";
  fetchCourses(id, ss);
}

function appendCourseNew(course) {
  //create list item (course)
  const newli = document.createElement("div");
  newli.className = "course";
  // add image
  const img = document.createElement("img");
  img.src = course.imgurl;
  img.alt = "course image";
  newli.appendChild(img);

  // add title
  const title = document.createElement("h3");
  title.className = "course-title";
  title.innerText = course.title;
  newli.appendChild(title);

  // add author
  const instructor = document.createElement("p");
  instructor.className = "instructor";
  instructor.innerText = course.author;
  newli.appendChild(instructor);

  // add rating
  const ratingcontainer = document.createElement("div");
  ratingcontainer.className = "rating-container";
  const rating = document.createElement("span");
  rating.className = "rating";
  rating.innerText = course.rating;
  ratingcontainer.appendChild(rating);

  // adding star icon in rating
  for (let i = 0; i < Math.floor(course.rating); i++) {
    const star = document.createElement("i");
    star.className = "fa-solid fa-star";
    ratingcontainer.appendChild(star);
  }

  // add half star
  if (course.rating % 1 > 0.25) {
    const star = document.createElement("i");
    star.className = "fa-solid fa-star-half";
    ratingcontainer.appendChild(star);
  }

  // number of raters
  const noOfRaters = document.createElement("span");
  noOfRaters.className = "raters-number";
  noOfRaters.innerText = " (" + numberWithCommas(course.raters_no) + ") ";
  ratingcontainer.appendChild(noOfRaters);
  // after puting rating , stars and no of raters adding the whole container
  newli.appendChild(ratingcontainer);

  // adding price container (including old and new price)
  const pricecontainer = document.createElement("div");
  pricecontainer.className = "price-container";

  // new price
  const newPrice = document.createElement("span");
  newPrice.className = "new-price";
  newPrice.innerText = "E£" + course.newPrice + " ";
  pricecontainer.appendChild(newPrice);
  // old price
  const oldPrice = document.createElement("span");
  oldPrice.className = "old-price";
  oldPrice.innerText = "E£" + course.oldPrice;
  pricecontainer.appendChild(oldPrice);

  // add pricecontainer
  newli.appendChild(pricecontainer);

  // check bestseller and mark the course as bestseller if true
  if (course.isBestSeller === "True") {
    const bs = document.createElement("span");
    bs.className = "best-seller";
    bs.innerText = "Bestseller";
    newli.appendChild(bs);
  }

  return newli;
}
