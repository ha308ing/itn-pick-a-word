const clc = require("cli-color");

class Errors {
    errors = [
        {
            message: clc.bold.redBright(
                "Input error: number of inputs must be >=3"
            ),
            code: -501,
            condition: arr => arr.length < 3,
        },
        {
            message: clc.bold.redBright(
                "Input error: number of inputs must be odd"
            ),
            code: -502,
            condition: arr => arr.length % 2 === 0,
        },
        {
            message: clc.bold.redBright(
                "Input error: inputs should not repeat"
            ),
            code: -504,
            condition: arr => arr.length !== new Set(arr).size,
        },
    ];
}

module.exports = new Errors();
