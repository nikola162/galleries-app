import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link  } from "react-router-dom";
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
            <div className="card-container">
            {galleries.map((gallery) => (
        <div
        className="card-box"
          key={gallery.id}
        >
          <p><Link to={`/galleries/${gallery.id}`}><strong>{gallery.title}</strong></Link></p>
          <p>
          <img
                style={{width:"300px",height:"300px"}}
                src={gallery.images.length ? gallery.images[0].Image_Url : ""}
                alt=""/>      
            <strong>Description:</strong> {gallery.descrtiption}    
        </p>
        </div>
      ))}
      </div>

        </div>

    );
}