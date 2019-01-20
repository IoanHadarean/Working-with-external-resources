// function getData(url, cb) {
//     let xhr = new XMLHttpRequest();

//     // 4 means that it has been completed and we have data and the status of 200 means that it was ok, everything went well and we received data

//     xhr.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             cb(JSON.parse(this.responseText));
//         }
//     };

//     xhr.open("GET", url);
//     xhr.send();

// }

// function getTableHeaders(obj) {
//     let tableHeaders = [];

//     Object.keys(obj).forEach(function(key) {
//         tableHeaders.push(`<td>${key}</td>`);
//     });

//     return `<tr>${tableHeaders}</tr>`;
// }


// function generatePaginationButtons(next, prev) {
//     if (next && prev) {
//         return `<button onclick="writeToDocument('${prev}')">Previous</button>
//                 <button onclick="writeToDocument('${next}')">Next</button>`;
//     }
//     else if (next && !prev) {
//         return `<button onclick="writeToDocument('${next}')">Next</button>`;
//     }
//     else if (!next && prev) {
//         return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
//     }
// }

// function writeToDocument(url) {
//     let tableRows = [];
//     let element = document.getElementById("data");

//     getData(url, function(data) {
//         console.log(data);
//         let pagination = "";

//         //generates the html for the pagination 
//         if (data.next || data.previous) {
//             pagination = generatePaginationButtons(data.next, data.previous);
//         }

//         //getting the table headers for the first element
//         let d = data.results;
//         let tableHeaders = getTableHeaders(d[0]);

//         d.forEach(function(item) {
//           let dataRow = [];

//             Object.keys(item).forEach(function(key) {
//                 let rowData = item[key].toString();
//                 let truncatedData = rowData.substring(0, 15);
//                 dataRow.push(`<td>${truncatedData}</td>`);
//             });
//             tableRows.push(`<tr>${dataRow}</tr>`);
//         });

//         element.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
//     });
// }

const baseUrl = "https://swapi.co/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseUrl + type + "/");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //callback function with data as an argument
            cb(JSON.parse(this.responseText));
        }
    };
}

function getTableHeaders(obj) {
    let tableHeaders = [];
    // for each key in the obj, push the table cell containing key to 
    // tableHeaders array
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    //returns a row of all the keys in the obj
    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    getData(type, function(data) {
        // sets an empty array so we can push each individual tableRow
        // containing the data for each object of the same type into tableRows
        var tableRows = [];
        var el = document.getElementById("data");
        // setting el to an empty string so that each time the function
        // is called for a different type, the information does not append to
        // the end of the variable
        el.innerHTML = "";
        // overwrite data in order to return the results
        data = data.results;
        // pass through the first element of the objects array
        let tableHeaders = getTableHeaders(data[0]);
        // iterates through each object 
        data.forEach(function(item) {
            // sets an empty array for each row
            var dataRow = [];
            //iterates through the keys of each objects and pushes the values
            //into table row
            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            // pushes each row into tableRows array
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        //sets the inner HTML to the tableHeaders variable
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}