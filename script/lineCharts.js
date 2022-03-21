// 11 years that will be displayed on x-axis; both line charts
let chartLabel = [];
function getLabel () { return chartLabel; }

// array of all possible years
const years = [
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
    2010, 2011, 2012, 2013, 2014 ];
function getYears () { return years; }

// sets label of line charts
function setLabel (year) { for (let i = 5; i >= -5; i--) { chartLabel.unshift(year + i); } }

// initialise current chart label to display depending on selected date
function setChartLabel (date) {
    switch (date) {
        case 1980:
        case 1981:
        case 1982:
        case 1983:
        case 1984:
            setLabel(1985); break;
        case 2010:
        case 2011:
        case 2012:
        case 2013:
        case 2014:
            setLabel(2009); break;
        default:
            setLabel(date); } }

// returns the distance between min and max year
function setSpace (date) {
    if (date < 1985) { return (1985 - date) }
    if (date > 2009) { return (2009 - date) }
    return 0; }

// update chart label; both line charts
function updateChartLabel (date, space) {
    for (let i = 0; i <= 10; i++) { chartLabel[i] = date - 5 + i + space; } }

// resets chart label
function resetDataLineCharts () {
    chartLabel.length = 0;
    return true; }