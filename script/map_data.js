    /* ---------------------------------------------  bubble chart  ---------------------------------------------------- */
    // a list of all patent types {class: String, definition: String}
    let patent_amount_per_year = [];

    // file name of all patent years, counties, types and amount
    const allPatentsPerCountry = "year_country_class_amount";


    // return file name of all patent years, counties, types and amount
    function getAllPatentCountryBubble() { return allPatentsPerCountry; }

    // return path of .csv file for patent types
    function requestTypesCSVBubble (file) { return csvRequestTypes + file + ".csv"; }


    // load all data of all counties and pass to map 
    function getAllPatentCountryYearBubble () {d3.csv(requestTypesCSVBubble(getAllPatentCountryBubble()), (data) => { getDataFromYearPositionBubble(data)});}
    
     //filter data per Year 

    function getDataFromYearPositionBubble (data) {
        
        for (let d of data) { 
            let cd = getDate()
            if (parseInt(d.year, 10) === cd) {  patent_amount_per_year.push( {country: d.country, year: parseInt(d.year), amount: parseInt(d.amount)} ); } }
            pushNewCircles()
            
    
    }