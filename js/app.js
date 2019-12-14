'use strict';

// global variables
var hoursOfDay = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm',
  '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
var currentHourCookie, currentHourAdjust;
var cookieStand = [];
var hourlyCookie, employeeCount = [];

// Buiilds each location object and puts into cookieStandLocation array
var seattle = new CookieStand('SEATTLE', 25, 65, 6.3, '137 15th Ave E', 'WA', 98112, 2068586957);
var newYork = new CookieStand('NEW YORK', 3, 24, 1.2, '167 W 74th St', 'NY', 10023, 9174643769);
var losAngeles = new CookieStand('LOS ANGELES', 11, 38, 3.7, '5466 Wilshire Blvd', 'CA', 90036, 3236349800);
var miami = new CookieStand('MIAMI', 20, 38, 2.3, '413 15th St', 'FL', 33139, 7865770940);
var denver = new CookieStand('DENVER', 2, 16, 4.6, '3200 Irving St', 'CO', 80211, 3034557194);
var portland = new CookieStand('PORTLAND', 23, 52, 7.4, '338 NW 21st Ave', 'OR', 97209, 5032482202);
var cookieStandLocation = [seattle, newYork, losAngeles, miami, denver, portland];

// targets Element ID to be manipulated
var headerHolder = document.getElementById('table-header');
var locationHolder = document.getElementById('locations-information');
var mainLocationsHolder = document.getElementById('main-locations');
var totalHolder = document.getElementById('total-cookies');
var employeeHeaderHolder = document.getElementById('employee-table-header');
var employeeHeaderHolder = document.getElementById('locations-employees');
var addNewLocation = document.getElementById('add-location');

// Constructor for CookieStand objects
function CookieStand(locationPar,minCustPar,maxCustPar,avgCookiePar,addressPar,statePar,zipCodePar,phoneNumberPar) {
  this.location = locationPar;
  this.address = addressPar;
  this.state = statePar;
  this.zipCode = zipCodePar;
  this.phoneNumber = phoneNumberPar;
  this.minCust = minCustPar;
  this.maxCust = maxCustPar;
  this.avgCookie = avgCookiePar;
  this.hourlyCookie = [];
  this.totalCookie = 0;
  this.employeeCount = [];
  this.hourlyAdjust = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
}

// Method for generating a random number of cookies per hour & adding each hour to toalCookie
CookieStand.prototype.cookieGen = function() {
  for (var i = 0; i < hoursOfDay.length; i++) {
    this.hourlyCookie.push(Math.round(Math.round(Math.random() * (this.hourlyAdjust[i] * (this.maxCust - this.minCust))
      + this.minCust) * this.avgCookie));
      this.totalCookie = this.totalCookie + this.hourlyCookie[i];
  }
  return this.hourlyCookie;
};

// Method to calculate how many employees are needed per hour
CookieStand.prototype.employeeGen = function() {
  for (var i = 0; i < hoursOfDay.length; i++) {
    this.employeeCount.push(Math.ceil(hourlyCookie[i] / 20));
  }
  return this.employeeCount;
};

CookieStand.prototype.initialCalcs = function() {
  for (var i = 0; i < cookieStandLocation.length; i++){
    cookieStandLocation[i].cookieGen();
    cookieStandLocation[i].employeeCount();
  }
}

// Builds either sales table header or employee table header depending on boolean value of argument
function buildHeader(employeeTable) {
  var newRow = document.createElement('tr');
  if (employeeTable === false) {
    headerHolder.appendChild(newRow);
  } else { 
    employeeHeaderHolder.appendChild(newRow);
  }
  var newCell = document.createElement('td');
  newCell.textContent = '';
  newRow.appendChild(newCell);
  for(var i = 0; i < hoursOfDay.length; i++) {
    newCell = document.createElement('td');
    newCell.textContent = hoursOfDay[i];
    newRow.appendChild(newCell);
  }
  if (employeeTable === false) { 
  newCell = document.createElement('td');
  newCell.textContent = 'Daily Location Total';
  newRow.appendChild(newCell);
  }
}

// Create list of locations
CookieStand.prototype.buildSalesTable = function() {
  for(var i = 0; i < cookieStand.length; i++) {
    cookieStand[i].totalCookie = 0;
    var newRow = document.createElement('tr');
    locationHolder.appendChild(newRow);
    var newHeader = document.createElement('td');
    newHeader.className += 'font-effect-distressed-wood table-city';
    newHeader.textContent = cookieStand[i].location;
    locationHolder.appendChild(newHeader);
    // Under each location adds cookie sales for each hour
    for(var counter = 0; counter < hoursOfDay.length; counter++) {
      currentHourAdjust = cookieStand[i].hourlyAdjust[counter];
      cookieStand[i].hourlyCookie = cookieStand[i].cookieGen(counter);
      cookieStand[i].totalCookie = cookieStand[i].totalCookie + cookieStand[i].hourlyCookie[counter];
      var newLi = document.createElement('td');
      newLi.textContent = cookieStand[i].hourlyCookie[counter];
      locationHolder.appendChild(newLi);
    }
    // Appends total number of cookies for that location
    var finalLi = document.createElement('td');
    finalLi.textContent = cookieStand[i].totalCookie;
    locationHolder.appendChild(finalLi);
  }
}

function buildTotal() {
  // Last row of totals
  var completeTotal = 0;
  var totalTd = document.createElement('td');
  totalTd.textContent = 'TOTAL';
  totalHolder.appendChild(totalTd);
  totalTd.className += 'font-effect-distressed-wood table-city';
  for(var i = 0; i < hoursOfDay.length; i++) {
    var hourlyTotal = 0;
    for(var counter = 0; counter < cookieStand.length; counter++) {
      hourlyTotal = hourlyTotal + cookieStand[counter].hourlyCookie[i];
    }
    totalTd = document.createElement('td');
    totalTd.textContent = hourlyTotal;
    totalHolder.appendChild(totalTd);
    completeTotal = completeTotal + hourlyTotal;
  }
  totalTd = document.createElement('td');
  totalTd.textContent = completeTotal;
  totalHolder.appendChild(totalTd);
}

CookieStand.prototype.buildEmployeeTable = function() {
  // Employees Needed Per Hour Table
  for(var i = 0; i < cookieStand.length; i++) {
    cookieStand[i].totalCookie = 0;
    var newRow = document.createElement('tr');
    employeeHolder.appendChild(newRow);
    var newHeader = document.createElement('td');
    newHeader.className += 'font-effect-distressed-wood table-city';
    newHeader.textContent = cookieStand[i].location;
    employeeHolder.appendChild(newHeader);
    // Under each location adds cookie sales for each hour
    for(var counter = 0; counter < hoursOfDay.length; counter++) {
      currentHourCookie = cookieStand[i].hourlyCookie[counter];
      cookieStand[i].employeeCount = cookieStand[i].employeeGen(counter);
      var newLi = document.createElement('td');
      newLi.textContent = cookieStand[i].employeeCount[counter];
      employeeHolder.appendChild(newLi);
    }
  }
}

// Event listener for form
addNewLocation.addEventListener('submit', newLocationSubmitted);

function newLocationSubmitted(event) {
  event.preventDefault();
  // debugger;
  var newName = document.getElementById('location-name').value;
  var newMax = Number(document.getElementById('max-cust').value);
  var newMin = Number(document.getElementById('min-cust').value);
  var newAvg = Number(document.getElementById('avg-cookie-sale').value);
  addLocation(newName,newMin,newMax,newAvg);
  document.getElementById('add-location').reset();
  document.getElementById('locations-information').innerHTML = '';
  document.getElementById('locations-employees').innerHTML = '';
  document.getElementById('total-cookies').innerHTML = '';
  cookieStand.buildTable();
  cookieStand.buildTotal();
  cookieStand.buildEmployeeTable();
}

// // check whether in index.html or sales.html
// if(window.location.pathname.endsWith('sales.html')) {
//   // Build all tables
//   cookieStand.buildTable();
//   cookieStand.buildTotal();
//   cookieStand.buildEmployeeTable();

//   // Creates list of locations for main page
// } else if (window.location.pathname.endsWith('index.html')) {
//   for(var i = 0; i < cookieStand.length; i++) {
//     var newLine = document.createElement('li');
//     newLine.textContent = `${cookieStand[i].location}: ${hoursOfDay[0]} - ${hoursOfDay[12]}`;
//     mainLocationsHolder.appendChild(newLine);
//   }
// }
