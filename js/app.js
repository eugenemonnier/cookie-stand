'use strict';

// global variables
var hoursOfDay = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'];
var totalCookie, hourlyCookie;

// targets Element ID to be manipulated
var locationHolder = document.getElementById('locations-information');
var mainLocationsHolder = document.getElementById('main-locations');

// cookieStand object array
//contains functions for calculating a random num of customers and gernerating a number of cookies based on that random number
var cookieStand = [
  {
    location: 'SEATTLE',
    minCust: 23,
    maxCust: 65,
    avgCookie: 6.3,
    cookieGen: function() {
      return Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
    },
  },
  {
    location: 'TOKYO',
    minCust: 3,
    maxCust: 24,
    avgCookie: 1.2,
    cookieGen: function() {
      return Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
    },
  },
  {
    location: 'DUBAI',
    minCust: 11,
    maxCust: 38,
    avgCookie: 3.7,
    cookieGen: function() {
      return Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
    },
  },
  {
    location: 'PARIS',
    minCust: 20,
    maxCust: 38,
    avgCookie: 2.3,
    cookieGen: function() {
      return Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
    },
  },
  {
    location: 'LIMA',
    minCust: 2,
    maxCust: 16,
    avgCookie: 4.6,
    cookieGen: function() {
      return Math.round(Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookie);
    },
  }
];

// check whether in index.html or sales.html
if(window.location.pathname.endsWith('sales.html')) {
  // Create list of locations
  for(var i = 0; i < cookieStand.length; i++) {
    hourlyCookie = 0;
    totalCookie = 0;
    var newHeader = document.createElement('h2');
    var newUl = document.createElement('ul');
    newHeader.className += 'font-effect-splintered';
    newHeader.textContent = cookieStand[i].location;
    locationHolder.appendChild(newHeader);
    locationHolder.appendChild(newUl);
    // Under each location adds cookie sales for each hour
    for(var counter = 0; counter < hoursOfDay.length; counter++) {
      hourlyCookie = cookieStand[i].cookieGen();
      totalCookie = totalCookie + hourlyCookie;
      var newLi = document.createElement('li');
      newLi.textContent = `${hoursOfDay[counter]}: ${hourlyCookie} cookies`;
      locationHolder.appendChild(newLi);
    }
    // Appends total number of cookies for that location
    var finalLi = document.createElement('li');
    finalLi.textContent = `Total: ${totalCookie} cookies`;
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
