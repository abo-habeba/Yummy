
window.addEventListener('load', function () {
  $('.loading-min').fadeOut(100);
});

// Switch the navbar from open to closed
function toggelNavbar() {
  $('.toggel-menu .fa-bars').toggle();
  $('.toggel-menu .fa-xmark').toggle();
  if ($('.toggel-menu .fa-bars').css('display') == 'none') {
    $('.nav-tab-menu').css({ width: '240px' })
    $(".item1").animate({ top: "0px", }, 500);
    $(".item2").animate({ top: "0px", }, 600);
    $(".item3").animate({ top: "0px", }, 700);
    $(".item4").animate({ top: "0px", }, 800);
    $(".item5").animate({ top: "0px", }, 900);
  } else {
    $(".nav-tab-menu li").animate({ top: "300px", });
    $('.nav-tab-menu').css({ width: '0px' });
  }
};
$('.strip-logo').click(function () {
  $('.box-search').slideUp();
  getHomeAPI();
});
$('.strip-header-nav .toggel-menu').click(function () {
  toggelNavbar()
});

// ((((  1  ))))   Get API 
async function getHomeAPI() {
  $('.box-loading').fadeIn(100);
  let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
  let result = await response.json();
  let meals = result.meals;
  displymealsAPI(meals);
  $('.box-loading').fadeOut(100);
};
getHomeAPI();
//  disply(1) Show meales to Home Page
function displymealsAPI(meals) {
  $('.toggel-menu .fa-bars').show();
  $('.toggel-menu .fa-xmark').hide();
  let = mealBox = ``;
  // console.log(meals);
  for (let i = 0; i < meals.length; i++) {

    mealBox += `<div class="col-md-6 col-lg-3 my-3 myM  shadow">
    <div onclick="getMeal('${meals[i].idMeal}')" class="cursor-pointer movie shadow rounded position-relative">
        <div class="post ">
            <img src='${meals[i].strMealThumb}' class="w-100 rounded" />
            <div class="layer d-flex align-items-center ">
                <div class="info p-2">
                    <h2>${meals[i].strMeal}</h2>
                </div>
            </div>
        </div>
    </div>
</div>`;
  }

  $('#rowData').html(mealBox);

};
//  Get Meal By ID Meal
async function getMeal(MealID) {
  $('.box-loading').fadeIn(100);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealID}`);
  let meals = await response.json();
  console.log(meals.meals[0]);
  displayMeal(meals.meals[0]);
  $('.box-loading').fadeOut(100);
};
//  disply(2)     Show Meal
function displayMeal(meal) {
  let recipes = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      recipes += `<li class="my-3 mx-1 p-1 alert alert-light rounded-pill">${meal[`strMeasure${i}`]
        } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  let tagsStr = "";
  for (let i = 0; i < tags?.length; i++) {
    tagsStr += `<li class="my-3 mx-1 p-1 alert alert-danger rounded-pill">${tags[i]}</li>`;
  }

  let box = `
      <div class="col-md-4 myM text-white">
                      <img class="w-100" src="${meal.strMealThumb}" alt=""
                          srcset=""><br>
                      <h1>${meal.strMeal}</h1>
                  </div>
                  <div class="col-md-8 myM text-white text-left">
                      <h2>Instructions</h2>
                      <p>${meal.strInstructions}</p>
                      <p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
                      <p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
                      <h3>Recipes :</h3>
                      <ul class="d-flex flex-nowrap " id="recipes">
                      </ul>
  
                      <h3 class="my-2 mx-1 p-1">Tags :</h3>
                      <ul class="d-flex  flex-nowrap" id="tags">
                      </ul>
  
                      
                      <a class="btn btn-success text-white m-3" target="_blank" href="${meal.strSource}">Source</a>
                      <a class="btn btn-danger text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
      </div>`;
  $('#rowData').html(box);
  document.getElementById("recipes").innerHTML = recipes;
  document.getElementById("tags").innerHTML = tagsStr;
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    200
  );
};

// ((((  2  ))))  click Show Page Categories 
$('#categories').click(function () {
  $('.box-search').slideUp();
  getCategories()
  toggelNavbar()
});
// Get Categories 
async function getCategories() {
  $('.box-loading').fadeIn(100);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let resalt = await response.json();
  let Categories = resalt.categories
  displayCategories(Categories)
  $('.box-loading').fadeOut(100);
};
// disply(3)  Show Categories
function displayCategories(Categories) {
  let box = "";
  for (var i = 0; i < Categories.length; i++) {
    // console.log(Categories[i].strCategory);
    box += `
      <div class="col-md-6 col-lg-3 my-3 myM shadow">
          <div class="movie  rounded position-relative">
              <div onclick="filterByCategory('${Categories[i].strCategory}')" class="cursor-pointer post">
                  <img src='${Categories[i].strCategoryThumb}' class="w-100 rounded" />
                  <div class="layer d-flex align-items-center ">
                      <div class="info p-2">
                          <h2>${Categories[i].strCategory}</h2>
                          <p>${Categories[i].strCategoryDescription.split(" ").slice(0, 7).join(" ")}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>`
  };
  $('#rowData').html(box);
  $("html, body").animate({ scrollTop: 0, }, 200);
};
async function filterByCategory(category) {
  $('.box-loading').fadeIn(100);
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  meals = await meals.json();
  meals = meals.meals;
  // console.log(meals.meals);
  displymealsAPI(meals);
  $('.box-loading').fadeOut(100);
};

// ((((  3  ))))  Clickd show page Search
$('#search').click(function () {
  toggelNavbar();
  $('.box-search').slideDown();
  $('#rowData').html(`<div class="box-no-search">
  <div class=" no-search bg-dark">
          <p>No meals <br>  
          When searching for meals <br>
           it will be displayed here</p>
  </div>
</div>`);
});
function valueBtnName(val) { 
  searchAPI(`s=${val}`);
};
function valueBtLetter(val) { 
  if (val != "") {
    searchAPI(`f=${val}`);
  }
};
async function searchAPI(val) {
  $('.box-loading').fadeIn(100);
  let meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?${val}`
  );
  meals = await meals.json();
  meals = meals.meals;
  displymealsAPI(meals)
  $('.box-loading').fadeOut(100);
};
$('#searchInput').focus(function () {
  $('#letter').val('');
});
$('#letter').focus(function () {
  $('#searchInput').val('');
});;

// ((((  4  ))))   Clickd Show Page Area
$('#Area').click(function () {
  $('.box-search').slideUp();
  fetchFilterByArea();
  toggelNavbar()
});
async function fetchFilterByArea() {
  $('.box-loading').fadeIn(100);
  let area = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  area = await area.json();
  area = area.meals;
  // console.log(area);
  displayFilterArea(area);
  $('.box-loading').fadeOut(100);
};
// disply(4) Area
async function displayFilterArea(area) {
  let box = ``;
  for (let i = 0; i < area.length; i++) {
    box += `
      <div class="col-md-6 col-lg-3">
      <div class="p-3">
          <div onclick="filterByArea('${area[i].strArea}')" class="cursor-pointer  text-center">
          <i class="text-danger fa-solid fa-city fa-3x"></i>
          <h2 class="text-white">${area[i].strArea}</h2>
          </div>
      </div>
      </div>`
  };
  $('#rowData').html(box);
  $("html, body").animate({ scrollTop: 0, }, 200);
};
async function filterByArea(area) {
  $('.box-loading').fadeIn(100);
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  meals = await meals.json();
  meals = meals.meals;
  // console.log(meals);
  displymealsAPI(meals);
  $('.box-loading').fadeOut(100);
};

// ((((  5  ))))   Clickd Show Page Ingredients
$('#Ingredients').click(function () {
  // console.log('clickd Ingredients ');
  $('.box-search').slideUp();
  filterByIngredients();
  toggelNavbar()
});
async function filterByIngredients() {
  $('.box-loading').fadeIn(100);
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  meals = await meals.json();
  meals = meals.meals;
  // console.log(meals);
  displayByIngredients(meals);
  $('.box-loading').fadeOut(100);
};
// disply(5) Ingredients
async function displayByIngredients(meals) {
  // console.log('displayByIngredients');
  let box = ``;
  for (let i = 0; i < 20; i++) {
    // console.log(meals[i]);
    box += `
    <div class="col-md-6 col-lg-3 my-3">
    <div onclick="getMainIngredient('${meals[i].strIngredient}')" class="cursor-pointer text-center ">
        <div class="post ">
            <i class="text-success fa-solid fa-bowl-food fa-3x"></i>
            <h2 class="text-white">${meals[i].strIngredient}</h2>
            <p class="text-white">${meals[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
    </div>
  </div>`
  }
  $('#rowData').html(box);
  $("html, body").animate({ scrollTop: 0, }, 200);
};
async function getMainIngredient(Ingredient) {
  $('.box-loading').fadeIn(100);
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`);
  meals = await meals.json();
  meals = meals.meals;
  // console.log(meals);
  displymealsAPI(meals);
  $('.box-loading').fadeOut(100);
};

// ((((  5  ))))  Clickd show page contact

$('#contact').click(

  function contact () {
   toggelNavbar();
  $('#rowData').html(`<section id="contact" class="text-center container myM p-5 mx-auto mb-5 ">
  <div class="p-2">
      <h2 class="text-light mb-5">ContacUs...</h2>
      <div class="row">
          <div class="col-md-6 p-2">
              <div class="form-group position-relative">
                  <i class="Valid-mark fa-solid fa-check"></i>
                  <input onkeyup="userNameValid(this , this.value)" class="form-control" id="name"
                  placeholder="Enter Your Name">
                  <div class="alert-next alert mt-1 alert-danger" id="namealert" role="alert">
                      Special Characters and Numbers not allowed
                  </div>
              </div>
          </div>
          <div class="col-md-6 p-2">
              <div class="form-group position-relative">
                  <i class="Valid-mark fa-solid fa-check"></i>
                  <input onkeyup="userEmailValid(this , this.value)" class="form-control" id="email" placeholder="Enter Email">
                  <div class="alert-next alert mt-1 alert-danger" id="emailalert" role="alert">
                      Enter valid email. *Ex: xxx@yyy.zzz
                  </div>
              </div>
          </div>
          <div class="col-md-6 p-2">
              <div class="form-group position-relative">
                  <i class="Valid-mark fa-solid fa-check"></i>
                  <input onkeyup="userPhoneValid(this , this.value)" class="form-control" id="phone" placeholder="Enter phone">
                  <div class="alert-next alert mt-1 alert-danger " id="phonealert" role="alert">
                      Enter valid Phone Number
                  </div>
              </div>
          </div>
          <div class="col-md-6 p-2">
              <div class="form-group position-relative">
                  <i class="Valid-mark fa-solid fa-check"></i>
                  <input onkeyup="userAgeValid(this , this.value)" class="form-control" id="age" placeholder="Enter Age">
                  <div class="alert-next alert mt-1 alert-danger " id="agealert" role="alert">
                      Enter valid Age
                  </div>
              </div>
          </div>
          <div class="col-md-6 p-2">
              <div class="form-group position-relative">
                  <div onclick="showHidePassword()" class="show-pass-box">
                      <i class="show-pass fa-regular fa-eye-slash"></i>
                      <i class="hide-pass fa-regular fa-eye"></i>
                  </div>
                  <i class="Valid-mark fa-solid fa-check"></i>
                  <input onkeyup="userPasswordValid(this , this.value)" class="form-control btn-pass" type="password" id="password"
                      placeholder="Enter Password">
                  <div class="alert-next alert mt-1 alert-danger " id="passwordalert" role="alert">
                      Enter valid password *Minimum eight characters, at least one letter and one number:*
                  </div>
              </div>
          </div>
          <div class="col-md-6 p-2">
              <div class="form-group position-relative">
                  <div onclick="showHidePassword()" class="show-pass-box">
                      <i class="show-pass fa-regular fa-eye-slash"></i>
                      <i class="hide-pass fa-regular fa-eye"></i>
                  </div>
                  <i class="Valid-mark fa-solid fa-check"></i>
                  <input onkeyup="userRePasswordValid(this , this.value)" class="form-control btn-pass" type="password" id="rePassword"
                      placeholder="Enter RePassword">
                  <div class="alert-next alert mt-1 alert-danger " id="repasswordalert" role="alert">
                      Enter valid Repassword
                  </div>
              </div>
          </div>
      </div>
      <button type="submit" disabled id="submitBtn" class="btn btn-outline-danger mt-3 ">Submit</button>
  </div>
</section>`);
      }
);

//  Validation form
let nameValid = false,
    emailValid = false,
    phoneValid = false,
    ageValid = false,
    passwordValid = false,
    repasswordValid = false;
  function userNameValid(e , val) {
      let value = /^[a-zA-Z ]+$/.test(val)
      if (value) {
        $(e).prev().show();
        $(e).next().hide();
        nameValid = true;
      } else { 
        $(e).prev().hide();       
        $(e).next().show();
      }
      submitBtnValid();
  }
  function userEmailValid(e , val) {
      let value = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
      if (value) {
        $(e).prev().show();
        $(e).next().hide();
        emailValid = true;
      } else { 
        $(e).prev().hide();       
        $(e).next().show();
      }
      submitBtnValid();
  }
  function userPhoneValid(e , val) {
      let value = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(val)
      if (value) {
        $(e).prev().show();
        $(e).next().hide();
        phoneValid = true;
      } else { 
        $(e).prev().hide();       
        $(e).next().show();
      }
      submitBtnValid();
  }
  function userAgeValid(e , val) {
      let value = /^[1-9][0-9]?$|^100$/.test(val)
      if (value) {
        $(e).prev().show();
        $(e).next().hide();
        ageValid = true;
      } else { 
        $(e).prev().hide();       
        $(e).next().show();
      }
      submitBtnValid();
  }
  function userPasswordValid(e , val) {
      let value = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val)
      if (value) {
        $(e).prev().show();
        $(e).next().hide();
        passwordValid = true;
      } else { 
        $(e).prev().hide();       
        $(e).next().show();
      }
      if ($(e).attr('id') == 'password' && $(e).val() != ''){
        $($('.show-pass-box')[0]).show();
      } else {
        $($('.show-pass-box')[0]).hide();
      }
      submitBtnValid();
  }
  function userRePasswordValid(e , val) {
    if (val == $('#password').val()) {
      $(e).prev().show();
      $(e).next().hide();
      repasswordValid = true;
    } else { 
      $(e).prev().hide();       
      $(e).next().show();
    }
    submitBtnValid(); 

      if ($(e).attr('id') == 'rePassword' && $(e).val() != ''){
        $($('.show-pass-box')[1]).show();
      } else {
        $($('.show-pass-box')[1]).hide();
      }
  }
  function submitBtnValid() {
    if(nameValid && emailValid && phoneValid && ageValid && passwordValid && repasswordValid){
      document.getElementById("submitBtn").removeAttribute("disabled");
    }else{
      document.getElementById("submitBtn").setAttribute("disabled",'');
    }
  }
//    show hide password

function showHidePassword(){
    $('.show-pass').toggle();
    $('.hide-pass').toggle();
    if ($('.btn-pass').attr("type" ) == "password") {
      $('.btn-pass').attr("type" , "text");
    } else {
      $('.btn-pass').attr("type" , "password");
    }
  
}

