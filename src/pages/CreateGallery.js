import { useDispatch, useSelector } from "react-redux";
import GalleryService from "../services/GalleryService";
import { useState , useEffect } from "react";
import {  selectActiveUser } from "../store/auth";
import { useHistory, useParams } from 'react-router-dom';





export default function CreateGallery () {

    const [newGallery, setNewGallery] = useState([]);
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = null;

        data = await GalleryService.add(newGallery);

        history.push('/galleries');
    }




    return (
        <div>
             <h2>{id ? 'Edit' : 'Add new'} </h2>
      <form
        style={{ display: 'flex', flexDirection: 'column', width: 300 }}
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
          maxLength={300}
          value={newGallery.descrtiption}
          placeholder='descrtiption'
          onChange={({ target }) =>
          setNewGallery({ ...newGallery, descrtiption: target.value,  })
          }
        />
        
        <button>{id ? 'Edit' : 'Add'}</button>
        
      </form>
        </div>
    );
}