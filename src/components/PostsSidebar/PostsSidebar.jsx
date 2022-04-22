import React,{useEffect,useState} from 'react'
import Headings from '../Headings/Headings'
import './postssidebar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PostsSidebar() {
    const [posts, setPosts] = useState([]);
    const [isFetched, setisFetched] = useState(true);
    const navigate = useNavigate();


    useEffect(()=>{
        const getPosts = async ()=>{
            const res = await axios.get("/api/posts/topPosts", {headers:{accessToken: localStorage.getItem("accessToken")}});
            setPosts(res.data);
            setisFetched(false);
        }
        getPosts();
    },[])

    return (
        <div className='postsSidebarcontainer'>
            <Headings heading="Top Posts" />
            {isFetched?null : <><div className='topBig'>
                <img className="imgTb" src={posts[0].photo} alt="" onClick={()=>{navigate(`/singlePost/${posts[0]._id}`);}}/>
                <div className="titlePs">
                    <span className='titleText' onClick={()=>{navigate(`/singlePost/${posts[0]._id}`);}}>{posts[0].title}</span>
                    <span className='titleNum'>1</span>
                </div>
                <div className="footerPs">
                    <span className="fcatPs">{posts[0].category}</span>
                    <span className="fdatePs">{"/ "+ new Date(posts[0].createdAt).toDateString()}</span>
                </div>
            </div>
            <div className="smalltn">
                <img className="imgTs" src={posts[1].photo} alt="No internet" onClick={()=>{navigate(`/singlePost/${posts[1]._id}`);}}/>
                <div className='titleTs'>
                    <span className='titleTextTs' onClick={()=>{navigate(`/singlePost/${posts[1]._id}`);}}>{posts[1].title}</span>
                    <div className="footerPsts">
                        <span className="fcatPs">{posts[1].category}</span>
                        <span className="fdatePs">{"/ "+ new Date(posts[1].createdAt).toDateString()}</span>
                    </div>

                </div>
                <span className='titleNum'>2</span>
            </div>
            <div className="smalltn">
                <img className="imgTs" src={posts[2].photo} alt="No internet" onClick={()=>{navigate(`/singlePost/${posts[2]._id}`);}} />
                <div className='titleTs'>
                    <span className='titleTextTs' onClick={()=>{navigate(`/singlePost/${posts[2]._id}`);}}>{posts[2].title}</span>
                    <div className="footerPsts">
                        <span className="fcatPs">{posts[2].category}</span>
                        <span className="fdatePs">{"/ "+ new Date(posts[2].createdAt).toDateString()}</span>
                    </div>

                </div>
                <span className='titleNum'>3</span>
            </div>
            <div className="smalltn">
                <img className="imgTs" src={posts[3].photo} alt="No internet" onClick={()=>{navigate(`/singlePost/${posts[3]._id}`);}} />
                <div className='titleTs'>
                    <span className='titleTextTs' onClick={()=>{navigate(`/singlePost/${posts[3]._id}`);}}>{posts[3].title}</span>
                    <div className="footerPsts">
                        <span className="fcatPs">{posts[3].category}</span>
                        <span className="fdatePs">{"/ "+ new Date(posts[3].createdAt).toDateString()}</span>
                    </div>

                </div>
                <span className='titleNum'>4</span>
            </div></>}
            
        </div>
    )
}
