var faw = document.getElementById("container");
var input_div = document.getElementById("input");
var output_div = document.getElementById("output");
var input_table_body = document.getElementById("input-table-body");
var output_table_body = document.getElementById("output-table-body");
function getOutput() {
    var input = document.getElementById("input-arr").value;
    let inputArr = input.trim().split(",").map(Number);
    input_div.innerHTML = `<h4>Input</h4> <p> ${JSON.stringify(inputArr)}  </p>`;
    let outputArr = waterHoldingArray(inputArr);
    createTable(inputArr, outputArr[0], 'input');
    output_div.innerHTML = `<h4>Output</h4> <p> ${outputArr[1]} units of water </p>`;
    createTable(inputArr, outputArr[0], 'output');
}


function createTable(arr, outputArr, flag) {
    if (flag === 'output') {
        output_table_body.innerHTML = null;
    } else if (flag === 'input') {
        input_table_body.innerHTML = null;

    }

    let matrix = [];
    const yAxis = Math.max(...arr) + 1;
    const xAxis = arr.length;

    for (let i = 0; i < yAxis; i++) {
        let tempArr = [];
        let row = document.createElement('tr');
        for (let j = 0; j < xAxis; j++) {
            if (i > (yAxis - 1) - arr[j]) {
                let column = document.createElement('td');
                if (flag === 'input') {
                    column.className = 'block';
                }
                row.append(column);

                tempArr.push(`${i}${j}`);
            } else if (outputArr[j] !== 0 && i > (yAxis - 1) - (arr[j] + outputArr[j])) {
                let column = document.createElement('td');
                column.className = 'water';
                row.append(column);

            }
            else {
                let column = document.createElement('td');
                // column.className = 'block';
                row.append(column);

                tempArr.push(0)
            };
        }
        if (flag === 'output') {
            output_table_body.append(row);
        } else if (flag === 'input') {
            input_table_body.append(row);
        }
        matrix.push(tempArr);
    }

    console.log(matrix)
}

function waterHoldingArray(arr) {
    let n = arr.length;
    let leftArr = new Array(n);
    let rightArr = new Array(n);
    let answerArr = new Array(n);
    let answer = 0;
    leftArr[0] = arr[0];
    for (let i = 1; i < n; i++) {
        leftArr[i] = Math.max(leftArr[i - 1], arr[i]);
    }

    rightArr[n - 1] = arr[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightArr[i] = Math.max(rightArr[i + 1], arr[i]);
    }

    for (let i = 0; i < n; i++) {
        answerArr[i] = Math.min(leftArr[i], rightArr[i]) - arr[i];
        answer += answerArr[i];
    }

    return [answerArr, answer];
}