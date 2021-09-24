import {  useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {  selectActiveUser } from "../store/auth";
import GalleryService from "../services/GalleryService";
import { Link  } from "react-router-dom";




export default function MyGalleries() {
    
    const [galleries, setGalleries] = useState([]);

    const activeUser = useSelector(selectActiveUser);
    useEffect(() => {
        const fetchGallery = async () => {
            if (!activeUser) {
               return ;
            }
            const data = await GalleryService.getMyGalleries(activeUser.id);
            

            setGalleries(data);
            
        }
        
        fetchGallery();
    }, [activeUser])
    
    return (
        <div >
            <h2>My Galleries</h2>
        <div className="card-container">
            
            {galleries.map((gallery) => (
                <div 
                className="card-box"
                key={gallery.id}>
                    
                    <div>
            <Link to={`/galleries/${gallery.id}`}><strong>{gallery.title}</strong></Link>
            <div><strong>Description:</strong> </div>
            <p>{gallery.descrtiption}</p>

            {gallery.images.length ? <img
                style={{width:"300px",height:"300px"}}
                src={gallery.images.length ? gallery.images[0].Image_Url : "there is no Image"}
              />  : "there is no Image"}
            </div>
                
            </div>)
            )}

        </div>
        </div>

    );
}