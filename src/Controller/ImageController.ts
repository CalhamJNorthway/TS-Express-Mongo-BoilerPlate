import { Request, Response } from "express";
import formidable from "formidable";
import { ClientManager } from "../Service/ClientManager";

export const ImageController = (clientManager: ClientManager) => {

  const uploadImage = async (req: Request, res: Response) => {
    const form = formidable({ multiples: true });
    const query = req.query;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return;
      }

      const images: File[] = files.imageList ? files.imageList as unknown as File[] : null;

      if (images) {
        try {
          const result = await clientManager.addImages(images as any, `${query.client}`, `${query.website}`);

          res.send({ status: 200, message: result });
        } catch (error) {
          res.send({ status: 500, message: error });
        }

      } else {
        console.log("No Image Attached");
        res.send({ status: 404, message: "Invalid Upload Items" });
      }

      res.end();
    });
  }

  const getClientImages = async (req: Request, res: Response) => {
    const client: string = `${req.query.client}`;
    try {
      const result = await clientManager.retrieveImages(client);

      console.log(JSON.stringify(result));
    } catch (error) {
      res.send({ status: 500, error });
    }

    res.end();
  }


  return { uploadImage, getClientImages };
};