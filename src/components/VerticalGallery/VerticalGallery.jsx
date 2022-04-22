import React, { useEffect, useState } from 'react';
import './verticalgallery.css';
import axios from 'axios';
import {useLocation,useNavigate} from 'react-router-dom';

export default function VerticalGallery() {
    const [posts, setPosts] = useState([]);
    const [isFetched, setisFetched] = useState(true);
    var search = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        const getPosts = async ()=>{
            const res = await axios.get("/api/posts/", {headers:{accessToken: localStorage.getItem("accessToken")}});
            setPosts(res.data);
            setisFetched(false);
        }
        getPosts();
    },[search]);

    
    return (
        <div className='galContainer'>
            {isFetched? null:
            <>
                <div className="bigContainer">
                <img className='imgBig' src={posts[0].photo} alt="" onClick={()=>{navigate(`/singlePost/${posts[0]._id}`);}} />
                <p className='vgTitle' onClick={()=>{navigate(`/singlePost/${posts[0]._id}`);}}>{posts[0].title}</p>
                <p className='vgSubTitle'>{posts[0].category+"/ " + new Date(posts[0].createdAt).toDateString()} </p>

            </div>
            <div className="smallContainer">
                <div className="smallCon">
                    <img className='imgBig' src={posts[1].photo} alt="" onClick={()=>{navigate(`/singlePost/${posts[1]._id}`);}} />
                    <p className='vgTitlesm' onClick={()=>{navigate(`/singlePost/${posts[1]._id}`);}}>{posts[1].title}</p>
                    <p className='vgSubTitlesm'>{posts[1].category+"/ " + new Date(posts[1].createdAt).toDateString()} </p>

                </div>
                <div className="smallCon">
                    <img className='imgBig' src={posts[2].photo} alt="" onClick={()=>{navigate(`/singlePost/${posts[2]._id}`);}} />
                    <p className='vgTitlesm' onClick={()=>{navigate(`/singlePost/${posts[2]._id}`);}}>{posts[2].title}</p>
                    <p className='vgSubTitlesm'>{posts[2].category+"/ " + new Date(posts[2].createdAt).toDateString()} </p>

                </div>

            </div>
                
            </>
            
            }
        </div>
    )
}
