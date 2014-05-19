var bomdata = require('./bomdata.json');


var numberEmpty = 0;
var numberSet = 0;

for (var state in bomdata) {

    for (var location in bomdata[state]) {
        // console.log(bomdata[state][location]);
        if (bomdata[state][location].lat === 'exceeded limit' || bomdata[state][location].lat === "not found"){
        	numberEmpty++
        	console.log(numberEmpty);
        } else {
        	numberSet++
        	console.log(numberSet);
        }
    }

}


var percentage = numberSet / (numberSet + numberEmpty);
console.log(percentage.toFixed(3)+"% finished");