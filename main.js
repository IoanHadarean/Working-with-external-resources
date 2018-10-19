const baseURL = "https://swapi.co/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type + "/");
    xhr.send();

    // 4 means that it has been completed and we have data and the status of 200 means that it was ok, everything went well and we received data

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];
    
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    
    return `<tr>${tableHeaders}</tr>`;
}


function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";
    getData(type, function(data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
           var dataRow = [];
           
           Object.keys(item).forEach(function(key) {
               var rowData = item[key].toString();
               var truncatedData = rowData.substring(0, 15);
               dataRow.push(`<td>${truncatedData}</td>`);
           });
           tableRows.push(`<tr>${dataRow}</tr>`);
        });
        
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}
