const path = require('path');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const compileResult = require("../scripts/compile");

const web3 = new Web3(ganache.provider());

let accounts;
let contract;
const initBrand = "audi";

describe('contract', ()=>{
    beforeEach(async ()=>{
        accounts = await web3.eth.getAccounts();
        account = accounts[0];
        console.log("account for test : "+account);
        const abi = compileResult.abi;
        const bytecode = compileResult.evm.bytecode.object;
        contract = await new web3.eth.Contract(abi)
        .deploy({
            data : bytecode,
            arguments: [initBrand]
        })
        .send({
            from : accounts[0],
            gas : 1000000
        });
    });

    it("deploy", ()=>{
        assert.ok(contract.options.address);
    });

    it("getBrand",async ()=>{
        const brand = await contract.methods.brand().call();
        assert.equal(brand,initBrand);
    });

    it("changeBrand",async ()=>{
        const newBrand = "bm";
        await contract.methods.setBrand(newBrand).send({from: accounts[0]});
        assert.equal(newBrand,await contract.methods.brand().call());
    });
});


