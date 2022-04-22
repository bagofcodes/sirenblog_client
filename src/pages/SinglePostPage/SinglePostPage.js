import React,{useState,useEffect} from 'react';
import Headings from '../../components/Headings/Headings';
import TopThree from '../../components/TopThree/TopThree';
import axios from 'axios';
import {AuthContext} from '../../helpers/AuthContext';
import {useContext} from 'react';


import "./SinglePostPage.css";
import { useParams } from 'react-router-dom';

export default function SinglePostPage(props) {

  const [liked, setLike] = useState(false);
  const [posts, setPosts] = useState([]);
  const [author,setAuthor]=useState([]);
  const [isFetched, setisFetched] = useState(true);
  const [likeid,setLikeId] = useState("");
  const [likecount,setlikeccount] = useState(0);
  var postId = useParams();
  var search = useParams();

  const {authstate} = useContext(AuthContext);

    useEffect(()=>{
        const getPosts = async ()=>{
            setisFetched(true);
            const res = await axios.get(`https://sirenappblog.herokuapp.com/api/posts/singlePost/${postId.postId}`, {headers:{accessToken: localStorage.getItem("accessToken")}});
            setPosts(res.data);
            setlikeccount(res.data.likes.length);
            const userdata = await axios.get(`https://sirenappblog.herokuapp.com/api/users/byUsername/${authstate.username}`, {headers:{accessToken: localStorage.getItem("accessToken")}});
            const authordata = await axios.get(`https://sirenappblog.herokuapp.com/api/users/byUsername/${res.data.username}`, {headers:{accessToken: localStorage.getItem("accessToken")}});
            setAuthor(authordata.data);
            
            const intersection = (res.data.likes).filter(e=>(userdata.data.likes).includes(e));
            if(intersection.length===1){
              setLike(true);
              setLikeId(intersection[0]);
            }
            else{
              setLike(false);
              setLikeId("");
            }
            setisFetched(false);
            
        }
        getPosts();
    },[search])


  const togglelike= async ()=>{
    if(liked === false){
      setLike(true);
      const likeit = await axios.post("https://sirenappblog.herokuapp.com/api/likes",{username: authstate.username, postId: posts._id},{headers:{accessToken: localStorage.getItem("accessToken")}});
      setlikeccount(likecount+1);
      setLikeId(likeit.data._id); 
    }
    else{
      setLike(false);
      await axios.delete(`https://sirenappblog.herokuapp.com/api/likes/${authstate.username}/${posts._id}/${likeid}`, {headers:{accessToken: localStorage.getItem("accessToken")}});
      setlikeccount(likecount-1);
      setLikeId("");
    }
  }

  return (
    <div className='outer-container'>
        {isFetched? null:
        <div className="card-container">

        <div className='colz'>
          <div className='author-container'>
            <div className='author-img'>
              <img src={author.profilepic} alt="No internet"/>
            </div>
            <span>Written By {posts.name}</span>

          </div>
          <div className='colz-icon'>
            <a href={author.fbid}>
              <i className="fa fa-facebook-square"></i>
            </a>
            <a href={author.instaid}>
              <i className="fa fa-instagram"></i>
            </a>
            <a href={author.youtubeid}>
              <i className="fa fa-youtube"></i>
            </a>
            <a href={author.twitterid}>
              <i className="fa fa-twitter"></i>
            </a>
          </div>
        </div> 
        <h1>{posts.title}</h1>
        <img src={posts.photo} alt='No Internet' />
        <p>{posts.desc}</p>
        <div className='cat-container'>
          <span id="cat">{posts.category} </span>
          <span>{"/ "+ new Date(posts.createdAt).toDateString()}</span>
        </div>

        <div className='colz-likes'>
          <span className='colz-likes-icon' onClick={togglelike}>
            {!liked? <i className="fa fa-heart-o"></i> : <i className="fa fa-heart"></i>}
          </span>
          <span>{likecount}</span>
        </div>
      </div>}


        <Headings heading="Related Posts" />

        {isFetched? null: <TopThree Type="Related" category = {posts.category} />}

    </div>
  )
}
