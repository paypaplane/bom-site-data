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

var percentage = (numberSet / (numberSet + numberEmpty)*100);
console.log(percentage.toFixed(2)+"% full");

// last value = 54.1% full
// last value = 66.7% full
// 77.69% full
//85.73% full
//90%