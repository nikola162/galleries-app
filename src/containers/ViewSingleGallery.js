import { useParams } from "react-router";
import { useState, useEffect } from "react";
import GalleryService from "../services/GalleryService";
import {  selectActiveUser } from "../store/auth";
import {  useSelector } from "react-redux";

import {  useHistory  } from "react-router-dom";



function ViewSingleGallery() {
  const [gallery, setGallery] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const { id } = useParams();
  const activeUser = useSelector(selectActiveUser);
  const history = useHistory();

  const handleSubmitt = async (e) => {
    e.preventDefault();
    const data = await GalleryService.addNewComment(newComment, gallery.id);
    if (data){

    }
    setNewComment({ body: '' });
  }

  
  useEffect(() => {
    const fetchGallery = async () => {
      const data = await GalleryService.getSingleGallery(id);
      setGallery(data);
    }

    
    fetchGallery();
  }, [id,newComment])

  const handleDeleteComment = async (id) => {
    const response = prompt(
      "Are you sure you want to delete this comment?. "
    )
    if(response !== 'yes'){
      return;
    }

    await GalleryService.deleteComment(id);
    
    setGallery({...gallery, comments:   gallery.comments.filter((comment)=> comment.id !== id)})
  }



  const handleDeleteGallery = async (id) => {
    const response = prompt(
      "Are you sure you want to delete this comment?. "
    )
    if(response !== 'yes'){
      return;
    }
    history.push('/my-galleries');

    await GalleryService.deleteGallery(id);

    
  }

  
  return (
    <div className="singleContainer">
      <h3>{gallery.title}</h3>
      <p>{gallery.descrtiption}</p>

      {activeUser && activeUser.id === gallery.user_id ? 
      <button onClick={() => history.push(`/edit-galleries/${gallery.id}`)}>Edit</button> : ''}

      {activeUser && activeUser.id === gallery.user_id ?
      <button onClick={() => handleDeleteGallery(gallery.id)}>Delete Gallery</button> : ''}

      {gallery.images || gallery.user ?
      <div className="images-container">
          {gallery.images.map((image) => (
              <div 
              key={image.id}
              >
                <a target="_blank" href={image.Image_Url}><img style={{width:"300px",height:"300px"}} src={image.Image_Url} /></a> 
              </div>
          ))}
      </div>
      : "No image"
      }
      {gallery.comments || gallery.user ?
      <div>
          
          <ul>Comments:
                {gallery.comments.map((comment) =>(
                    <li key={comment.id}>
                    <p>{comment.user.first_name+'  '+comment.user.last_name+':         '}{comment.body}</p>
                    {activeUser && activeUser.id === comment.user_id ?
                    <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button> : ''}
                    </li>
                ))}
            </ul>
            
      </div>
      
      : "No comments"
      }
      {activeUser  ?
      <form
      style={{ display: 'flex', flexDirection: 'column', width: 300 }}
      onSubmit={handleSubmitt}
    >
      <input
        required
        maxLength={1000}
        value={newComment.body}
        placeholder='Write comment'
        onChange={({ target }) =>
        setNewComment({ ...newComment, body: target.value  })
        }
      />
      <button>Add new Comment</button>
      
    </form> : ''}
      
    </div>
  )
}

export default ViewSingleGallery;