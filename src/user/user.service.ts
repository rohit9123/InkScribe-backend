import * as dotenv from 'dotenv';
dotenv.config();

import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';




@Injectable()
export class UserService {
    private readonly dynamoDBClient: DynamoDB.DocumentClient;
    constructor() { 
        this.dynamoDBClient = new DynamoDB.DocumentClient({
            region: 'us-east-1',
            apiVersion: '2023-08-10',
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        });
    }

    async createUser(user: UserDto): Promise<any> {
        const { name, email, password } = user;
        if (!password) {
            throw new Error('Password is required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const params = {
            TableName: 'Users',
            Item: {
                id: uuidv4(),
                name,
                email,
                password: hashedPassword,
                Followers: [String],
                Following: [String],
                Posts: [String],
                Likes: [String],
                createdAt: new Date().toISOString(),
                modifiedAt: new Date().toISOString()
            }
        };
        try {
            await this.dynamoDBClient.put(params).promise();
            const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            return {
                token,
                name: name,
                email: email,
                id: params.Item.id
            };
        } catch (error) {
            throw new Error(error);
        }

    }
    async signIn(user: UserDto): Promise<any> { 
        const { email, password } = user;
        console.log(email, password);
        const params = {
            TableName: 'Users',
            Key: {
                email,
            }
        };
        try {
            const user = await this.dynamoDBClient.get(params).promise();
            if (!user.Item) {
                throw new Error('User not found');
            }
            const isValid = await bcrypt.compare(password, user.Item.password);
            if (!isValid) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            return {
                token,
                name: user.Item.name,
                email: user.Item.email,
                _id: user.Item._id
            };
        } catch (error) {
            throw new Error(error);
        }
    }
    
}
