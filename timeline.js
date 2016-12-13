/**
 * Created by Jon on 11/22/2016.
 */

google.charts.load('upcoming', {'packages':['geochart']});
//google.charts.setOnLoadCallback(drawBlankMap());
google.charts.setOnLoadCallback(drawTimeLine);

var data = new google.visualization.DataTable();
var options = {};

function drawRegionsMap(data, options) {
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    self.data = data;
    self.options = options;

    chart.draw(data, options);
}



function drawTimeLine() {
    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    var options = {};

    var timelineItems = new vis.DataSet(options);

    var id = 1;
    var dateStart = null;
    var dateEnd = null;

    for (var event in json)
    {
        console.log(json[event].name);
        for( var date in json[event].dates) {
            console.log("    "+json[event].dates[date].month+"/"+json[event].dates[date].day+"/"+json[event].dates[date].year);

            if(dateStart === null) {
                dateStart = new Date(json[event].dates[date].year, json[event].dates[date].month, json[event].dates[date].day);
                dateStart.setFullYear(json[event].dates[date].year);
            }
            else {
                dateEnd = new Date(json[event].dates[date].year, json[event].dates[date].month, json[event].dates[date].day);
                dateEnd.setFullYear(json[event].dates[date].year);
            }
        }
        if(dateEnd === null) {
            timelineItems.add({id: id, content: json[event].name, start: dateStart });
        }
        else {
            timelineItems.add({id: id, content: json[event].name, start: dateStart, end: dateEnd });
        }
        id = id+1;
        dateStart = null;
        dateEnd = null;
    }

// Configuration for the Timeline
    var options = {};

// Create a Timeline
    var timeline = new vis.Timeline(container, timelineItems, options);

    timeline.on('select', function (properties) {

        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Lat');
        data.addColumn('number', 'Long');
        data.addColumn('string', 'name');
        data.addColumn({type: 'string', role:'tooltip'});

        var options = {};

        for (var event in json)
        {
            if(json[event].name === timelineItems.get(properties.items)[0].content) {
                console.log(json[event].name);
                for (var city in json[event].cities) {
                    console.log(json[event].cities[city]);
                    options = {
                        region: json[event].region,
                        displayMode: 'markers'
                    };
                    data.addRows([[json[event].cities[city].Lat, json[event].cities[city].Long, json[event].cities[city].name, json[event].details]]);
                }
            }
        }

        drawRegionsMap(data, options);
    });
}

function fit() {
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(self.data, self.options);
}

window.onresize = function () {
    fit();
}

window.onload = function () {
    fit();
}



