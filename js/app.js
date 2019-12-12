'use strict';

// global variables
var hoursOfDay = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];
// var hourlyAdjust = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
var currentHourCookie, currentHourAdjust;

// targets Element ID to be manipulated
var locationHolder = document.getElementById('locations-information');
var mainLocationsHolder = document.getElementById('main-locations');
var totalHolder = document.getElementById('total-cookies');
var employeeHolder = document.getElementById('locations-employees');
var addNewLocation = document.getElementById('add-location');

// cookieStand object array
// contains functions for calculating a random num of customers and gernerating a number of cookies based on that random number

function NewPlace(location,minCust,maxCust,avgCookie) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.hourlyCookie = [];
  this.totalCookie = 0;
  this.employeeCount = [];
  this.hourlyAdjust = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
}
// takes in arguments to create new object and add it to cookieStand array
function addLocation(location,minCust,maxCust,avgCookie) {
  var newLocation = new NewPlace(location,minCust,maxCust,avgCookie);
  cookieStand.push(newLocation);
}

// Method for generating a random number of cookies per hour
NewPlace.prototype.cookieGen = function() {
  var rando = Math.round(Math.round(Math.random() * (currentHourAdjust * (this.maxCust - this.minCust)) + this.minCust) * this.avgCookie);
  this.hourlyCookie.push(rando);
  return this.hourlyCookie;
};

// Method to calculate how many employees are needed per hour
NewPlace.prototype.employeeGen = function() {
  // debugger;
  var getEmloyee = Math.ceil(currentHourCookie / 20);
  this.employeeCount.push(getEmloyee);
  return this.employeeCount;
};

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
  buildTables();
}

var cookieStand = [];

addLocation('SEATTLE', 25, 65, 6.3);
addLocation('TOKYO', 3, 24, 1.2);
addLocation('DUBAI', 11, 38, 3.7);
addLocation('PARIS', 20, 38, 2.3);
addLocation('LIMA', 2, 16, 4.6);
addLocation('PORTLAND', 23, 52, 7.4);

// Create list of locations
function buildTables() {

  // NewPlace.prototype.buildTables = function() {
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

  // Last row of totals
  var completeTotal = 0;
  var totalTd = document.createElement('td');
  totalTd.textContent = 'TOTAL';
  totalHolder.appendChild(totalTd);
  totalTd.className += 'font-effect-distressed-wood table-city';
  for(i = 0; i < hoursOfDay.length; i++) {
    var hourlyTotal = 0;
    for(counter = 0; counter < cookieStand.length; counter++) {
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

  // Employees Needed Per Hour Table
  for(i = 0; i < cookieStand.length; i++) {
    cookieStand[i].totalCookie = 0;
    newRow = document.createElement('tr');
    employeeHolder.appendChild(newRow);
    newHeader = document.createElement('td');
    newHeader.className += 'font-effect-distressed-wood table-city';
    newHeader.textContent = cookieStand[i].location;
    employeeHolder.appendChild(newHeader);
    // Under each location adds cookie sales for each hour
    for(counter = 0; counter < hoursOfDay.length; counter++) {
      currentHourCookie = cookieStand[i].hourlyCookie[counter];
      cookieStand[i].employeeCount = cookieStand[i].employeeGen(counter);
      newLi = document.createElement('td');
      newLi.textContent = cookieStand[i].employeeCount[counter];
      employeeHolder.appendChild(newLi);
    }
  }
}

// check whether in index.html or sales.html
if(window.location.pathname.endsWith('sales.html')) {
  // debugger;
  // cookieStand.buildTables();
  // Buiilds cookieStand array objects

  buildTables();

  // Creates list of locations for main page
} else if (window.location.pathname.endsWith('index.html')) {
  for(i = 0; i < cookieStand.length; i++) {
    var newLine = document.createElement('li');
    newLine.textContent = `${cookieStand[i].location}: ${hoursOfDay[0]} - ${hoursOfDay[12]}`;
    mainLocationsHolder.appendChild(newLine);
  }
}
