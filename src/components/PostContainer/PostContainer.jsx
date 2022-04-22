import React,{useState,useEffect} from 'react';
import PostTn from '../PostTn/PostTn';
import './postcontainer.css';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';

export default function PostContainer(props) {
    const noe=props.noOfEle;
    const [start,setStart] = useState(0);
    const [noOfElements,setElements] = useState(props.noOfEle);
    const [posts, setPosts] = useState([]);
    const [isFetched, setisFetched] = useState(true); 
    var category = props.cat.catName;
    let slice=[];
    var loc=useLocation();

    const getPosts = async ()=>{
        const res = await axios.get("/api/posts/latest", {headers:{accessToken: localStorage.getItem("accessToken")}});
        setPosts(res.data);
        setisFetched(false);
    }
    const getPostscat = async ()=>{
        const res = await axios.get(`/api/posts/byCategory/${category}`, {headers:{accessToken: localStorage.getItem("accessToken")}});
        setPosts(res.data);
        setisFetched(false);
    }

    useEffect(()=>{
        if(category === ""){
            setisFetched(true);
            getPosts();
            setStart(0);
            setElements(noe);
        }
        else{
            setisFetched(true);
            getPostscat();
            setStart(0);
            setElements(noe);

        }
    },[category,noe,loc])

    const loadMoredata = ()=>{
        setStart(start+props.noOfEle);
        setElements(noOfElements+props.noOfEle)

    }

    const navigate = useNavigate();

    slice=posts.slice(start,noOfElements);
    
    return (
        <div className='pContOuter' style={props.style}>
            {isFetched? null :slice.map((item,index)=>{
                return(index === 0?<div className="pLg" key={item._id}>
                <img className="imgPlg" src={item.photo} alt="" />
                <div className='titlePlg' onClick={()=>{navigate(`/singlePost/${item._id}`);}}>
                    <span className='titleTextPlg'>{item.title}</span>
                    <p className='descPlg'>{item.desc}</p>
                    <div className="footerPlg">
                        <span className="fcatPlg">{item.category}</span>
                        <span className="fdatePlg">{"/ "+ new Date(item.createdAt).toDateString()}</span>
                    </div>

                </div>
            </div>:<PostTn props= {item} key={item._id}/>
                )
            })}
            
            <button className='loadMore' onClick={loadMoredata}>Load More <i className="downIcon fa fa-arrow-down" aria-hidden="true"></i></button>
        </div>
    )
}
