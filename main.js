function getData(url, cb) {
    let xhr = new XMLHttpRequest();

    // 4 means that it has been completed and we have data and the status of 200 means that it was ok, everything went well and we received data

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();

}

function getTableHeaders(obj) {
    let tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}


function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    }
    else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    }
    else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    let tableRows = [];
    let element = document.getElementById("data");

    getData(url, function(data) {
        console.log(data);
        let pagination = "";
        
        //generates the html for the pagination 
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        
        //getting the table headers for the first element
        let d = data.results;
        let tableHeaders = getTableHeaders(d[0]);

        d.forEach(function(item) {
           let dataRow = [];

            Object.keys(item).forEach(function(key) {
                let rowData = item[key].toString();
                let truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        element.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}
