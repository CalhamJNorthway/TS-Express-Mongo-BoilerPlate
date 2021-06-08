import express, { Router } from "express";
import { ClientController } from "../Controller/ClientController";
import { ClientManager } from "../Service/ClientManager";



export const ClientRouter = (clientManager: ClientManager) => {
  const router = express.Router();
  const path = "/";
  const clientController = ClientController(clientManager);

  router.post(path, (req, res) => clientController.addClient(req, res));

  return { router };
}

