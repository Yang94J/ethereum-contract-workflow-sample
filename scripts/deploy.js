const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
require('dotenv').config()

const infuraUrl = process.env.infuraUrl;
const privateKey = process.env.privateKey;

const provider  = new HDWalletProvider(privateKey,infuraUrl);
console.log(provider);

const web3 = new Web3(provider);

const compileResult = require("./compile");
const abi = compileResult.abi;
const bytecode = compileResult.evm.bytecode.object;

// console.log(abi);
// console.log(bytecode);


async function deploy(){
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    console.log("deploying using "+ accounts[0]);
    console.time("deploy")
    const contract = await new web3.eth.Contract(abi)
        .deploy({
            data : bytecode,
            arguments: ['Audi']
        })
        .send({
            from : accounts[0],
            gas : 1000000
        });
    console.timeEnd("deploy")
    console.log("deploy success : "+ contract.options.address);
    provider.engine.stop();

}

deploy();

