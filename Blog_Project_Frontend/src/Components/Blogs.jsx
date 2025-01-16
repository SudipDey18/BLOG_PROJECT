import React, { useEffect, useState } from 'react'
import './Blogs.css'
import { viewBlogs } from '../Api.jsx';
import { useQuery } from '@tanstack/react-query'
import { HiHeart } from "react-icons/hi";
import Loading from './Loading.jsx';


const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [display,setDisplay] = useState('hide');
    const [blog,setBlog] = useState({Title: '',Content: '', User:''});
    const getBlogs = useQuery({
        queryKey: ["blogs"],
        queryFn: viewBlogs
    });
    
    useEffect(() => {
        if (getBlogs.data) {
          console.log(getBlogs.data);
          setBlogs(getBlogs.data?.data?.Blogs);
        }
      }, [getBlogs.data]);


    const handelReadMore = (index)=> {
        setBlog({Title: `${blogs[index].Title}`,Content: `${blogs[index].Content}`, User: `${blogs[index].User}`});
        // console.log(index);
        
        setDisplay('view');
    }

    if (getBlogs.isPending) {
        return(<Loading loadingMessage="Blog Loading"/>)
    }

  return (
    <>
    <div className="allBlogsContainer" >
        <h1 id='allBlogHeadding'>All Blogs</h1>
        <hr />
        <div className="blog-list" id="blogList">
            {blogs.map((element,index) => (
                <div className="blog-item" key={index} style={{minWidth: '95%'}}>
                    <h2 className="blog-title">{element.Title}</h2>
                    <div className="blog-content" id="content">{element.Content}</div>
                    <button className="read-more" onClick={()=> handelReadMore(index)} >Read More</button>
                    <button className="like-button"><HiHeart style={{position: 'relative', top: "7px"}}/></button>
                    <span className="math-inline">100</span>
                </div>
            ))}
        </div>
    </div>

    {/* <------------------------------------------------------------------------------> */}

    <div id="modal" className={`modal ${display}`}>
        <div className="modal-content">
            <div className='modalFixedDiv'>
                <span className="close" onClick={()=> setDisplay('hide')}>Close</span>
                <h2 id="modal-title" style={{color: '#d79090'}}>{blog.Title}</h2>
                <h4 id="modal-user">{blog.User}</h4>
            </div>
            <div className="contentDiv">
                <p id="modal-body" style={{color: '#8e8b8b'}}>{blog.Content}</p>
            </div>
        </div>
    </div>
    </>
  )

}

export default Blogs