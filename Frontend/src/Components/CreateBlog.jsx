import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import './CreateBlog.css'
import { createBlog } from '../Api.jsx';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.jsx';
import ErrorComp from './ErrorComp.jsx';
import SucessComp from './SucessComp.jsx';

const CreateBlog = ({loginUser}) => {

  useEffect( ()=> {
    
    if (loginUser.Role != 'writer') {
      navigate('/blogs');
    }
  },[])

  const navigate = useNavigate();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [title, setTitle ] = useState('');
  const [content, setContent ] = useState('');

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
  });

// Start
  const handelSubmit = async(e)=>{
    e.preventDefault();

    const blogData = {
      Title: title,
      Content: content,
      User: loginUser.Name
    }
    setButtonStatus(true);

    createBlogMutation.mutate(blogData);
  }
// End

if (createBlogMutation.isPending) {
  return(<Loading loadingMessage="Blog Creating"/>)
}

if (createBlogMutation.isError) {
  // console.log(createBlogMutation);
  return (
    <ErrorComp errorMessage = {createBlogMutation.error.message} code = {createBlogMutation.data?.status ?? 404} />
  )
}

if (createBlogMutation.isSuccess) {
  console.log(createBlogMutation);
  
  return(
    <SucessComp SucessMessage={createBlogMutation.data?.data.Message} />
  )
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
            <button type="submit" id="submitBtn" disabled={buttonStatus}>Create Blog</button>
        </form>
    </div>
    </>
  )
}

export default CreateBlog