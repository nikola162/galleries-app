import HttpService from "./HttpService";


class GalleryService extends HttpService {


    async getAll() {
        try {
          const { data } = await this.client.get('galleries');
    
          return data;
        } catch (error) {
          console.log(error);
        }
    
        return [];
    }
}



export default new GalleryService ();