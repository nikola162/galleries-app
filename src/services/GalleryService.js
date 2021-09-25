import HttpService from "./HttpService";


class GalleryService extends HttpService {


     getAll = async (page ,term) => {
         
         let endpoint = `/galleries/?page=${page}`;

         if(term) {
             endpoint += `&term=${term}`
            }

        const { data } = await this.client.get(endpoint);
        
        return data;
        try {
          const { data } = await this.client.get(`/galleries/?page=${page}`);
    
          return data;

          
        } catch (error) {
          console.log(error);
        }
    
        return [];
        
    }

    async getSingleGallery(id) {
        try {
            const { data } = await this.client.get(`/galleries/${id}`);

            return data;
        }catch (error) {
            console.log(error);
        }
        
        return [];
    }

    getMyGalleries = async (id) => {
        try {
            const { data } = await this.client.get(`/myGalleries/${id}`);
            return data;
        }catch(error) {
            console.log(error);
        }
    }

    addNewGallery = async (newGallery) => {
        try {
            const { data } = await this.client.post("/create-galleries",newGallery)

            return data;
        }catch (error) {
            console.log(error);
        }
    }
    edit = async (id, newGallery) => {
        try {
            const { data } = await this.client.put(`/edit-galleries/${id}`,newGallery)
            return data;
        }catch(error){
            console.log(error);
        }
        return null;
    }
    deleteGallery = async (gallery) => {
        try {
            const { data } = await this.client.delete(`/galleries/${gallery}`)

            return { data }
        }catch (error) {

        }
    }

    addNewComment = async (newComment, galleryId) => {
        try {
            const { data } = await this.client.post(`/galleries/${galleryId}/comments`,newComment)
            return data;
        }catch (error) {
            console.log(error);
        }
    }
    deleteComment = async (deletedComment) => {
        try {
            const { data } = await this.client.delete(`/comments/${deletedComment}`)

            return data;
        }catch (error){

        }
    }
    
}



export default new GalleryService ();