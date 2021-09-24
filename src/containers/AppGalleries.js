import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory  } from "react-router-dom";
import GalleryService from "../services/GalleryService";


export default function AppGalleries() 
{
    const [galleries, setGalleries] = useState([]);
    const history = useHistory();




    useEffect(() => {
        const fetchGalleries = async () => {
          const data = await GalleryService.getAll();
    
          setGalleries(data);
          console.log(data);
        };
        fetchGalleries();
      }, []);
      console.log(galleries);
    return (
        <div>
      <h2>All galleris</h2>
      {galleries.map((gallery) => (
        <div
          key={gallery.id}
        >
          <p>
          <Link to={`/galleries/${gallery.id}`}><strong>{gallery.title}</strong></Link>
          <Link to={`/authors/${gallery.user.id}`}><strong>{gallery.user.first_name}</strong></Link>
          </p>
          <p>
            <strong>Description:</strong> {gallery.descrtiption}
            <img
                style={{width:"300px",height:"300px"}}
                src={gallery.images.length ? gallery.images[0].Image_Url : ""}
              />         
        </p>
          
        </div>
      ))}
    </div>
    )
}