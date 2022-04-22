import React, { useState,useEffect } from 'react'
import './topthree.css'
import TopThreeCard from '../TopThreeCard/TopThreeCard';
import axios from 'axios';

export default function TopThree(Props) {
    const [posts, setPosts] = useState([]);
    const [isFetched, setisFetched] = useState(true);
    var cat=Props.category;


    
    useEffect(()=>{
        const getPosts = async ()=>{
            setisFetched(true);
            const res = await axios.get("https://sirenappblog.herokuapp.com/api/posts/latest", {headers:{accessToken: localStorage.getItem("accessToken")}});
            await setPosts(res.data);
            setisFetched(false);
        }
        const getRPosts = async()=>{
            setisFetched(true);
            const res = await axios.get(`https://sirenappblog.herokuapp.com/api/posts/related/${cat}`, {headers:{accessToken: localStorage.getItem("accessToken")}});
            await setPosts(res.data);
            setisFetched(false);
    
        }
        if(Props.Type === "Related"){
            getRPosts();
        }
        else{
            getPosts();
        }
    },[Props.Type]);
    return (
        <div className='topThreeContainer'>
            {isFetched? null: <>
                <TopThreeCard Posts={posts[0]} />
                <TopThreeCard Posts={posts[1]}/>
                <TopThreeCard Posts={posts[2]}/>

            </>}
        </div>
    )
}
