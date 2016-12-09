/**
 * Created by Jon on 11/22/2016.
 */

google.charts.load('upcoming', {'packages':['geochart']});
//google.charts.setOnLoadCallback(drawRegionsMap(null));
google.charts.setOnLoadCallback(drawTimeLine);


function drawRegionsMap(array) {
    var data;

    if(array === null) {
        data = new new google.visualization.DataTable();
    }
    else {
        data = google.visualization.arrayToDataTable(array);
    }

    var options = {};

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}

var options = {};

var timelineItems = new vis.DataSet(options);

function drawTimeLine() {
    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    var id = 1;
    var dateStart = null;
    var dateEnd = null;
    var group = 0;

    for (var chapter in json.chapters)
    {
        //console.log(json.chapters[chapter].title);
	    group = group+1;
        for ( var event in json.chapters[chapter].events )
        {
            //console.log("  "+json.chapters[chapter].events[event].name);
	        text = json.chapters[chapter].events[event].name;
            for( var date in json.chapters[chapter].events[event].dates) {
                //console.log("    "+json.chapters[chapter].events[event].dates[date].month+"/"+json.chapters[chapter].events[event].dates[date].day+"/"+json.chapters[chapter].events[event].dates[date].year);
		        if(dateStart === null) {
		            dateStart = new Date(json.chapters[chapter].events[event].dates[date].year, json.chapters[chapter].events[event].dates[date].month, json.chapters[chapter].events[event].dates[date].day);
		        }
		        else {
		            dateEnd = new Date(json.chapters[chapter].events[event].dates[date].year, json.chapters[chapter].events[event].dates[date].month, json.chapters[chapter].events[event].dates[date].day);
		        }
            }
	        if(dateEnd === null) {
                timelineItems.add({id: id, content: text, start: dateStart });
	        }
	        else {
		        timelineItems.add({id: id, content: text, start: dateStart, end: dateEnd });
	        }
	        id = id+1;
            text = "";
            dateStart = null;
	        dateEnd = null;
        }
    }

// Configuration for the Timeline
    var options = {};

// Create a Timeline
    var timeline = new vis.Timeline(container, timelineItems, options);

    timeline.on('select', function (properties) {
        //console.log('selected items: ' + properties.items);
        //console.log(timelineItems.get(properties.items)[0].content);

        var arr = [];

        for (var chapter in json.chapters)
        {
            //console.log(json.chapters[chapter].title);
            group = group+1;
            for ( var event in json.chapters[chapter].events )
            {
                //console.log("  "+json.chapters[chapter].events[event].name);
                text = json.chapters[chapter].events[event].name;
                if(text === timelineItems.get(properties.items)[0].content) {
                    console.log(text);
                    for (var country in json.chapters[chapter].events[event].locations.countries) {
                        console.log(json.chapters[chapter].events[event].locations.countries[country]);

                        if(arr.size === 0) {
                            arr.push(['Country', 'Event']);
                        }

                        arr.push([json.chapters[chapter].events[event].locations.countries[country], text]);

                    }
                    for (var city in json.chapters[chapter].events[event].locations.cities) {
                        console.log(json.chapters[chapter].events[event].locations.cities[city]);
                    }
                }
            }
        }
        drawRegionsMap(arr);


    });
}



