const fs = require('fs');
const path = require('path');
const solc = require('solc');

// console.log(__dirname)
const contractPath = path.resolve(__dirname, '../contracts',"Car.sol");
const contractSource = fs.readFileSync(contractPath,'utf-8')

var input = {
    language: 'Solidity',
    sources: {
        'Car.sol' : {
            content: contractSource
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

const result = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(result.contracts['Car.sol']['Car']);

module.exports = result.contracts['Car.sol']['Car'];