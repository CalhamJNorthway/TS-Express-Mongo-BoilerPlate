import { Db, MongoClient } from "mongodb";

export enum Collections {
  users = "user",
  webPage = "pages",
}


export class DbManager {
  private client: MongoClient;
  private db: Db;
  private isConnected: boolean = false;

  public constructor(dbUrl: string) {
    this.client = new MongoClient(dbUrl);
  }

  public async initConnection() {
    try {
      await this.client.connect();

      this.db = this.client.db('TestDB');
      await this.db.command({ ping: 1 });
      this.isConnected = true;
      console.log("Connected Successfully to DB");
    } catch (error) {
      console.error("SOMETHING BAD HAPPENED: ", error);
    }
  }

  public async find(collection: Collections, query: {}) {
    try {
      return await this.db.collection(collection).find(query);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  public async findOne(collection: Collections, query: {}) {
    try {
      return await this.db.collection(collection).findOne(query);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  public async insert(collection: Collections, item: {}) {
    try {
      await this.db.collection(collection).insertOne(item);
      return "Item Successfully Added";
    } catch (error) {
      throw (error);
    }
  }

  public async updateOne(collection: Collections, query: {}, item: {}) {
    try {
      return await this.db.collection(collection).updateOne(query, { $set: item });
    } catch (error) {
      throw (error);
    }
  }

  public getIsConnected(): boolean {
    return this.isConnected;
  }
}