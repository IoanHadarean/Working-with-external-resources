var xhr = new XMLHttpRequest();

console.log(xhr.readyState);
var data;

xhr.open("GET", "https://swapi.co/api/");
console.log(xhr.readyState);
xhr.send();

// deserialising the data using setData
function setData(jsonData) {
    data = jsonData;
}

console.log(xhr.readyState);
// 4 means that it has been completed and we have data and 
// the status of 200 means 
// that it was ok, everything went well and we received data
xhr.onreadystatechange = function() {
    console.log(this.readyState);
    if(this.readyState == 4 && this.status == 200) {
        setData(JSON.parse(this.responseText));
    }
};


// pause up the execution of the code for a predetermined amount of time
setTimeout(function() {
    console.log('haha', data);
}, 5000);




//print data using callback function

/*function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://swapi.co/api/");
    xhr.send();
 
    // 4 means that it has been completed and we have data and the status of 200 means that it was ok, everything went well and we received data

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function printDataToConsole(data) {
    console.log(data);
}*/