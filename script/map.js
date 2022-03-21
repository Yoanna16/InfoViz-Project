// Size

var width = window.innerWidth-20//920*2
var height = window.innerHeight-20//800*2

var last_selected = 'Australia'

var zoomed = false;

var locationVariablies = []
let list_countries = [
    { country: "Austria", amount: 0 },
    { country: "Belgium", amount: 0 },
    { country: "Bulgaria", amount: 0 },
    { country: "Croatia", amount: 0 },
    { country: "Czech Republic", amount: 0 },
    { country: "Denmark", amount: 0 },
    { country: "Estonia", amount: 0 },
    { country: "Finland", amount: 0 },
    { country: "France", amount: 0 },
    { country: "Germany", amount: 0 },
    { country: "Greece", amount: 0 },
    { country: "Hungary", amount: 0 },
    { country: "Iceland", amount: 0 },
    { country: "Ireland", amount: 0 },
    { country: "Italy", amount: 0 },
    { country: "Latvia", amount: 0 },
    { country: "Lithuania", amount: 0 },
    { country: "Luxembourg", amount: 0 },
    { country: "Netherlands", amount: 0 },
    { country: "Norway", amount: 0 },
    { country: "Poland", amount: 0 },
    { country: "Portugal", amount: 0 },
    { country: "Romania", amount: 0 },
    { country: "Russia", amount: 0 },
    { country: "Slovakia", amount: 0 },
    { country: "Slovenia", amount: 0 },
    { country: "Spain", amount: 0 },
    { country: "Sweden", amount: 0 },
    { country: "Switzerland", amount: 0 },
    { country: "United Kingdom", amount: 0 }
];

function updateWindow(){
    width = window.innerWidth-20;
    height= window.innerHeight-20;

    svg.attr("width", width).attr("height", height)
    projection.translate([width/2, height/2])
    
}
window.onresize = updateWindow;



// The svg
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("class", "visual")
    .attr("width", width)
    .attr("height", height)

// Map and projection
var projection = d3.geoMercator()
    .center([5,55])                     // GPS of location to zoom on
    .scale(800)                         // This is like the zoom
    .translate([ width/2, height/2 ])


function zoomIn(country) {
    zoomed = true;
    svg.selectAll('circle').transition()
        .attr('visibility', 'hidden')
        .attr('opacity', '0')
    projection = d3.geoMercator()
        .center([country.longitude, country.latitude])
        .scale(2000)
        .translate([ width/2, height/2 ])
    svg.selectAll('path').transition()
        .duration(750)
        .attr('d', d3.geoPath()
            .projection(projection))

}

function zoomOut() {
    zoomed = false;
    document.getElementById(last_selected).removeAttribute("style");
    projection = d3.geoMercator()
        .center([5, 55])
        .scale(800)
        .translate([ width/2, height/2 ])
    svg.selectAll('path').transition()
        .duration(750)
        .attr('d', d3.geoPath()
            .projection(projection))
    document.getElementById('zoom').style.visibility = 'hidden';
    setTimeout(function() {
        svg.selectAll('circle').transition()
            .attr('visibility', 'visible')
            .attr('opacity', '0.9')
    }, 500);

    getCSV('all countries');
    getTypesCSV('all countries', getAllPatentTypes());
    getTypesCSVPie('all countries', getAllPatentTypes());

}

function getPatentAmount (country) {
    return list_countries.find((element) => { return element.country === country});
}

function resetCountryBubbles () {
    list_countries.forEach((element) => { element.amount = 0; }); }

function setArray (data) {
    data.forEach((element) => {
        for(let l of list_countries) { if (l.country === element.country) { l.amount = element.patent; } }
    });
}

function compare_data(x, y){

    var data_compared = []
    const key_object = Object.keys(x)
    var key_length = Object.keys(y).length
    key_object.forEach((key, index) => {

        var code = key;
        var patents = x[key];
        for(var i = 0; i<key_length; i++) {
            if(y[i].code == code) {
                var longitude = y[i].Longitude
                var latitude = y[i].Latitude
                var country = y[i].Country

            }
        }

        data_compared.push(new object(country, code,  patents, longitude, latitude));
    });

    return data_compared
}

function getDataBubbles (time_slider, xElement, yElement) {

    patent_amount_year= xElement.filter(element => element.year === time_slider)
    // map reduce over the json object to get a {key, value } of (county, amount of patents)
    var data_mapped = patent_amount_year.reduce(function(pv, cv){
        if (pv[cv.country]) {
            pv[cv.country] += cv.amount;
        } else {
            pv[cv.country] = cv.amount;
        }
        return pv;
    }, {});

    // create a new ‚object for the Add circle
    return compare_data(data_mapped, yElement)
}

function object (country, code, patent, longitude, latitude) {
    this.country = country;
    this.code = code;
    this.patent = patent;
    this.longitude = longitude;
    this.latitude = latitude;
}

function radius(d){
    if(d.patent === 0) {return 0}
    if (d.patent <= 100) return Math.sqrt(Math.log(d.patent)*5)
    else if (d.patent <= 1000) return Math.sqrt(Math.log(d.patent)*20);
    else if (d.patent <= 2000) return Math.sqrt(Math.log(d.patent)*40);
    else if (d.patent <= 20000) return Math.sqrt(Math.log(d.patent)*80);
    else return Math.sqrt(Math.log(d.patent)*250)}


function pushNewCircles () {
    resetCountryBubbles();
    data_updated = getDataBubbles(getDate(), patent_amount_per_year, locationVariablies)
    setArray(data_updated)
    rebuild_circle(data_updated)

}

function rebuild_circle(data){

    d3.selectAll("circle").transition()
        .attr("r", function(){
            return radius(data.find(item => {
                return item.country === this.id
            }))
        })


}


function updateCircles() {
    patent_amount_per_year.length = 0;
    getAllPatentCountryYearBubble ()


}

function ready(error, dataGeo, dataPat, locations) {
        /* ---------------------------------------------  bubble chart  ---------------------------------------------------- */
    locations.forEach(element => {locationVariablies.push( {code: element.code, Country: element.Country, Latitude: element.Latitude, Longitude: element.Longitude})})
    let data_sorted = getDataBubbles(getDate(), dataPat, locations)
    setArray(data_sorted)


    //Create a tooltip
    var Tooltip = d3.select("#my_dataviz")
        .append("div")
        .attr("class", "tooltip")

    var mouseover = () => Tooltip.style("visibility", "visible")
    var mousemove = function(d) {
            let amount = getPatentAmount(d.country).amount

            Tooltip
                .html("Country: " + d.country + "<br>" + "Patents: " + amount + "<br>")
                .style("left", (d3.mouse(this)[0]+20) + "px")
                .style("top", (d3.mouse(this)[1]+20) + "px")
        
    }
    var mouseleave = () => Tooltip.style("visibility", "hidden")


    var country_mouseover = function(id) {
        if (country_code.find(list => {return list.country == id})) {
            Tooltip.style("visibility", "visible");
        }

    }

    var country_mouseleave = function(id) {
        Tooltip.style("visibility", "hidden")
    }

    // Moving the mouse when called by the countries leads to an error. Check why d3.mouse(this) is not valid
    var country_mousemove = function(country, shape) {
        Tooltip
            .html("Country:" + country.country + "<br>")
            .style("left", (d3.mouse(shape)[0]+20) + "px")
            .style("top", (d3.mouse(shape)[1]+20) + "px")
    }

    // Colors in a country that has been clicked and stores it as @last_selected.

    var click = function(d) {
        if (d === last_selected && zoomed == true) {
            zoomOut()
        }
        else {
            document.getElementById(last_selected).removeAttribute("style");
            document.getElementById('zoom-country-name').innerHTML = d;
            document.getElementById(d).style.fill = "#599191";
            document.getElementById('zoom').style.visibility = 'visible';
            last_selected = d;
            zoomIn(data_sorted.find(item => {
                return item.country === d
            }))
            shiftUnshiftDataset(d);
            getCSV(d);
            getTypesCSV(d, getAllPatentTypes());
            getTypesCSVPie(d, getAllPatentTypes());
        }
    }


    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(dataGeo.features)
        .enter()
        .append("path")
        // @id is the name of the country
        .attr("id", function(d) {
            return d.properties.geounit})
        // Searches data_sorted and only applies to countries that we have data for.
        .attr("class", function() {
            if (country_code.find(list => {return list.country === this.id})) {
                return "country_projection"
            }})
        .attr("fill", function() {
            if (country_code.find(list => {return list.country == this.id})) {
                return "#04071c"
            } else return "#6d6f7a"
        })
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        // Functionality for mouseover of countries. Needs data from @data_sorted.
        .on("mouseover", function() {country_mouseover(this.id)})
        .on("mousemove", function(){
            for (var i in country_code) {
                if (country_code[i].country == this.id) {
                    return country_mousemove(country_code[i], this)
            }
        }})
        .on("mouseleave", mouseleave)

        .on("click", function() {
            if (country_code.find(list => {return list.country == this.id})) {
                click(this.id)
            }
        })

    // Add circles:
    svg
        .selectAll("myCircles")
        .data(data_sorted)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr('id', function(d) {return d.country})
        .attr("cx", function(d){return projection([d.longitude, d.latitude])[0] })
        .attr("cy", function(d){ return projection([d.longitude, d.latitude])[1] })
        .attr("r", function(d){return radius(d)})
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("click", function(d) {if (country_code.find(list => {return list.country == d.country})) {
            click(d.country)
        }})




}