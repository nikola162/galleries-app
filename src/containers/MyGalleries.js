import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { logout, selectActiveUser, selectIsAuthenticated } from "../store/auth";
import GalleryService from "../services/GalleryService";



export default function MyGalleries() {
    
    const [galleries, setGalleries] = useState([]);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const activeUser = useSelector(selectActiveUser);
    useEffect(() => {
        const fetchGallery = async () => {
            if (!activeUser) {
               return ;
            }
            console.log(activeUser);
            const data = await GalleryService.getMyGalleries(activeUser.id);
            console.log('My Gallery', data)
            

            setGalleries(data);
            
        }
        
        fetchGallery();
    }, [activeUser])
    
    console.log(galleries);
    return (
        <div>
            <h2>My Galleries</h2>
            {galleries.map((gallery) => (
                <div key={gallery.id}>
                    <div>
            <strong>Description:</strong> 
            <p>{gallery.descrtiption}</p>

            {gallery.images.length ? <img
                style={{width:"300px",height:"300px"}}
                src={gallery.images.length ? gallery.images[0].Image_Url : "there is no Image"}
              />  : "there is no Image"}
                  {console.log(gallery.images[0].Image_Url)}
            </div>
                
            </div>)
            )}

        </div>

    );
}