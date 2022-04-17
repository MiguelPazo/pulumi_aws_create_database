/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */
import * as aws from "@pulumi/aws";
import * as config from "./config";


new aws.dynamodb.Table(`${config.generalTagName}-users-table`, {
    name: `${config.generalTagName}-users`,
    billingMode: 'PAY_PER_REQUEST',
    attributes: [
        {name: 'code', type: 'S'},
        {name: 'email', type: 'S'},
    ],
    hashKey: 'code',
    rangeKey: 'email',
    serverSideEncryption: config.serverSideEncryption,
    tags: {
        [config.generalTagName]: "shared",
    }
});

new aws.dynamodb.Table(`${config.generalTagName}-payments-table`, {
    name: `${config.generalTagName}-payments`,
    billingMode: 'PAY_PER_REQUEST',
    attributes: [
        {name: 'code', type: 'S'},
        {name: 'email', type: 'S'},
        {name: 'transaction_id', type: 'S'},
        {name: 'transaction_date', type: 'S'},
    ],
    hashKey: 'code',
    rangeKey: 'email',
    globalSecondaryIndexes: [
        {
            name: 'transaction-index',
            hashKey: 'transaction_id',
            rangeKey: 'transaction_date',
            projectionType: 'ALL'
        }
    ],
    serverSideEncryption: config.serverSideEncryption,
    tags: {
        [config.generalTagName]: "shared",
    }
});