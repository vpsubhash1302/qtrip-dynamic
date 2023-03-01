
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlPara = new URLSearchParams(search);
  const param = urlPara.get('city');
  console.log(param);
  return param;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  
  const url = 'http://13.126.104.35:8082/adventures?city='+city;
  try{
    const response = await fetch(url);
    const users = await response.json();
    return users;
   }catch(error){
     console.error("Error Found",error);
     return null; 
   }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let row = document.getElementById("data");

  for(let i of adventures){
    let division = document.createElement("div");
    division.setAttribute("class","col-lg-3 col-md-6 col-sm-12 mb-3");

    let link =document.createElement("a");
    link.setAttribute("href","detail/?adventure="+i.id);
    link.setAttribute("id",i.id);

    let advcard = document.createElement("div");
    advcard.setAttribute("class","card activity-card");

    let advimg = document.createElement("img");
    advimg.setAttribute("src",i.image);

    let advcategory = document.createElement("div");
    advcategory.setAttribute("class","category-banner");
    advcategory.textContent = i.category;

    let advtext = document.createElement("div");
    advtext.setAttribute("class","col-md-12 mt-3");

    let advtext1 = document.createElement("div");
    advtext1.setAttribute("class","d-flex justify-content-between p-2");

    const p1 = document.createElement("p");
    p1.textContent = i.name;

    const p2 = document.createElement("p");
    p2.textContent = "₹" +i.costPerHead;

    advtext1.appendChild(p1);
    advtext1.appendChild(p2);


    let advtext2 = document.createElement("div");
    advtext2.setAttribute("class","d-flex justify-content-between p-2");

    const p3 = document.createElement("p");
    p3.textContent = "Duration";

    const p4 = document.createElement("p");
    p4.textContent = i.duration+" Hours";

    

    advtext2.append(p3);
    advtext2.append(p4);

    advtext.appendChild(advtext1);
    advtext.appendChild(advtext2);
    console.log(advtext);

    advcard.appendChild(advimg);
    advcard.appendChild(advtext);
    advcard.appendChild(advcategory);

    link.appendChild(advcard);
    division.appendChild(link);

    
    row.appendChild(division);
    //console.log(row);

  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const array = list.filter(function (e) {
    return (e.duration>=low && e.duration <=high);
});

  return array;


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const array1 = list.filter(function (e) {
    return (categoryList.includes(e.category));
});

  return array1;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  const arr = filters["duration"].split("-");
  const lowInt = parseInt(arr[0]);
  const highInt = parseInt(arr[1]);

  if(filters["duration"].length>0){
    return filterByDuration(list, lowInt, highInt);
  }

  if(filters["category"].length>0){
    return filterByCategory(list, filters["category"]);
  }



  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // 
  const area = document.getElementById("category-list");
  for(let i in filters["category"]){
    const pill = document.createElement("div");
    pill.setAttribute("class","category-filter");
    pill.textContent = filters["category"][i];
    area.append(pill);
  }



}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
