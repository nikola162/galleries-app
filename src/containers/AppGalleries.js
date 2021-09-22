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
        };
        fetchGalleries();
      }, []);
    return (
        <div>
      <h2>My galleris</h2>
      {galleries.map((gallery) => (
        <div
          key={gallery.id}
          style={{
            border: '3px solid orange',
            width: 300,
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p>
            <strong>Title:</strong> {gallery.title}
          </p>
          <p>
            <strong>Text:</strong> {gallery.text}
          </p>
          <Link to={`/galleries/${gallery.id}`}>View post</Link>
          <button onClick={() => history.push(`/edit/${gallery.id}`)}>Edit</button>
          
        </div>
      ))}
    </div>
    )
}