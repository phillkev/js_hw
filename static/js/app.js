// from data.js
var tableData = data;

// define the filter button for action
var filterit = d3.select("#filter-btn");

// function to perform the filtering
function newFilter (tobeFiltered, filterKey, filterID) {
    var inputElement = d3.select(filterID);
    var foundErr = false
    // since the usage of this function allows keys that have no values (NULL) so we test for the error 
    try {
        inputElement.property("value");
    }
    // if the error is found flag it so the key will not be used as a filter
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
    // the code generated from the examples provided in class did not allow the data elements to inherit the alternating colors defined by the 
    // .table-striped>tbody>tr:nth-of-type(odd) css style
    // the code inserted into the DOM is <tr></tr><td>value</td>

//     filteredData.forEach(sighting => {
//     tbody.append("tr")
//         Object.entries(sighting).forEach(([key, value]) => {
//             var cell = tbody.append("td");
//             cell.text(value);
//         });
//     });
// });


// this solution uses jscripting instead of d3.  It works as desired but it does require more knowledge of jscripting that was not explained in class

    filteredData.forEach(sighting => {
        var newRow = document.createElement('tr');
        Object.entries(sighting).forEach(([key, value]) => {
            var td = document.createElement('td');
            td.innerHTML = value;
            newRow.appendChild(td);
        });
        tbody.node().appendChild(newRow)
    });
});