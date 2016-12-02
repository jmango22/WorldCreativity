/**
 * Created by Jon on 11/22/2016.
 */

//console.log("original file: "+json);

for (var chapter in json.chapters)
{
    console.log(json.chapters[chapter].title);
    for ( var event in json.chapters[chapter].events )
    {
        console.log("  "+json.chapters[chapter].events[event].name);
        for( var date in json.chapters[chapter].events[event].dates) {
            console.log("    "+json.chapters[chapter].events[event].dates[date].month+"/"+json.chapters[chapter].events[event].dates[date].day+"/"+json.chapters[chapter].events[event].dates[date].year);
        }

        for( var location in json.chapters[chapter].events[event].locations) {
            for( var country in json.chapters[chapter].events[event].locations[location].countries) {
                console.log("    "+json.chapters[chapter].events[event].locations[location].countries[country].value);
            }
            for( var city in json.chapters[chapter].events[event].locations[location].cities) {
                console.log("    "+json.chapters[chapter].events[event].locations[location].cities[city].value);
            }
        }
    }
}

google.charts.load('upcoming', {'packages':['geochart']});
google.charts.setOnLoadCallback(drawRegionsMap);
google.charts.setOnLoadCallback(drawTimeLine);


function drawRegionsMap() {

    var data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700]
    ]);

    var options = {};

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}

function drawTimeLine() {
    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet([
        {id: 1, content: 'Demo Date', start: new Date(-4000, 04, 20)},
        {id: 2, content: 'Demo Date', start: new Date(-500, 04, 14)},
        {id: 3, content: 'Demo Date', start: new Date(1600, 04, 21)},
        {id: 4, content: 'Demo Period', start: new Date(-200, 02, 10), end: new Date(200, 01, 09)}
    ]);

// Configuration for the Timeline
    var options = {};

// Create a Timeline
    var timeline = new vis.Timeline(container, items, options);
}



