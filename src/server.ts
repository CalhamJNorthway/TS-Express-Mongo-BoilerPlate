import express from "express";
import bodyParser from "body-parser";
import { DbManager } from "./Service/dbManager";
import { ClientManager } from "./Service/ClientManager";
import { ImageRouter, ClientRouter } from "./Router";
import { S3, S3Client } from "@aws-sdk/client-s3";

const fs = require('fs');


export const Server = async () => {

  const app = express();
  const port = 8080; // default port to listen
  const dbUri = "mongodb://127.0.0.1:27017/";

  // Init Connection To MongoDB
  const dbManager = new DbManager(dbUri);
  await dbManager.initConnection();

  // Create Managers
  const clientManager: ClientManager = new ClientManager(dbManager);

  // Routers
  const imageRouter = ImageRouter(clientManager).router;
  const clientRouter = ClientRouter(clientManager).router;

  // Setup Middle Wear
  app.use(bodyParser.json());

  // Setup App Routes
  app.use('/api/image', imageRouter);
  app.use('/api/client', clientRouter);

  // start the express server
  app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
  });

}