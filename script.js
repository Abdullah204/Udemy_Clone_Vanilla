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

      newCourse = createCourseElement(x);
      courseContainer = document.createElement("div");
      courseContainer.className += " carousel-item";
      courseContainer.className += " carousel-item" + key;
      courseContainer.innerHTML = newCourse;
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

const searchForm = document.getElementsByClassName("search-form")[0];
searchForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  // get key from input
  ss = document.getElementsByClassName("input-field")[0].value;
  id = document.getElementsByClassName("tab-pane active")[0].id + "";
  fetchCourses(id, ss);
}

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function createCourseElement(course) {
  let ratingStars = "";
  let bs = "";
  if (course.isBestSeller == "True") {
    bs = `
    <span class="best-seller">Bestseller</span>
    `;
  }
  for (let i = 0; i < Math.floor(course.rating); i++) {
    ratingStars += '<i class="fa-solid fa-star"></i>';
  }

  let x = course.rating;
  if (x - Math.floor(x) >= 0.2)
    ratingStars += '<i class="fa-solid fa-star-half"></i>';

  return `<div class="course">
<img src=${course.imgurl} alt="course image">
<h3 class="course-title">${course.title}</h3>
<p class="instructor">${course.author}</p>
<div class="rating-container">
  <span class="rating">${course.rating}</span>
  ${ratingStars}
  <span class="raters-number"> (${course.raters_no}) </span>
</div>
<div class="price-container">
  <span class="new-price">E£${course.newPrice} </span>
  <span class="old-price">E£${course.oldPrice} </span>
</div>
${bs}</div>`;
}
/** "imgurl": "imgs/python1.jpeg",
      "title": "Learn Python: The Complete Python Programming Course",
      "author": "Avinash Jain , The Codex",
      "rating": "4.4",
      "raters_no": "1284",
      "newPrice": "199.99",
      "oldPrice": "679.99",
      "isBestSeller": "True"*/
