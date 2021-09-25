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
    const[term, setTerm] = useState("");


    console.log(page);
    
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
      
      const handleSearch = async (term) => {
        setPage(1);
        console.log(term);
        setLoading(true);
        const data = await GalleryService.getAll(page, term);
        setTotalPages(data.last_page)
        setGalleries(data.data);
        console.log(data);

        setLoading(false);
      }

      const loadMore = (e) => {
        e.preventDefault();
    
      }

      const handleChangeSearchTerm = (e) => {
        e.preventDefault();
        setTerm(e.target.value);
      }
    return (
      <div>
        <div>
        <input
          type="text"
          onChange={handleChangeSearchTerm}
          placeholder="Search tearm"
        />
        <button onClick={ () => handleSearch(term)} className="btn btn-primary">Search</button>
    </div>


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