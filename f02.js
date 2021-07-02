// name and path of sourse file are not input, now
var fileName = "wr.csv"
const fs = require('fs');
fs.open(fileName, 'rs', (err, fd) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('myfile does not exist');
            return;
        }
        throw err;
    }
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) throw err;
        // dataFileString = data.split("\\r\\n");
        dataFileString = data;
        Arr = dataFileString.replace(/\r\n/g, ',')
        Arr = Arr.split(",");
        fileNewName = "add_"+ fileName; // new name for result file
        newArr = new Array(1);
        newArr[0] = Arr[0]+" / "+Arr[1];
        for (let i=4; i<Arr.length; i = i+3) {
            if (newArr.indexOf(Arr[i]) === -1)
                newArr.push(Arr[i]);
        }
        // no sort for date, now
        let indexEndFistStringNewArr = newArr.length - 1;
        let countColumNewArr = newArr.length;
        let indexnewArr = countColumNewArr; // 8, 16, 24 indexnewArr = indexnewArr + countColumNewArr
        for ( i = 3 ; i <= Arr.length; i = i+3) {
            tmpIndexNewArr = newArr.indexOf(Arr[i]);
            if (  tmpIndexNewArr === -1 ) {
                 newArr[indexnewArr] = Arr[i];
                 tmpIndexNewArr = indexnewArr;
                 indexnewArr = indexnewArr + countColumNewArr;
            }
            for (let j=1 ; j<=(indexEndFistStringNewArr); j = j+1) if ( Arr[i+1] === newArr[j]) newArr[tmpIndexNewArr + j] = Arr[i + 2];
        }
        for ( i = 0 ; i < newArr.length; i++) {
            if ( newArr[i] === undefined) newArr[i] = ' ';
        }
        for (i = indexEndFistStringNewArr; i < newArr.length; i = i+countColumNewArr) {
            newArr[i]=newArr[i]+"\r\n";
        }
        str = newArr.join(',');
        str = str.replace(/\r\n,/g, "\r\n");
        console.log(str);
        fs.writeFile(fileNewName, str, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        })
    })
});
