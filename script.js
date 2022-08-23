let allCourses = [];
let keys = ["python", "excel", "web", "js", "ds", "aws", "drawing"];
/** @ description the function that fetches courses from the server (local) and renders it into the page
 * @ param id id of active carousel used to check if we are searching in this carousel or not
 * @ param ss search string taken from search bar
 */
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

/** @ description the function that fetches courses from the server (local) and renders it into the page
 * @ param id id of active carousel used to check if we are searching in this carousel or not
 * @ param ss search string taken from search bar
 */
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

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

let test = document.createElement("div");
test.innerHTML = "<div class = 'div1'>div1 <div> div2</div></div>";
document.getElementsByTagName("body")[0].appendChild(test);

/**<div class="course">
 * <img src="imgs/python5.jpeg" alt="course image">
 * <h3 class="course-title">Python Beyond the Basics - Object-Oriented Programming</h3>
 * <p class="instructor">Infinite Skills</p>
 * <div class="rating-container">
 * <span class="rating">4.2</span>
 * <i class="fa-solid fa-star"></i>
 * <i class="fa-solid fa-star"></i>
 * <i class="fa-solid fa-star"></i>
 * <i class="fa-solid fa-star"></i>
 * <span class="raters-number"> (1,284) </span>
 * </div>
 * <div class="price-container">
 * <span class="new-price">E£199.99 </span>
 * <span class="old-price">E£679.99</span>
 * </div>
 * <span class="best-seller">Bestseller</span>
 * </div> */
