var city, lines, tracks, stations
var city1 = "Beijing"
var city2 = "Shanghai"
var country1 = "China"
var country2 = "China"
var yearrange1 = 1990
var yearrange2 = 2017
var minyear = 2500
var maxyear = -10000;
// var stations2 = [];
var map1, map2;
var loopcount = 0;
mapboxgl.accessToken = 'pk.eyJ1IjoieWVsbG93c2FpbCIsImEiOiJjamVpODhqdGQzMzh0MndxZXJqazZyM3B6In0.E4YDBoOoECmqGQ4cuVF1OA'

var zoom1 = 11;
var zoom2 = 11



  // var linetooltip = d3.select("#lineplot").append("svg").attr("id","coloriscool");

  var lineplot = d3.select("#lineplot")


  var boundingBox = lineplot.node().getBoundingClientRect();
  var width = boundingBox.width;
  var height = boundingBox.height;
  var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  }

  // var linesvg = d3.select("#lineplot").append("svg")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .attr("id", "linechart")
  //   .append("g")
  //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var arr = new Set();
var country = new Set();


d3.csv("Team_Info.csv", function(data) {  
  selection = []
  arr.clear();
  country.clear();
  //selection.push('Italy')
  //selection.push('Brazil')
  var Graph1 = new graph1(
    function(selection) {
      arr.clear();
      country.clear();
      Graph2.update( country, arr, data, selection, function(arr){
        if(arr.size == 2) {
          var iterator1 = country.values();
          var iterator2 = arr.values();
          sizeeee = 2;
          country1 = iterator1.next().value;
          if(country.size == 1)
            country2 = country1;
          else
            country2 = iterator1.next().value;
          city1 = iterator2.next().value;
          city2 = iterator2.next().value;
          console.log(city1)
          console.log(city2)
          console.log(country1)
          console.log(country2)
          var graph3 = new func();
        }

        });
  
  });

  var Graph2 = new graph2( country, arr, d3.select("#area2"),data, selection, function(arr){console.log(arr);
      return;
  });
      
});
  
function func(){
  if (map1 && map2 != undefined)
  {
    map1.remove();
    map2.remove();
    // linesvg.selectAll(".dot").remove();


  }

  var minyear = 2500
var maxyear = -10000;

  var linesvg = d3.select("#lineplot")


  linesvg.selectAll("*").remove()

  linesvg = d3.select("#lineplot").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "linechart")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var linetooltip = d3.select("#lineplot").append("svg").attr("id","coloriscool");



  // d3.select("#coloriscool").remove();
  linetooltip.selectAll("text").remove();

   map1 = new mapboxgl.Map({
    container: 'firstmap', // container id
    style: 'mapbox://styles/yellowsail/cjei8f1qz307s2rqklo3put6p',
    center: [0, 0],
    zoom: zoom1,
    attributionControl: false
  })

   map2 = new mapboxgl.Map({
    container: 'secondmap', // container id
    style: 'mapbox://styles/yellowsail/cjei8f1qz307s2rqklo3put6p',
    center: [0, 0],
    zoom: zoom2,
    attributionControl: false
  })


var stations1 = [];
var stations2 = [];

var color1 = "#57B196"
var color2 = "#695EC0"
var color3 = "#FFD25A"
document.getElementById('country2').style.color = color3;
document.getElementById('country1').style.color = color3;
document.getElementById('city1').style.color = color1;
document.getElementById('city1').textContent = city1;
document.getElementById('country1').textContent = country1;
document.getElementById('city2').style.color = color2;
document.getElementById('city2').textContent = city2;
document.getElementById('country2').textContent = country2;

//
// var lineplot = d3.select("#lineplot")
//
//
// var boundingBox = lineplot.node().getBoundingClientRect();
// var width = boundingBox.width;
// var height = boundingBox.height;
// var margin = {
//   top: 10,
//   right: 10,
//   bottom: 10,
//   left: 10
// }


// var linesvg = d3.select("#lineplot").append("svg")
//   .attr("width", width)
//   .attr("height", height)
//   .attr("id", "linechart")
//   .append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// var showcoverage = true;
var length1, length2;

var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});





var selectyear;
var cdata = new Array(),
  clines = new Array(),
  ctracks = new Array(),
  cstations = new Array();
var clearseg2 = new Array();
var clearseg1 = new Array();
var clearstation1 = new Array();
var clearstation2 = new Array();



d3.queue()
  .defer(d3.csv, "city-lines/cities.csv")
  .defer(d3.csv, "city-lines/lines.csv")
  .defer(d3.csv, "city-lines/tracks.csv")
  .defer(d3.csv, "city-lines/stations.csv")
  .await(function(error, city, lines, tracks, stations) {

    if (error) {
      console.error('ERROR: ' + error);
    } else {
      cdata = [];
      cdata = city;
      clines = [];
      clines = lines;
      ctracks = [];
      ctracks = tracks;
      cstations = [];
      cstations = stations;
    }
  });




map1.scrollZoom.disable();
map1.addControl(new mapboxgl.NavigationControl());





map1.on('load', function() {
  if (loopcount > 1)
  {
    map1.off();

  }



  var city1data = cdata.filter(function(d) {
    return d['country'] === country1 && d['name'] === city1;
  });

  var lines1 = clines.filter(function(d) {
    return d['city_id'] === city1data[0].id;
  });

  // var stations1 = [];
  var temp

  lines1.forEach(function(element) {
    temp = cstations.filter(function(d) {
      return d['line_id'] === element.id;
    });
    stations1.push(temp)
  })

  stations1raw = [];
  stations1.forEach(function(element) {
    for (var i = 0; i < element.length; i++) {
      var time = element[i].opening;

      var temp = element[i].geometry;
      var name = element[i].name;
      var t = new Array(time, temp, name)
      stations1raw.push(t)
    }
  })

  var track1 = new Array();
  var temp, col;
  lines1.forEach(function(element) {
    temp = ctracks.filter(function(d) {
      return d['line_id'] === element.id;
    });
    var t = new Array(element.color, temp);
    track1.push(t);
  });

  var totalseg1 = new Array();

  track1.forEach(function(element) {

    if (element[1].length > 0) {
      for (var i = element[1].length - 1; i >= 0; i--) {
        var curr = element[1][i].opening;
        if (curr != 0 && curr != undefined) {
          if (curr > maxyear && curr!=999999 && curr < 2500) {
            maxyear = curr
          }
          if (curr < minyear) {
            minyear = curr
          }
        }
      }
      var templine = element[1];
      var col = element[0];
      var time = element[1][0].opening;

      templine.forEach(function(i) {
        var t = i.opening;
        var seg = i.geometry;
        var currline = clines.filter(function(d) {
          return d['id'] === i.line_id;
        });


        var temp = new Array(col, seg, t, currline[0].name);
        totalseg1.push(temp);
      })
    }
  })

  

  stations1raw.forEach(function(element) {
    var seg1 = element[1].split("(")
    var segtemp = seg1[1].split(")");
    var seg2 = segtemp[0].split(",");
    seg3 = seg2[0].split(" ")
    var inner = new Array(seg3[0], seg3[1]);
    if (element[2] === "") {
      var t = new Array(element[0], inner, "NA")
    } else if (element[2] !== "")
      var t = new Array(element[0], inner, element[2])
    clearstation1.push(t);
  })

  totalseg1.forEach(function(element) {
    var seg1 = element[1].split("(");
    var segtemp = seg1[1].split(")");
    var seg2 = segtemp[0].split(",");
    var seg3;
    var segcoordinates1 = new Array();
    segcoordinates1.lineid = element.lineid
    for (var i = 0; i < seg2.length; i++) {
      seg3 = seg2[i].split(" ")
      var inner = new Array(seg3[0], seg3[1]);
      segcoordinates1.push(inner);
    }
    if (element[3] !== "")
      var t = new Array(element[0], segcoordinates1, element[3]);


    t.opening = element[2];
    clearseg1.push(t);

  })

  length1 = clearseg1.length;

  var pos1 = cdata.map(function(e) {
    return e.name;
  }).indexOf(city1);


  var temp = cdata[pos1].coords.split("(");
  var secondtemp = temp[1].split(")")
  var pos = secondtemp[0].split(" ")

  map1.flyTo({
    center: [pos[0], pos[1]],
  });

  var container1 = map1.getCanvasContainer();

  var svg1 = d3.select(container1).append("svg")

  var testjson = {}
  testjson.type = "FeatureCollection"
  testjson.features = new Array();

  var station1json = {}
  station1json.type = "FeatureCollection"
  station1json.features = new Array();

  for (var i = 0; i < clearstation1.length; i++) {
    var oneyear = {}
    generatestationjson(Number(clearstation1[i][0]), clearstation1[i][1], clearstation1[i][2], oneyear)
    station1json.features.push(oneyear)
  }

  for (var i = 0; i < clearseg1.length; i++) {
    var oneyear = {}


    generatejson(Number(clearseg1[i].opening), clearseg1[i][1], clearseg1[i][0], clearseg1[i][2], oneyear)
    testjson.features.push(oneyear)
  }

  JSON.stringify(testjson)
  JSON.stringify(station1json)


  map1.addSource("map1data", {
    "type": "geojson",
    data: testjson
  })

  map1.addSource("map1stationdata", {
    "type": "geojson",
    data: station1json
  })



  map1.addLayer({
    "id": "map1withtime",
    "type": "line",
    "source": "map1data",
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": ['get', 'color'],
      "line-width": 4
    }
  });

  map1.addLayer({
    "id": "map1station",
    "type": "circle",
    "source": "map1stationdata",
    "layout": {
      'visibility': 'none'
    },
    "paint": {
      "circle-radius": 4,
      "circle-color": "white",
      "circle-stroke-width": 2,
      "circle-stroke-color": "darkgray"
    }
  });
  filterBy(minyear);

  var slider = document.getElementById("slider");
  slider.min = minyear
  slider.max = maxyear

  document.getElementById('slider').addEventListener('input', function(e) {
    var y = parseInt(e.target.value, 10);

    filterBy(y);
  });

  var linegrap2data = [];
  var lineraw = [];
  var lineraw1 = []
  var sCount = {};
  var sCount1 = {};
  Object.keys(lineraw).forEach(function(key) {
    Object.keys(lineraw[key]).forEach(function(k) {
      if (sCount[lineraw[key][k].key] == undefined) {
        sCount[lineraw[key][k].key] = 0;
      }

      sCount[lineraw[key][k].key] += lineraw[key][k].value;

    })
  });

  Object.keys(lineraw1).forEach(function(key) {
    Object.keys(lineraw1[key]).forEach(function(k) {
      if (sCount1[lineraw1[key][k].key] == undefined) {
        sCount1[lineraw1[key][k].key] = 0;
      }

      sCount1[lineraw1[key][k].key] += lineraw1[key][k].value;

    })
  });

  var linesdata2 = [];
  var curr = 0

  var linesdata1 = []
  var curr1 = 0


  for (var i = minyear; i <= maxyear; ++i) {
    if (sCount[i] == undefined) {
      curr = curr + 0
      var temp = {};
      temp.data = Number(i)
      temp.close = Number(curr)
      linesdata2.push(temp)
    }
    if (sCount[i] != undefined) {
      curr = curr + sCount[i]
      var temp = {};
      temp.data = Number(i)
      temp.close = Number(curr)
      linesdata2.push(temp)
    }
  }
  for (var i = minyear; i <= maxyear; ++i) {
    if (sCount1[i] === undefined) {
      curr1 = curr1 + 0
      var temp = {};
      temp.data = Number(i)
      temp.close = Number(curr1)
      linesdata1.push(temp)
    }
    if (sCount1[i] != undefined) {
      curr1 = curr1 + sCount1[i]
      var temp = {};
      temp.data = Number(i)
      temp.close = Number(curr1)
      linesdata1.push(temp)
    }
  }


        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);



        x.domain([minyear, maxyear]);
        // y.domain([0, d3.max(linesdata2[linesdata2.length -1].close,  linesdata1[linesdata1.length-1].close)]);

        var sumstation2 = Number(linesdata2[linesdata2.length - 1].close)

        var sumstation1 = Number(linesdata1[linesdata1.length - 1].close)
        if (sumstation1 > sumstation2) {
          y.domain([0, sumstation1])
        } else {
          y.domain([0, sumstation2])

        }




        var valueline = d3.line()
          .x(function(d) {
            return x(d.data);
          })
          .y(function(d) {
            return y(d.close);
          });


          linesdata1.forEach(function(element){
            element.id = 1;
          })

          linesdata2.forEach(function(element){
            element.id = 2;
          })

        var totallines3 = linesdata1.concat(linesdata2);



          for (i = 0; i < stations2.length; i++) {
            var temp = d3.nest()
              .key(function(d) {
                return d.opening;
              })
              .rollup(function(e) {
                return e.length;
              })
              .entries(stations2[i]);

            lineraw.push(temp)
          }


  var w = document.getElementById("left").offsetWidth;

  var svg11 = d3.select("#left")

  svg11.selectAll("*").remove()

  svg11 = d3.select("#left").append("svg")
      .attr("width", w - 30)
      .attr("height", 20*(lines1.length+2));

  svg11.selectAll("g").remove();
  svg11.selectAll("rect").remove();
  svg11.selectAll("text").remove();

  var legend = svg11.append("g")
      .attr("class", "linename")
      .attr('transform', 'translate(-10,30)')

  legend.selectAll('rect')
    .data(lines1)
    .enter()
    .append("rect")
    .attr("x", 10)
    .attr("y", function(d, i){ return (i-1) *  20;})
    .attr("width", 30)
    .attr("height", 5)
    .attr("rx", 3)
    .attr("ry", 3)
    .style("fill", function(d) {
      return d.color;
    })

  legend.selectAll('text')
    .data(lines1)
    .enter()
    .append("text")
    .attr("x", 50)
    .attr("width", 5)
    .attr("height", 5)
    .attr("y", function(d, i){ return (i-1) *  20 + 5;})
    .text(function(d) {
      return d.name;
    });
});

function generatejson(opening, coordinates, color, name, res) {
  res.type = "Feature"
  res.properties = {}
  res.properties.opening = opening;
  res.properties.color = color;
  res.properties.name = name;
  res.geometry = {}
  res.geometry.type = "LineString";
  res.geometry.coordinates = coordinates;
  res.style = {}
}

function generatestationjson(opening, coordinates, name, res) {
  res.type = "Feature"
  res.properties = {}
  res.properties.opening = opening;
  res.properties.name = name;
  res.geometry = {}
  res.geometry.type = "Point";
  res.geometry.coordinates = coordinates;
  res.style = {}
}


// var map2 = new mapboxgl.Map({
//   container: 'secondmap', // container id
//   style: 'mapbox://styles/yellowsail/cjei8f1qz307s2rqklo3put6p',
//   center: [0, 0],
//   zoom: zoom2,
//   attributionControl: false
// })
map2.scrollZoom.disable();
map2.addControl(new mapboxgl.NavigationControl());




function filterBy(selectyear) {
  var filters = ['<=', 'opening', selectyear];
  map1.setFilter("map1withtime", filters);
  // map1.setFilter("coverage1", filters);
  map1.setFilter("map1station", filters)

  map2.setFilter("map2withtime", filters);
  map2.setFilter("map2station", filters);
  document.getElementById('year').textContent = selectyear;

}

map2.on('load', function() {
  if (loopcount > 1)
  {
    map2.off();

  }

  var city2data = cdata.filter(function(d) {
    return d['name'] === city2 && d['country'] === country2;
  });

  var lines2 = clines.filter(function(d) {
    return d['city_id'] === city2data[0].id;
  });

console.log(lines2);
  var temp

  lines2.forEach(function(element) {
    temp = cstations.filter(function(d) {
      return d['line_id'] === element.id;
    });

    stations2.push(temp)
  })

  stations2raw = [];
  stations2.forEach(function(element) {
    for (var i = 0; i < element.length; i++) {
      var time = element[i].opening;
      var name = element[i].name;

      var temp = element[i].geometry;
      var t = new Array(time, temp, name)
      stations2raw.push(t)
    }
  })

  var track2 = new Array();
  var temp, col;
  lines2.forEach(function(element) {
    temp = ctracks.filter(function(d) {
      return d['line_id'] === element.id;
    });
    var t = new Array(element.color, temp);
    track2.push(t);
  });


  stations2raw.forEach(function(element) {
    var seg1 = element[1].split("(")
    var segtemp = seg1[1].split(")");
    var seg2 = segtemp[0].split(",");
    seg3 = seg2[0].split(" ")
    var inner = new Array(seg3[0], seg3[1]);
    if (element[2] != "")
      var t = new Array(element[0], inner, element[2])
    else if (element[2] == "")
      var t = new Array(element[0], inner, "NA")
    clearstation2.push(t);
  })



  var totalseg2 = new Array();

  track2.forEach(function(element) {

    if (element[1].length > 0) {
      for (var i = element[1].length - 1; i >= 0; i--) {
        var curr = element[1][i].opening;
        if (curr != 0 && curr != undefined) {
          if (curr > maxyear && curr != 999999 && curr < 2500) {
            maxyear = curr
          }
          if (curr < minyear) {
            minyear = curr
          }
        }
      }
      var templine = element[1];
      // var time = element[1][0].opening;
      //
      // var currline = clines.filter(function(d) {
      //     return d['id'] === i.line_id;
      //   });



      templine.forEach(function(i) {
        var col = element[0];

        var t = i.opening;
        var seg = i.geometry;
        var currline = clines.filter(function(d) {
          return d['id'] === i.line_id;
        });
        var temp = new Array(col, seg, t, currline[0].name);
        totalseg2.push(temp);
      })
    }
  })


  var slider = document.getElementById("slider");
  slider.min = minyear
  slider.max = maxyear

  totalseg2.forEach(function(element) {
    var seg1 = element[1].split("(");
    var segtemp = seg1[1].split(")");
    var seg2 = segtemp[0].split(",");
    var seg3;
    var segcoordinates2 = new Array();
    segcoordinates2.lineid = element.lineid
    for (var i = 0; i < seg2.length; i++) {
      seg3 = seg2[i].split(" ")
      var inner = new Array(seg3[0], seg3[1]);
      segcoordinates2.push(inner);
    }
    var t = new Array(element[0], segcoordinates2, element[3]);
    t.opening = element[2];
    // console.log(element)
    clearseg2.push(t);

  })

  length2 = clearseg2.length;

  var pos2 = cdata.map(function(e) {
    return e.name;
  }).indexOf(city2);

  var temp = cdata[pos2].coords.split("(");
  var secondtemp = temp[1].split(")")
  var pos = secondtemp[0].split(" ")

  map2.flyTo({
    center: [pos[0], pos[1]],
  });


  var container2 = map2.getCanvasContainer();

  var svg2 = d3.select(container2).append("svg")

  var testjson = {}
  testjson.type = "FeatureCollection"
  testjson.features = new Array();


  var station2json = {}
  station2json.type = "FeatureCollection"
  station2json.features = new Array();

  for (var i = 0; i < clearstation2.length; i++) {
    var oneyear = {}
    generatestationjson(Number(clearstation2[i][0]), clearstation2[i][1], clearstation2[i][2], oneyear)
    station2json.features.push(oneyear)
  }

  for (var i = 0; i < clearseg2.length; i++) {
    var oneyear = {}
    generatejson(Number(clearseg2[i].opening), clearseg2[i][1], clearseg2[i][0], clearseg2[i][2], oneyear)
    testjson.features.push(oneyear)
  }

  JSON.stringify(testjson)
  JSON.stringify(station2json)




  map2.addSource("map2data", {
    "type": "geojson",
    data: testjson
  })

  map2.addSource("map2stationdata", {
    "type": "geojson",
    data: station2json
  })




  map2.addLayer({
    "id": "map2withtime",
    "type": "line",
    "source": "map2data",
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": ['get', 'color'],
      "line-width": 4
    }
  });

  map2.addLayer({
    "id": "map2station",
    "type": "circle",
    "source": "map2stationdata",
    "layout": {
      'visibility': 'none'
    },
    "paint": {
      "circle-radius": 4,
      "circle-color": "white",
      "circle-stroke-width": 2,
      "circle-stroke-color": "darkgray"
    }

  });
  map1.on('mouseenter', 'map1station', function(e) {
    // Change the cursor style as a UI indicator.
    map1.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.name;
    var year = e.features[0].properties.opening;


    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
      .setHTML("<h2>" + name + "</h2>" + "<br>" + "Opening: " + year + "</p>")
      .addTo(map1);
  });

  map1.on('mouseleave', 'map1station', function() {


    map1.getCanvas().style.cursor = '';
    popup.remove();
  });



  map2.on('mouseenter', 'map2station', function(e) {
    // Change the cursor style as a UI indicator.
    map2.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.name;
    var year = e.features[0].properties.opening;


    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.

    popup.setLngLat(coordinates)
      .setHTML("<p>" + name + " " + year + "</p>")
      // .setHTML("<p>" + year + "</p>")

      .addTo(map2);
  });

  map2.on('mouseleave', 'map2station', function() {

    map2.getCanvas().style.cursor = '';
    popup.remove();
  });

  filterBy(minyear);


  var linegrap2data = [];
  var lineraw = [];
  var lineraw1 = []
  for (i = 0; i < stations1.length; i++) {
    var temp = d3.nest()
      .key(function(d) {
        return d.opening;
      })
      .rollup(function(e) {
        return e.length;
      })
      .entries(stations1[i]);

    lineraw1.push(temp)
  }

  for (i = 0; i < stations2.length; i++) {
    var temp = d3.nest()
      .key(function(d) {
        return d.opening;
      })
      .rollup(function(e) {
        return e.length;
      })
      .entries(stations2[i]);

    lineraw.push(temp)
  }
  var sCount = {};
  var sCount1 = {};
  Object.keys(lineraw).forEach(function(key) {
    Object.keys(lineraw[key]).forEach(function(k) {
      if (sCount[lineraw[key][k].key] == undefined) {
        sCount[lineraw[key][k].key] = 0;
      }

      sCount[lineraw[key][k].key] += lineraw[key][k].value;

    })
  });

  Object.keys(lineraw1).forEach(function(key) {
    Object.keys(lineraw1[key]).forEach(function(k) {
      if (sCount1[lineraw1[key][k].key] == undefined) {
        sCount1[lineraw1[key][k].key] = 0;
      }

      sCount1[lineraw1[key][k].key] += lineraw1[key][k].value;

    })
  });

  var linesdata2 = [];
  var curr = 0

  var linesdata1 = []
  var curr1 = 0


  for (var i = minyear; i <= maxyear; ++i) {
    if (sCount[i] == undefined) {
      curr = curr + 0
      var temp = {};
      temp.data = Number(i)
      temp.close = Number(curr)
      linesdata2.push(temp)
    }
    if (sCount[i] != undefined) {
      curr = curr + sCount[i]
      var temp = {};
      temp.data = Number(i)
      temp.close = Number(curr)
      linesdata2.push(temp)
    }
  }
  for (var i = minyear; i <= maxyear; ++i) {
    if (sCount1[i] === undefined) {
      curr1 = curr1 + 0
      var temp = {};
      temp.data = Number(i)
      temp.close = Number(curr1)
      linesdata1.push(temp)
    }
    if (sCount1[i] != undefined) {
      curr1 = curr1 + sCount1[i]
      var temp = {};
      temp.data = Number(i)
      temp.close = Number(curr1)
      linesdata1.push(temp)
    }
  }

var city1name =
  d3.select("#coloriscool").append("text")
    .attr("x", 5)
    .attr("y", 20)
    .attr("fill", color1)
    .text(city1)
var city2name =
  d3.select("#coloriscool").append("text")
    .attr("fill", color2)
    .attr("x", 5)
    .attr("y", 40)
    .text(city2)

    var citytool2 =
      d3.select("#coloriscool").append("text")
      .attr("fill", color2)
      .attr("x", 120)
      .attr("y", 40)

      var citytool1 =
        d3.select("#coloriscool").append("text")
        .attr("fill", color1)
        .attr("x", 120)
        .attr("y", 20)




  document.getElementById('slider').addEventListener('input', function(e) {
    var selected = parseInt(e.target.value, 10);
    linesvg.selectAll(".dot").remove();



    var num1 = linesdata1.filter(function(d) {
      return d['data'] === selected;
    })

    var num2 = linesdata2.filter(function(d) {
      return d['data'] === selected;
    })
    citytool1.html((num1[0].close))
    citytool2.html((num2[0].close))



    filterBy(selected);




    linesvg.selectAll(".dot")
      .data(totallines3)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) {
        return x(d.data)
      })
      .attr("cy", function(d) {
        return y(d.close)
      })
      .attr("opacity", function(d) {
        if (d.data === selected)
        {return 1}
        else return 0
        return (d.close == 0) ? 0 : 1
      })
      .style("fill", function(d) {
        if (d.data === selected) {
          return color3
        }
      })

      .attr("r", 8)
  });

  // document.getElementById('station').addEventListener('change', function(e) {
  //   var showstation = document.getElementById("station").checked;
  //
  //   if (showstation == true) {
  //     map1.setLayoutProperty('map1station', 'visibility', 'visible');
  //     map2.setLayoutProperty('map2station', 'visibility', 'visible');
  //   } else if (showstation == false) {
  //     map1.setLayoutProperty('map1station', 'visibility', 'none');
  //     map2.setLayoutProperty('map2station', 'visibility', 'none');
  //   }
  // })

  document.getElementById('station').addEventListener('change', function(e) {
    var showstation = document.getElementById("station").checked;

    if (showstation == true) {
      map1.setLayoutProperty('map1station', 'visibility', 'visible');
      map2.setLayoutProperty('map2station', 'visibility', 'visible');
    } else if (showstation == false) {
      map1.setLayoutProperty('map1station', 'visibility', 'none');
      map2.setLayoutProperty('map2station', 'visibility', 'none');
    }
  })

      var x = d3.scaleLinear().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);



      x.domain([minyear, maxyear]);
      // y.domain([0, d3.max(linesdata2[linesdata2.length -1].close,  linesdata1[linesdata1.length-1].close)]);

      var sumstation2 = Number(linesdata2[linesdata2.length - 1].close)

      var sumstation1 = Number(linesdata1[linesdata1.length - 1].close)
      if (sumstation1 > sumstation2) {
        y.domain([0, sumstation1])
      } else {
        y.domain([0, sumstation2])

      }



      var valueline = d3.line()
        .x(function(d) {
          return x(d.data);
        })
        .y(function(d) {
          return y(d.close);
        });

      linesvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height  + ")")
        .call(d3.axisTop(x).tickFormat(d3.format("d")))

      linesvg.append("g")
        .attr("class", "y axis")
        .call(d3.axisRight(y));

      linesvg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .style("text-anchor", "middle")
        .text("Year");

      linesvg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", - margin.left -3)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Station");


        linesdata1.forEach(function(element){
          element.id = 1;
        })

        linesdata2.forEach(function(element){
          element.id = 2;
        })

      var totallines3 = linesdata1.concat(linesdata2);




      linesvg.append("path")
        .data([linesdata1])
        .attr("fill", "none")
        .attr("stroke", color1)
        .attr("stroke-width", 2)
        .attr("d", valueline);

      linesvg.append("path")
        .data([linesdata2])
        .attr("fill", "none")
        .attr("stroke", color2)
        .attr("stroke-width", 2)
        .attr("d", valueline);

  var w = document.getElementById("right").offsetWidth;

var svg22 = d3.select("#right")

svg22.selectAll("*").remove()

svg22 = d3.select("#right").append("svg")
    .attr("width", w - 30)
    .attr("height", 20*(lines2.length+2));

var legend = svg22.append("g")
    .attr("class", "linename")
    .attr('transform', 'translate(-10,30)')

legend.selectAll('rect')
  .data(lines2)
  .enter()
  .append("rect")
  .attr("x", 10)
  .attr("y", function(d, i){ return (i-1) *  20;})
  .attr("width", 30)
  .attr("height", 5)
  .attr("rx", 3)
  .attr("ry", 3)
  .style("fill", function(d) {
    return d.color;
  })

legend.selectAll('text')
  .data(lines2)
  .enter()
  .append("text")
  .attr("x", 50)
  .attr("width", 5)
  .attr("height", 5)
  .attr("y", function(d, i){ return (i-1) *  20 + 5;})
  .text(function(d) {
    return d.name;
  });


});

};
