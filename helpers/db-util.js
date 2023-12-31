import { MongoClient } from 'mongodb';
import 'dotenv/config';

export async function connectDatabase() {
  const uri = `mongodb+srv://ryaniguchi1:${process.env.MONGODB_PASSWORD}@cluster0.ipifet7.mongodb.net/events?retryWrites=true&w=majority`;
  return await MongoClient.connect(uri);
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function findDocuments(client, collection, filter = {}, sort) {
  const db = client.db();
  return await db.collection(collection).find(filter).sort(sort).toArray();
}
