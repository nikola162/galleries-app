import {  useSelector } from "react-redux";
import { useState , useEffect } from "react";
import {  selectActiveUser } from "../store/auth";
import { useHistory, useParams } from 'react-router-dom';
import GalleryService from "../services/GalleryService";





export default function CreateGallery () {

    const [newGallery, setNewGallery] = useState([]);
    const history = useHistory();
    const activeUser = useSelector(selectActiveUser);
    const { id } = useParams();


   

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = null;
        if (!activeUser) {
            return ;
         }
        setNewGallery({ ...newGallery, user_id: activeUser.id })



        if (id) {
            data = await GalleryService.edit(id, newGallery);
          } else {
            data = await GalleryService.addNewGallery(newGallery);
          }
      
          if (!data) {
            alert('New gallery hasnt been created');
            return;
          }
      
          history.push('/my-galleries');
    };
    
    
    useEffect(() => {
      const fetchGallery = async () => {
          const { id: _, createdAt, ...restData } = await GalleryService.getSingleGallery(id);
          if (!restData.images[0]){
            setNewGallery({...restData,Image_Url:''})
          }
          if (restData.images[0]){
            setNewGallery({...restData,Image_Url:restData.images[0].Image_Url})
          }
      };
        
      if (id) {
        fetchGallery();
      }
    }, [id]);



    return (
        <div>
             <h2>{id ? 'Edit' : 'Add new'} </h2>
      <form
         className="login-form"
        onSubmit={handleSubmit}
      >
        <input
          required
          minLength={2}
          value={newGallery.title}
          placeholder='Title'
          onChange={({ target }) =>
          setNewGallery({ ...newGallery, title: target.value })
          }
        />
        <input
          required
          maxLength={1000}
          value={newGallery.descrtiption}
          placeholder='descrtiption'
          onChange={({ target }) =>
          setNewGallery({ ...newGallery, descrtiption: target.value,  })
          }
        />
        <input
          required
          maxLength={255}
          value={newGallery.Image_Url}
          placeholder='images'
          onChange={({ target }) =>
          setNewGallery({ ...newGallery, Image_Url: target.value,  })
          }
        />
        
        
        <button>{id ? 'Edit' : 'Add'}</button>
        
      </form>
      
      
        </div>
    );
}