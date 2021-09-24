import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory  } from "react-router-dom";
import GalleryService from "../services/GalleryService";


export default function AppGalleries() 
{
    const [galleries, setGalleries] = useState([]);
    const history = useHistory();

    const[totalPage, setTotalPages] = useState(1);
    const[page, setPage] =useState(1);
    const[loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchGalleries = async () => {
          setLoading(true);
          const data = await GalleryService.getAll(page);
          setTotalPages(data.last_page);
          setGalleries([...galleries,...data.data]);
          setLoading(false);
          //setGalleries(data);
        };
        fetchGalleries();
      }, [page]);
    return (
      <div>
        <div className="card-container">
      
      {galleries.map((gallery) => (
        <div
        className="card-box"
          key={gallery.id}
        >
          <p><Link to={`/galleries/${gallery.id}`}><strong>{gallery.title}</strong></Link></p>
          <p><Link to={`/authors/${gallery.user.id}`}><strong>Author :{gallery.user.first_name}</strong></Link></p>
          <p>
          <img
                style={{width:"300px",height:"300px"}}
                src={gallery.images.length ? gallery.images[0].Image_Url : ""}
              />      
            <strong>Description:</strong> {gallery.descrtiption}
              
        </p>
          
        </div>
      ))}
      
    </div>
    {totalPage !== page && (
        <button className="pagination-btn" onClick={() => setPage(page + 1)}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
    
    )
}