import React, { useEffect, useState } from 'react'
import './Blogs.css'
import { viewBlogs } from '../Api.jsx';
import { HiHeart } from "react-icons/hi";

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [display,setDisplay] = useState('hide');
    const [blog,setBlog] = useState({Title: '',Content: ''});

    useEffect( ()=>{
        const fetchData = async () => {
            const apiData = await viewBlogs();
            console.log(typeof(apiData.data.Blogs));
            setBlogs(apiData.data.Blogs)
        }
        fetchData();
    },[])


    // const blogs = [
    //     {
    //         Title: "Virat Kohli 1",
    //         Content: "Virat Kohli, the Indian international cricketer, has been in the news recently for his performance in the fifth Test match against Australia in Sydney. Kohli was dismissed for just 17 runs on Day 1, but he narrowly avoided being out on the first ball of his innings. Additionally, Kohli’s future in Test cricket has been a topic of discussion, with selectors informing Rohit Sharma that he is no longer needed in Tests and planning to discuss Kohli’s future as well."
    //     },
    //     {
    //         Title: "King Kohli 2",
    //         Content: "Virat Kohli, the Indian international cricketer, has been in the news recently for his performance in the fifth Test match against Australia in Sydney. Kohli was dismissed for just 17 runs on Day 1, but he narrowly avoided being out on the first ball of his innings. Additionally, Kohli’s future in Test cricket has been a topic of discussion, with selectors informing Rohit Sharma that he is no longer needed in Tests and planning to discuss Kohli’s future as well."
    //     },
    //     {
    //         Title: "Virat Kohli 3",
    //         Content: "Virat Kohli, the Indian international cricketer, has been in the news recently for his performance in the fifth Test match against Australia in Sydney. Kohli was dismissed for just 17 runs on Day 1, but he narrowly avoided being out on the first ball of his innings. Additionally, Kohli’s future in Test cricket has been a topic of discussion, with selectors informing Rohit Sharma that he is no longer needed in Tests and planning to discuss Kohli’s future as well."
    //     }
    // ]

    const handelReadMore = (index)=> {
        setBlog({Title: `${blogs[index].Title}`,Content: `${blogs[index].Content}`});
        console.log(index);
        
        setDisplay('view');
    }

  return (
    <>
    <div className="container">
        <h1>All Blogs</h1>
        <div className="blog-list" id="blogList">
            {blogs.map((element,index) => (
                <div className="blog-item" key={index}>
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
            <span className="close" onClick={()=> setDisplay('hide')}>&times;</span>
            <h2 id="modal-title" style={{color: '#d79090'}}>{blog.Title}</h2>
            <p id="modal-body" style={{color: '#8e8b8b'}}>{blog.Content}</p>
        </div>
    </div>
    </>
  )

}

export default Blogs