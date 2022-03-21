// slider values
const slider = document.getElementById("myRange");
const output = document.getElementById("rangeLabel");

// event listener -> update data on release
slider.addEventListener("change", updateLabel)

// display the default slider value
output.innerHTML = slider.value;

// update the current slider value (each time you drag the slider handle)
slider.oninput = () => output.innerHTML = slider.value;

// return current date
function getDate () { return parseInt(slider.value, 10); }

// update pie & line charts with current date + data must be updated too
function updateLabel () {
    updateData( getDate() );
    updatePatentTypes( getDate() );
    updatePieChartData();
    updateCircles();
}


// updates current date with -10, -1, +1, +10 buttons; new date is being checked whether it is >= 1980 & <= 2014
function addSliderValue (input) {
    slider.value = getDate() + checkInput(input);
    output.innerHTML = slider.value
    updateLabel();
}

// sets slider value & current date at disaster selection
function setSliderValue (input) {
    slider.value = input;
    output.innerHTML = slider.value;
    updateLabel()
}

// checks whether an increase is possible and returns the (max) value that the year can be increased with
function checkInput (value) {
    if (value === 10 || value === -10) {
        if (getDate() + value < 1980) { return (1980 - getDate()) }
        if (getDate() + value > 2014) { return (2014 - getDate()) }
        return value;
    }
    else {
        if (getDate() + value > 1979 && getDate() + value < 2015) { return value; }
        return 0;
    }
}