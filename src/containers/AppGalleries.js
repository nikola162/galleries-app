import React, { useState } from "react";
import { useEffect } from "react";
import { Link  } from "react-router-dom";
import GalleryService from "../services/GalleryService";


export default function AppGalleries() 
{
    const[galleries, setGalleries] = useState([]);
    const[page, setPage] =useState(1);
    const[totalPage, setTotalPages] = useState();

    const[loading, setLoading] = useState(false);

    console.log(page);
    
    useEffect(() => {
        const fetchGalleries = async () => {
          setLoading(true);
          const data = await GalleryService.getAll(page);
          console.log(data);
          setTotalPages(data.last_page);
          setGalleries([...galleries,...data.data]);
          setLoading(false);
          //setGalleries(data);
        };
        fetchGalleries();
      }, [page]);

      const loadMore = (e) => {
        e.preventDefault();
    
      }
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
                alt=""/>      
            <strong>Description:</strong> {gallery.descrtiption}
              
        </p>
          
        </div>
      ))}
      
    </div>
    {totalPage !== page && (
        <button className="pagination-btn" onClick={() => setPage((page + 1))}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
    
    )
}