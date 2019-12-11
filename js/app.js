'use strict';

// global variables
var hoursOfDay = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];
var hourlyAdjust = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

// targets Element ID to be manipulated
var locationHolder = document.getElementById('locations-information');
var mainLocationsHolder = document.getElementById('main-locations');
var totalHolder = document.getElementById('total-cookies');
var employeeHolder = document.getElementById('locations-employees');

// cookieStand object array
//contains functions for calculating a random num of customers and gernerating a number of cookies based on that random number

var cookieStand = [];

function NewPlace(location,minCust,maxCust,avgCookie) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.hourlyCookie = [];
  this.totalCookie = 0;
  this.employeeCount = [];
}
// takes in arguments to create new object and add it to cookieStand array
function addLocation(location,minCust,maxCust,avgCookie) {
  var newLocation = new NewPlace(location,minCust,maxCust,avgCookie);
  cookieStand.push(newLocation);
}

addLocation('SEATTLE', 25, 65, 6.3);
addLocation('TOKYO', 3, 24, 1.2);
addLocation('DUBAI', 11, 38, 3.7);
addLocation('PARIS', 20, 38, 2.3);
addLocation('LIMA', 2, 16, 4.6);
addLocation('PORTLAND', 23, 52, 7.4);

NewPlace.prototype.cookieGen = function() {
  this.hourlyCookie[counter] = Math.round(Math.round(Math.random() * (hourlyAdjust[counter] * (this.maxCust - this.minCust)) + this.minCust) * this.avgCookie);
  return (this.hourlyCookie[counter]);
};

NewPlace.prototype.employeeGen = function() {
  this.employeeCount[counter] = Math.ceil(this.hourlyCookie[counter] / 20);
};

// check whether in index.html or sales.html
if(window.location.pathname.endsWith('sales.html')) {
  // Create list of locations
  for(var i = 0; i < cookieStand.length; i++) {
    this.totalCookie = 0;
    var newRow = document.createElement('tr');
    locationHolder.appendChild(newRow);
    employeeHolder.appendChild(newRow);
    var newHeader = document.createElement('td');
    // newHeader.className += 'table-city';
    newHeader.className += 'font-effect-splintered table-city';
    newHeader.textContent = cookieStand[i].location;
    locationHolder.appendChild(newHeader);
    employeeHolder.appendChild(newHeader);
    // var newUl = document.createElement('ul');
    // locationHolder.appendChild(newUl);
    // Under each location adds cookie sales for each hour
    for(var counter = 0; counter < hoursOfDay.length; counter++) {
      this.hourlyCookie = cookieStand[i].cookieGen(counter);
      this.totalCookie = this.totalCookie + this.hourlyCookie;
      var newLi = document.createElement('td');
      newLi.textContent = `${this.hourlyCookie}`;
      locationHolder.appendChild(newLi);
      //Create Employee Table
      this.employeeCount = cookieStand[i].employeeGen(counter);
      newLi.textContent = `${this.employeeCount}`;
      employeeHolder.appendChild(newLi);
    }
    // Appends total number of cookies for that location
    var finalLi = document.createElement('td');
    finalLi.textContent = `${this.totalCookie}`;
    locationHolder.appendChild(finalLi);
  }
  // Last row of totals
  var completeTotal = 0;
  var totalTd = document.createElement('td');
  totalTd.textContent = 'TOTAL';
  totalHolder.appendChild(totalTd);
  totalTd.className += 'font-effect-splintered table-city';
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


  // Creates list of locations for main page
} else if (window.location.pathname.endsWith('index.html')) {
  for(i = 0; i < cookieStand.length; i++) {
    var newLine = document.createElement('li');
    newLine.textContent = `${cookieStand[i].location}: ${hoursOfDay[0]} - ${hoursOfDay[12]}`;
    mainLocationsHolder.appendChild(newLine);
  }
}
