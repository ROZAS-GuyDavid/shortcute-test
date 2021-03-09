var eventList = [];

// get range of half hour
var getHourRange = function(startDate, endDate){
    let hours = [];
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });

    // push hour format HH and MM -> [[10, 00], [10, 30], ...]
    for (var hour = startDate.getHours(); hour < endDate.getHours(); hour++) {
        hours.push([hour, 0]);
        hours.push([hour, 30]);
    }

    // get list of avaible hours HH:MM -> ["10:00", "10:30", ...]
    const hours_range = hours.map(time => {
        const [hour, minute] = time;
        date.setHours(hour);
        date.setMinutes(minute);

        return formatter.format(date);
    });

    return hours_range;
}

var Event = function(opening, recurring, startDate, endDate){
  this.opening = opening;
  this.recurring = recurring;
  this.startDate = startDate;
  this.endDate = endDate;

  eventList.push(this);
};

Event.prototype.availabilities = function(fromDate, toDate){
    var result = "";

    // get opening event list filterd on date range and opening true
    const openingList = eventList.filter((event) => {
        return event.opening == true &&
        event.startDate.getTime() >= fromDate.getTime() &&
        event.endDate.getTime() <= toDate.getTime();
    });

    // get opening event list without time part
    const openingListNoTime  = openingList.map(event => ({
        openings: event.opening,
        recurring: event.recurring,
        startDate: new Date(fromDate.setHours(0, 0, 0, 0)),
        endDate: new Date(toDate.setHours(0, 0, 0, 0))
    }));

    // create a new list filterd on date range whitout time part compare
    const openingEvent = openingListNoTime.filter((event) => event.startDate.getTime() <= fromDate.getTime());

    // prepare result case
    if (openingEvent.length !== 0) {
        result = "I'm available from %DATE%, at %HOUR_LIST%  \nI'm not available any other time !";
    } else {
        result = "the company is not available on this range of date";
    }

    // prepare format date
    var hourRange = new getHourRange(startDate, endDate);
    const options = {month: 'long', day: 'numeric' };
    var replacements = {
        "%DATE%": startDate.toLocaleDateString('en-EN', options),
        "%HOUR_LIST%": hourRange.slice(0, hourRange.length -1).concat(" and ", hourRange[hourRange.length - 1])
    };

    // replace data
    result = result.replace(/%\w+%/g, function(all) {
        return replacements[all] || all;
    });

    console.log(result);
    return result;
};