import { useState, useEffect } from "react";
import { useParams } from "react-router";
import GalleryService from "../services/GalleryService";



export default function ViewAuthorGalleries() {
    
    const [galleries, setGalleries] = useState([
    ]);
    const { id } = useParams()

    useEffect(() => {
        const fetchGallery = async () => {
            
            const data = await GalleryService.getMyGalleries(id);
            

            setGalleries(data);
            
        }
        
        fetchGallery();
    }, [id])
    
    return (
        <div>
            <h2>author galleries</h2>
            {galleries.map((gallery) => (
                <div key={gallery.id}>
                    <div>
            <strong>Description:</strong> 
            <p>{gallery.descrtiption}</p>
            <p>{gallery.user_id}</p>

            {gallery.images.length ? <img
                style={{width:"300px",height:"300px"}}
                src={gallery.images.length ? gallery.images[0].Image_Url : "there is no Image"}
              />  : "there is no Image"}
            </div>
                
            </div>)
            )}

        </div>

    );
}