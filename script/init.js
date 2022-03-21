// load country codes and initialise list + amount of listed countries
d3.csv("./data/country_code.csv", (data) => { initDataConst(data); });

// load patent types and initialise list
d3.csv("./data/patent_types.csv", (data) => initPatentTypes(data));

// load all counties at the beginning
window.addEventListener('load', () => {
    d3.queue()
        .defer(d3.json, "data/ne_50m_admin_0_countries_simplified.json")  // World shape
        .defer(d3.json, "data/csv/types/year_country_class_amount.json")// Amount of Patents per Country
        .defer(d3.json, "data/europa_average_lat_lon.json") // Average Position of the Countries (Bubbles)
        .await(ready);
    getCSV("all countries");
    getTypesCSV("all countries", getAllPatentsAmount());
    getTypesCSVPie("all countries", getAllPatentsAmount());
    setTimeout(() => { updateWindow(); updateInfo(); }, 150);
});