/**
 * Created by Jon on 11/22/2016.
 */

//console.log("original file: "+json);

/*
for (var chapter in json.chapters)
{
    console.log(json.chapters[chapter].title);
    for ( var event in json.chapters[chapter].events )
    {
        console.log("  "+json.chapters[chapter].events[event].name);
        for( var date in json.chapters[chapter].events[event].dates) {
            console.log("    "+json.chapters[chapter].events[event].dates[date].month+"/"+json.chapters[chapter].events[event].dates[date].day+"/"+json.chapters[chapter].events[event].dates[date].year);
        }

        for( var country in json.chapters[chapter].events[event].locations.countries) {
             console.log("    "+json.chapters[chapter].events[event].locations.countries[country]);
        }
        for( var city in json.chapters[chapter].events[event].locations.cities) {
             console.log("    "+json.chapters[chapter].events[event].locations.cities[city]);
        }
    }
}
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

    var options = {};
    var items = new vis.DataSet(options);

    var id = 1;
    var text = "";
    var dateStart = null;
    var dateEnd = null;
    var group = 0;

    for (var chapter in json.chapters)
    {
         console.log(json.chapters[chapter].title);
	 group = group+1;
         for ( var event in json.chapters[chapter].events )
         {
            console.log("  "+json.chapters[chapter].events[event].name);
	    text = json.chapters[chapter].events[event].name;
            for( var date in json.chapters[chapter].events[event].dates) {
                console.log("    "+json.chapters[chapter].events[event].dates[date].month+"/"+json.chapters[chapter].events[event].dates[date].day+"/"+json.chapters[chapter].events[event].dates[date].year);
		if(dateStart === null) {
		    dateStart = new Date(json.chapters[chapter].events[event].dates[date].year, json.chapters[chapter].events[event].dates[date].month, json.chapters[chapter].events[event].dates[date].day);
		}
		else {
		    dateEnd = new Date(json.chapters[chapter].events[event].dates[date].year, json.chapters[chapter].events[event].dates[date].month, json.chapters[chapter].events[event].dates[date].day);
		}
            }
	    if(dateEnd === null) {
                //items.add({id: id, content: text, start: dateStart, group: group });
                items.add({id: id, content: text, start: dateStart });
	    }
	    else {
		//items.add({id: id, content: text, start: dateStart, end: dateEnd, group: group});
		items.add({id: id, content: text, start: dateStart, end: dateEnd });
	    }
	    id = id+1;
            text = "";
            dateStart = null;
	    dateEnd = null;
        }
    }
/*
    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet([
        {id: 1, content: 'Demo Date', start: new Date(-4000, 04, 20)},
*/

// Configuration for the Timeline
    var options = {};

// Create a Timeline
    var timeline = new vis.Timeline(container, items, options);
}



