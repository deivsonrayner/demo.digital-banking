/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname,  process.argv[2]);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);


// <connection_profile> <enrroID> <Secret> <OrgID>
async function main() {
    try {
        //console.log(JSON.stringify(ccp.certificateAuthorities['169.46.139.174:31263']));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['169.46.139.174:31263'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const userExists = await wallet.exists(process.argv[3]);
        if (userExists) {
            console.log('An identity  already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: process.argv[3], enrollmentSecret: process.argv[4] });
        const identity = X509WalletMixin.createIdentity(process.argv[5], enrollment.certificate, enrollment.key.toBytes());
        await wallet.import(process.argv[3], identity);
        console.log('Successfully enrolled client and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to enroll : ${error}`);
        process.exit(1);
    }
}

main();
