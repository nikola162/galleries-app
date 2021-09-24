import { useParams } from "react-router";
import { useState, useEffect } from "react";
import GalleryService from "../services/GalleryService";

function ViewSingleGallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    const fetchGallery = async () => {
      const data = await GalleryService.getSingleGallery(id);
      console.log('ViewGallery', data)
      setGallery(data);
    }

    fetchGallery();
  }, [id])

  

  return (
    <div>
      <h3>{gallery.title}</h3>
      <p>{gallery.descrtiption}</p>
      {gallery.images || gallery.user ?
      <div>
          {gallery.images.map((image) => (
              <div 
              key={image.id}
              >
                  <a target="_blank" href={image.Image_Url}><img src={image.Image_Url} /></a> 
                  
              </div>
          ))}
      </div>
      : "No image"
      }
    </div>
  )
}

export default ViewSingleGallery;