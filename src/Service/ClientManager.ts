import { Collections, DbManager } from "./dbManager";


export class ClientManager {
  private dbManager: DbManager;

  public constructor(dbManager: DbManager) {
    this.dbManager = dbManager;
  }

  public async addClient(client: {}) {
    try {
      await this.dbManager.insert(Collections.webPage, client)
      return "Client Upload Success";
    } catch (error) {
      throw new Error("Client Upload Error");
    }
  }

  public async addImages(images: File[], client: string, websiteTitle: string) {

    try {
      await this.dbManager.updateOne(Collections.webPage, { client }, {
        website: {
          title: websiteTitle,
          images
        }
      });

      return "Image Upload Success";
    } catch (error) {
      throw new Error("Image Upload Error");
    }
  }

  public async retrieveImages(client: string) {
    try {
      return await this.dbManager.findOne(Collections.webPage, { client });
    } catch (error) {
      throw new Error("Could not find that client");
    }
  }
}