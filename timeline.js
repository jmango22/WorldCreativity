/**
 * Created by Jon on 11/22/2016.
 */



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
        {id: 1, content: 'Demo Date', start: new Date(-3200, 04, 20)},
        {id: 2, content: 'Demo Date', start: new Date(-500, 04, 14)},
        {id: 3, content: 'Demo Date', start: new Date(2013, 04, 21)},
        {id: 4, content: 'Demo Period', start: new Date(-200, 02, 10), end: new Date(200, 01, 09)}
    ]);

// Configuration for the Timeline
    var options = {};

// Create a Timeline
    var timeline = new vis.Timeline(container, items, options);
}



