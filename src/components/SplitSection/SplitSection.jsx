import React, { useEffect,useState } from 'react'
import Ad from '../Ad/Ad'
import PostContainer from '../PostContainer/PostContainer'
import PostsSidebar from '../PostsSidebar/PostsSidebar'
import './splitsection.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SplitSection() {
    const [posts, setPosts] = useState([]);
    const [isFetched, setisFetched] = useState(true); 
    const navigate = useNavigate();


    useEffect(()=>{
        const getPosts = async ()=>{
            const res = await axios.get("/api/posts/latest", {headers:{accessToken: localStorage.getItem("accessToken")}});
            await setPosts(res.data);
            setisFetched(false);
        }
        getPosts();
    },[])


    return (
        <div className='outerContainerSS'>
            <div className="largerSection">
                <PostContainer noOfEle={4} cat={{catName:""}}/>
                <div className="bigContainerVg">
                    {isFetched? null : 
                    <>
                        <img className='imgBigVg' src={posts[3].photo} alt="" onClick={()=>{navigate(`/singlePost/${posts[3]._id}`);}}/>
                        <p className='vgTitlem' onClick={()=>{navigate(`/singlePost/${posts[3]._id}`);}}>{posts[3].title}</p>
                        <p className='vgSubTitlem'>{posts[3].category+"/ " + new Date(posts[3].createdAt).toDateString()} </p>
                    </>}

                </div>

            </div>

            <div className="smallerSection">
                <Ad />
                {isFetched? null: <PostsSidebar Posts={posts} />}
            </div>
            
        </div>
    )
}
