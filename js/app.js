'use strict';

// global variables
var hoursOfDay = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];

// targets Element ID to be manipulated
var locationHolder = document.getElementById('locations-information');
var mainLocationsHolder = document.getElementById('main-locations');

// cookieStand object array
//contains functions for calculating a random num of customers and gernerating a number of cookies based on that random number
// var cookieStand = [
// {
//   location: 'SEATTLE',
//   minCust: 23,
//   maxCust: 65,
//   avgCookie: 6.3,
//   cookieGen: function() {
//     return Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
//   },
// },
// {
//   location: 'TOKYO',
//   minCust: 3,
//   maxCust: 24,
//   avgCookie: 1.2,
//   cookieGen: function() {
//     return Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
//   },
// },
// {
//   location: 'DUBAI',
//   minCust: 11,
//   maxCust: 38,
//   avgCookie: 3.7,
//   cookieGen: function() {
//     return Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
//   },
// },
// {
//   location: 'PARIS',
//   minCust: 20,
//   maxCust: 38,
//   avgCookie: 2.3,
//   cookieGen: function() {
//     return Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
//   },
// },
// {
//   location: 'LIMA',
//   minCust: 2,
//   maxCust: 16,
//   avgCookie: 4.6,
//   cookieGen: function() {
//     return Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
//   },
// }
// ];

var cookieStand = [];

function NewPlace(location,minCust,maxCust,avgCookie) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.hourlyCookie = [];
  this.totalCookie = 0;
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
  this.hourlyCookie[counter] = Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
  return (this.hourlyCookie[counter]);
};

// check whether in index.html or sales.html
if(window.location.pathname.endsWith('sales.html')) {
  // Create list of locations
  for(var i = 0; i < cookieStand.length; i++) {
    this.totalCookie = 0;
    var newRow = document.createElement('tr');
    locationHolder.appendChild(newRow);
    var newHeader = document.createElement('td');
    newHeader.className += 'font-effect-splintered';
    newHeader.textContent = cookieStand[i].location;
    locationHolder.appendChild(newHeader);
    // var newUl = document.createElement('ul');
    // locationHolder.appendChild(newUl);
    // Under each location adds cookie sales for each hour
    for(var counter = 0; counter < hoursOfDay.length; counter++) {
      this.hourlyCookie = cookieStand[i].cookieGen(counter);
      this.totalCookie = this.totalCookie + this.hourlyCookie;
      var newLi = document.createElement('td');
      newLi.textContent = `${this.hourlyCookie} cookies`;
      locationHolder.appendChild(newLi);
    }
    // Appends total number of cookies for that location
    var finalLi = document.createElement('td');
    finalLi.textContent = `${this.totalCookie}`;
    locationHolder.appendChild(finalLi);
  }
} else if (window.location.pathname.endsWith('index.html')) {
  // Creates list of locations for main page
  for(i = 0; i < cookieStand.length; i++) {
    var newLine = document.createElement('li');
    newLine.textContent = `${cookieStand[i].location}: ${hoursOfDay[0]} - ${hoursOfDay[12]}`;
    mainLocationsHolder.appendChild(newLine);
  }
}
