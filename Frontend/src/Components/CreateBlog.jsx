import React, { useEffect, useState } from 'react'
import './CreateBlog.css'
import { createBlog } from '../Api.jsx';
import { useNavigate } from 'react-router-dom';

const CreateBlog = ({loginUser}) => {
  useEffect( ()=> {
    if (loginUser.Role != 'Writer') {
      navigate('/blogs');
    }
  },[])

  const navigate = useNavigate();
  const [messageState, setMessageState] = useState('hideBlogMessage');
  const [buttonStatus, setButtonStatus] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle ] = useState('');
  const [content, setContent ] = useState('');

  const handelSubmit = async(e)=>{
    e.preventDefault();

    const blogData = {
      Title: title,
      Content: content
    }
    setButtonStatus(true);
    try {
      const apiData = await createBlog(blogData);
      console.log(apiData);
      if (apiData.data.Error) {
        setMessage('Something Went Wrong Please Try again later....');
        setMessageState("errorBlogMessage");
      } else {
        setMessage('Blog Created Sucessfully.....');
        setMessageState("sucessBlogMessage");
        setTitle('');
        setContent('');
      }
    } catch (error) {
      setMessage('Something Went Wrong Please Try again later....');
      setMessageState("errorBlogMessage");
    }
    
    setTimeout(()=>{
      setMessage('');
      setMessageState("hideBlogMessage");
      setButtonStatus(false);
    },5000);
  }

  return (
    <>
        <div className="container">
        <h1>Create a New Blog</h1>
        <form id="blogForm" onSubmit={handelSubmit}>
            <label htmlFor="title" className='inputLabel'>Blog Title:</label>
            <input 
            type="text" 
            id="title" 
            name="title" 
            value={title}
            placeholder="Enter blog title" 
            required
            onChange={(e)=> setTitle(e.target.value)}
            />
            
            <label htmlFor="content" className='inputLabel'>Content:</label>
            <textarea 
            id="content" 
            name="content" 
            rows="5" 
            value={content}
            placeholder="Write your blog content..." 
            required
            onChange={(e)=> setContent(e.target.value)}
            ></textarea>

            <p id="statusMessage" className={messageState}>{message}</p>  
            <button type="submit" id="submitBtn" disabled={buttonStatus}>Create Blog</button>
        </form>
    </div>
    </>
  )
}

export default CreateBlog