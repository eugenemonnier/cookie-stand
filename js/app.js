'use strict';

// global variables
var hoursOfDay = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm',
  '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
var closingHour = '8:00pm';

// Buiilds each location object and puts into cookieStandLocation array
var seattle = new CookieStand('SEATTLE', 25, 65, 6.3, '137 15th Ave E', 'WA', 98112, '(206) 858-6957');
var newYork = new CookieStand('NEW YORK', 3, 24, 1.2, '167 W 74th St', 'NY', 10023, '(917) 464-3769');
var losAngeles = new CookieStand('LOS ANGELES', 11, 38, 3.7, '5466 Wilshire Blvd', 'CA', 90036, '(323) 634-9800');
var miami = new CookieStand('MIAMI', 20, 38, 2.3, '413 15th St', 'FL', 33139, '(786) 577-0940');
var denver = new CookieStand('DENVER', 2, 16, 4.6, '3200 Irving St', 'CO', 80211, '(303) 455-7194');
var cookieStandLocation = [seattle, newYork, losAngeles, miami, denver];

// targets Element ID to be manipulated
var headerHolder = document.getElementById('table-header');
var locationHolder = document.getElementById('locations-information');
var mainLocationsHolder = document.getElementById('main-locations');
var totalHolder = document.getElementById('total-cookies');
var employeeHeaderHolder = document.getElementById('employee-table-header');
var employeeHolder = document.getElementById('locations-employees');
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
    this.hourlyCookie[i] = Math.round(Math.round(Math.random() * (this.hourlyAdjust[i] * (this.maxCust - this.minCust))
      + this.minCust) * this.avgCookie);
    this.totalCookie = this.totalCookie + this.hourlyCookie[i];
  }
  return this.hourlyCookie;
};

// Method to calculate how many employees are needed per hour
CookieStand.prototype.employeeGen = function() {
  for (var i = 0; i < hoursOfDay.length; i++) {
    this.employeeCount[i] = Math.ceil(this.hourlyCookie[i] / 20);
  }
  return this.employeeCount;
};

// Perform initial calculations on objects in cookieStandLocation array
CookieStand.prototype.initialCalcs = function() {
  for (var i = 0; i < cookieStandLocation.length; i++){
    cookieStandLocation[i].cookieGen();
    cookieStandLocation[i].employeeCount();
  }
};

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

// Change location name from all caps to just fist letter capped
CookieStand.prototype.locationForAddress = function() {
  return this.location.charAt(0) + this.location.slice(1).toLowerCase();
};

// Create list of locations
CookieStand.prototype.buildTable = function(employee) {
  var newRow = document.createElement('tr');
  // selects whether to add all following content to either Sales table or Employee table based on val of arg
  if (employee === false){
    locationHolder.appendChild(newRow);
  } else {
    employeeHolder.appendChild(newRow);
  }
  var newCell = document.createElement('td');
  newCell.className += 'font-effect-distressed-wood table-city';
  newCell.textContent = this.location;
  newRow.appendChild(newCell);
  // Under each location adds either cookie sales or employee count for each hour dependent on val of arg
  for(var i = 0; i < hoursOfDay.length; i++) {
    newCell = document.createElement('td');
    if (employee === false){
      newCell.textContent = this.hourlyCookie[i];
    } else {
      newCell.textContent = this.employeeCount[i];
    }
    newRow.appendChild(newCell);
  }
  // Appends total number of cookies for that location
  if (employee === false){
    newCell = document.createElement('td');
    newCell.textContent = this.totalCookie;
    newRow.appendChild(newCell);
  }
};

// Last row of totals for Sales table
function buildTotal() {
  var completeTotal = 0;
  var totalTd = document.createElement('td');
  totalTd.textContent = 'TOTAL';
  totalHolder.appendChild(totalTd);
  totalTd.className += 'font-effect-distressed-wood table-city';
  for(var i = 0; i < hoursOfDay.length; i++) {
    var hourlyTotal = 0;
    for(var counter = 0; counter < cookieStandLocation.length; counter++) {
      hourlyTotal = hourlyTotal + cookieStandLocation[counter].hourlyCookie[i];
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

// Inputs from form get added to cookieStandLocation array
function newLocationSubmitted(event) {
  event.preventDefault();
  var newLocation = new CookieStand(
    document.getElementById('location-name').value.toUpperCase(),
    Number(document.getElementById('max-cust').value),
    Number(document.getElementById('min-cust').value),
    Number(document.getElementById('avg-cookie-sale').value)
  );
  cookieStandLocation.push(newLocation);
  // Reset form and Total row of Sales Table
  document.getElementById('add-location').reset();
  document.getElementById('total-cookies').innerHTML = '';
  // Runs calculations on new location and adds row to Sales Table & Employee Table, then adds on new Total row
  newLocation.cookieGen();
  newLocation.employeeGen();
  newLocation.buildTable(false);
  newLocation.buildTable(true);
  buildTotal();
}

// check whether in index.html or sales.html
if(window.location.pathname.endsWith('sales.html')) {
  // Build all tables
  buildHeader(false);
  buildHeader(true);
  for(var i = 0; i < cookieStandLocation.length; i++) {
    cookieStandLocation[i].cookieGen();
    cookieStandLocation[i].employeeGen();
    cookieStandLocation[i].buildTable(false);
    cookieStandLocation[i].buildTable(true);
  }
  buildTotal();
  // Event listener for form
  addNewLocation.addEventListener('submit', newLocationSubmitted);

  // Creates list of locations for main page
} else if (window.location.pathname.endsWith('index.html')) {
  for(i = 0; i < cookieStandLocation.length; i++) {
    var city = cookieStandLocation[i].locationForAddress();
    var newBlankLine = document.createElement('br');
    newBlankLine.textContent = ' ';
    mainLocationsHolder.appendChild(newBlankLine);
    var newLocLine = document.createElement('li');
    newLocLine.textContent = `${cookieStandLocation[i].location}: ${hoursOfDay[0]} - ${closingHour}`;
    mainLocationsHolder.appendChild(newLocLine);
    var newAddrLine = document.createElement('li');
    newAddrLine.textContent = `${cookieStandLocation[i].address}, ${city}, ${cookieStandLocation[i].state} 
    ${cookieStandLocation[i].zipCode}`;
    mainLocationsHolder.appendChild(newAddrLine);
    var newPhoneLine = document.createElement('li');
    newPhoneLine.textContent = cookieStandLocation[i].phoneNumber;
    mainLocationsHolder.appendChild(newPhoneLine);
  }
}
