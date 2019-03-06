// from data.js
var tableData = data;

// define the filter button for action
var filterit = d3.select("#filter-btn");

// function to perform the filtering
function newFilter (tobeFiltered, filterKey, filterID) {
    var inputElement = d3.select(filterID);
    var foundErr = false
    // since the usage of this function allows keys that have no values a test for error is required
    try {
        inputElement.property("value");
    }
    // flag the error so the key will not be used as a filter
    catch(err) {
        foundErr = true;
    };
    // if an error was not found then use the value to filter the data   
    if (foundErr === false) {
        var filterValue = inputElement.property("value");
        // if the value is blank we also want to skip filtering the data
        if (filterValue === '') {
            filterValue = 'all';
        }
        // this allow the user to type all or use the default of '' to skip filtering on the specific element.  Apply the filter
        if (filterValue !== 'all') {
            tobeFiltered = tobeFiltered.filter(sighting => sighting[filterKey] === filterValue);
        };
    };
    // return the filtered object
    return tobeFiltered
};

filterit.on("click", function() {
    // prevent the page from refreshing
    d3.event.preventDefault();

    // build the object to be filtered
    var filteredData = data;

    // build a list of the data keys within the filtered data this does assume all objects have the same core keys this also
    // introduced the issue of keys being passed to the newfilter function that are not valid for filters based on the index.html
    // which forced an err check. 
    var dataKeys = Object.keys(filteredData[0]);
    var keyList = []
    // using the dataKeys build a keyList object that stores the htmlkey and htmlid 
    dataKeys.forEach(key => keyList.push({"htmlkey" : key, "htmlid": "#" + key}));

    // using the keyList apply the user selected filters
    keyList.forEach(filter => {
        filteredData = newFilter(filteredData, filter.htmlkey, filter.htmlid);
    });

    // grab the tbody as a d3 object
    var tbody = d3.select("tbody");

    // clear any previous td, tr elements from the table this allows the user to submit there filters multiple times without the 
    // data appending to the bottom of a previous search
    tbody.selectAll("td").remove();
    tbody.selectAll("tr").remove();

    // this section adds the rows and columns to the tbody
    filteredData.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            // Append a cell to the row for each value
            var cell = tbody.append("td");
            cell.text(value);
        });
    });
});