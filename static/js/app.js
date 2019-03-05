// from data.js
var tableData = data;

// YOUR CODE HERE!

var filterit = d3.select("#filter-btn");

function newFilter (tobeFiltered, filterKey, filterID) {
    var inputElement = d3.select(filterID);
    var filterValue = inputElement.property("value");
    if (filterValue === '') {
        filterValue = 'all';
    }
    if (filterValue !== 'all') {
        tobeFiltered = tobeFiltered.filter(sighting => sighting[filterKey] === filterValue);
    };
    return tobeFiltered
};

filterit.on("click", function() {

    d3.event.preventDefault();
    var filteredData = data;


    filteredData = newFilter(filteredData, "datetime", "#datetime");
    filteredData = newFilter(filteredData, "city", "#city");
    filteredData = newFilter(filteredData, "state", "#state");
    filteredData = newFilter(filteredData, "country", "#country");
    filteredData = newFilter(filteredData, "shape", "#shape");

    var tbody = d3.select("tbody");

    // clear any previous elements from the table
    tbody.selectAll("td").remove();
    tbody.selectAll("tr").remove();

    filteredData.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            // Append a cell to the row for each value
            var cell = tbody.append("td");
            cell.text(value);
        });
    });
});