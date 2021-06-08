import express, { Router } from "express";
import { ImageController } from "../Controller/ImageController";
import { ClientManager } from "../Service/ClientManager";



export const ImageRouter = (clientManager: ClientManager) => {
  const router = express.Router();
  const path = "/";
  const imageController = ImageController(clientManager);

  router.post(path, (req, res) => imageController.uploadImage(req, res));
  router.get(path, (req, res) => imageController.getClientImages(req, res));

  return { router };
}

