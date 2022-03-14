import { Mongo } from 'meteor/mongo';

export interface Result {
  _id?: string;
  value: string;
  createdAt: Date;
}

export const ResultCollection = new Mongo.Collection<Result>('result');
