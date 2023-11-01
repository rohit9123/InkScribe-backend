import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { config } from './config';
import exp from 'constants';

const { TABLE_NAME, REGION } = config;

export class DynamoDBClient { 
    return new AWS.DynamoDB.DocumentClient({
        region: REGION,
        endpoint
    })
}