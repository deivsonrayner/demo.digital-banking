'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

var app = express();
var contract = null;



async function loadFabricCliendSDK(identityName, channelName, smartContract) {
    try {

        // Parse the connection profile. This would be the path to the file downloaded
        // from the IBM Blockchain Platform operational console.
        const ccpPath = path.resolve(__dirname, 'connection-profile.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Configure a wallet. This wallet must already be primed with an identity that
        // the application can use to interact with the peer node.
        const walletPath = path.resolve(__dirname, 'wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Create a new gateway, and connect to the gateway peer node(s). The identity
        // specified must already exist in the specified wallet.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: false } });

        // Get the network channel that the smart contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the smart contract from the network channel.
        contract = network.getContract(smartContract);

    } catch (error) {
        console.error(`Failed Loading Fabric Cliend SDK: ${error}`);
        process.exit(1);
    }
}


loadFabricCliendSDK('sfd-app-teste', 'channel-test', 'sfd-smartcontract');

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.post('/api/digital-wallet/account/credit', async function (req, res) {

    const account = req.body.account;
    const amount  = req.body.amount;


    try {
        const result =  await contract.submitTransaction('creditAccount', account, amount);
        console.log(`Transaction has been submitted: RESULT: ${result.toString()}`);
        res.status(200).send(result.toString());
    } catch (error) {
        res.status(500).send(error);
    }

});

app.post('/api/digital-wallet/account/debit', async function (req, res) {
    const account = req.body.account;
    const amount  = req.body.amount;


    try {
        const result =  await contract.submitTransaction('debitAccount', account, amount);
        console.log(`Transaction has been submitted: RESULT: ${result.toString()}`);
        res.status(200).send(result.toString());
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/digital-wallet/account/:number', async function (req, res) {
    const account = req.params.number;


    try {
        const result =  await contract.submitTransaction('queryAccount', account);
        console.log(`Transaction has been submitted: RESULT: ${result.toString()}`);
        res.status(200).send(result.toString());
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/api/digital-wallet/create', async function (req, res) {
    const account = req.body.account;
    const cpf     = req.body.cpf;


    try {
        const result =  await contract.submitTransaction('createAccount', account, cpf);
        console.log(`Transaction has been submitted: RESULT: ${result.toString()}`);
        res.status(200).send(result.toString());
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get('/health', async  function (req, res) {
    res.status(200).send({'status': 'UP'});
});

module.exports = app;
