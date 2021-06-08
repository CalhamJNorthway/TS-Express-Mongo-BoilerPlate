import { Request, Response } from "express";
import { ClientManager } from "../Service/ClientManager";

interface IClient { client: string, website: { title: string, pages: any[] } };

export const ClientController = (clientManager: ClientManager) => {

  const addClient = async (req: Request, res: Response) => {

    const client: IClient = req.body;

    try {
      const result = await clientManager.addClient(client);
      res.send({ status: 200, message: result });
    } catch (error) {
      res.send({ status: 500, error });
    }

    res.end();
  }


  return { addClient };
};