var eventsList= [];

var Event = function(opening, recurring, startDate, endDate){
  this.opening = opening;
  this.recurring = recurring;
  this.startDate = startDate;
  this.endDate = endDate;

  this.availabilities = function(fromDate, toDate){

    return //Something awesome;
  };
  eventsList.push(this);
};