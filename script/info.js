const infoArr = [
    {
        name: "Chernobyl 1986",
        disasterYear: 1986,
        content: "The Chernobyl disaster was a nuclear accident that occurred on <b>26 April 1986</b> " +
            "at the No. 4 reactor in the Chernobyl Nuclear Power Plant, near the city of Pripyat in the " +
            "north of the Ukrainian SSR in the Soviet Union. It is considered the worst nuclear disaster " +
            "in history both in cost and casualties. " +
            "Click <a class='wiki' href='https://en.wikipedia.org/wiki/Chernobyl_disaster' " +
            "target='_blank'><b>here</b></a> to find out more about this disaster.\n",
        link: 'https://en.wikipedia.org/wiki/Chernobyl_disaster'
    },
    {
        name: "Tsunami 2004",
        disasterYear: 2004,
        content: "The <b>2004</b> Indian Ocean earthquake and tsunami occurred at 07:58:53 local time (UTC+7) " +
            "on <b>26 December</b>, with an epicentre off the west coast of northern Sumatra, Indonesia. It was " +
            "an undersea megathrust earthquake that registered a magnitude of 9.1–9.3 Mw, reaching a Mercalli " +
            "intensity up to IX in certain areas. " +
            "Click <a class='wiki' href='https://en.wikipedia.org/wiki/2004_Indian_Ocean_earthquake_and_tsunami' " +
            "target='_blank'><b>here</b></a> to find out more about this disaster.",
        link: 'https://en.wikipedia.org/wiki/2004_Indian_Ocean_earthquake_and_tsunami'
    },
    {
        name: "Hurricane Katrina 2005",
        disasterYear: 2005,
        content: "Katrina originated on <b>August 23, 2005</b>, as a tropical depression from the merger of a " +
            "tropical wave and the remnants of Tropical Depression Ten. Early the following day, the " +
            "depression intensified into a tropical storm as it headed generally westward toward Florida, " +
            "strengthening into a hurricane two hours before making landfall at Hallandale Beach on August 25. " +
            "Click <a class='wiki' href='https://en.wikipedia.org/wiki/Hurricane_Katrina' " +
            "target='_blank'><b>here</b></a> to find out more about this disaster.",
        link: 'https://en.wikipedia.org/wiki/Hurricane_Katrina'
    },
    {
        name: "Haiti earthquake 2010",
        disasterYear: 2010,
        content: "A catastrophic magnitude 7.0 Mw earthquake struck Haiti at 16:53 local time (21:53 UTC) on " +
            "Tuesday, <b>12 January 2010</b>. The epicenter was near the town of Léogâne, Ouest department, " +
            "approximately 25 kilometres (16 mi) west of Port-au-Prince, Haiti's capital. " +
            "Click <a class='wiki' href='https://en.wikipedia.org/wiki/2010_Haiti_earthquake' " +
            "target='_blank'><b>here</b></a> to find out more about this disaster.",
        link: 'https://en.wikipedia.org/wiki/2010_Haiti_earthquake'
    },
    {
        name: "Fukushima 2011",
        disasterYear: 2011,
        content: "The Fukushima nuclear disaster was a <b>2011</b> nuclear accident at the Fukushima Daiichi " +
            "Nuclear Power Plant in Ōkuma, Fukushima, Japan. The proximate cause of the disaster was the 2011 " +
            "Tōhoku earthquake and tsunami. It was the most severe nuclear accident since the Chernobyl " +
            "disaster in 1986. " +
            "Click <a class='wiki' href='https://en.wikipedia.org/wiki/Fukushima_nuclear_disaster' " +
            "target='_blank'><b>here</b></a> to find out more about this disaster.",
        link: 'https://en.wikipedia.org/wiki/Fukushima_nuclear_disaster'
    }
];

var helpArr = [
    {object: 'lineChart', content: 'This line chart shows the absolute number of patents in the given timeframe.'},
    {object: 'pieChart', content: 'This pie chart shows the distribution of the different patent categories of ' +
            'the selected country. The outer circle displays the distribution for all countries as a reference.'},
    {object: 'patentChart', content: 'Patent categories are:<br>' +
            '<b>A</b>: Human Necessities<br>' +
            '<b>B</b>: Performing Operations, Transporting<br>' +
            '<b>C</b>: Chemistry, Metallurgy<br>' +
            '<b>D</b>: Textiles, Paper<br>' +
            '<b>E</b>: Fixed Contructions<br>' +
            '<b>F</b>: Mechanical Engineering, Lighting, Heating, Weapons, Blasting<br>' +
            '<b>G</b>: Physics<br>' +
            '<b>H</b>: Electricity.'}
];


var updateInfo = function() {
    var disasterName = document.getElementById("dropdown").value
    var information =infoArr.find(d => {return d.name === disasterName})
    document.getElementById("infotext").innerHTML = information.content;
    setSliderValue(information.disasterYear)
}

var helpTooltip = d3.select("#my_dataviz")
    .append("div")
    .attr("class", "help-tooltip")
    .attr('id', 'help-tooltip')


function showHelp(object) {
    var item = document.getElementById('help-tooltip')
    var pos = object.getBoundingClientRect()
    switch (object.id) {
        case 'line-chart-help':
            item.innerHTML = helpArr[0].content;
            item.style.visibility = 'visible';
            item.style.left = parseInt(pos.x) + 30 + 'px';
            item.style.top = parseInt(pos.y) + 40 + 'px';
            break;
        case 'pie-chart-help':
            item.innerHTML = helpArr[1].content;
            item.style.visibility = 'visible';
            item.style.left = parseInt(pos.x) - 290 + 'px';
            item.style.top = parseInt(pos.y) + 40 + 'px';
            break;
        case 'line-chart-patent-help':
            item.innerHTML = helpArr[2].content;
            item.style.visibility = 'visible';
            item.style.left = parseInt(pos.x) + 30 + 'px';
            item.style.top = parseInt(pos.y) + 'px';
            break;
    }
}

function hideHelp() {
    var item = document.getElementById('help-tooltip')
    item.style.visibility = 'hidden';
}