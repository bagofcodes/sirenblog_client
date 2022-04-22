import React,{useState,useEffect} from 'react';
import FooterPost from '../FooterPost/FooterPost';
import './footerpostlist.css';
import '../PostContainer/postcontainer.css';
import axios from 'axios';


export default function FooterPostList() {
    const [start,setStart] = useState(0);
    const [noOfElements,setElements] = useState(3);
    const [posts, setPosts] = useState([]);
    const [isFetched, setisFetched] = useState(true); 

    useEffect(()=>{
        const getPosts = async ()=>{
            const res = await axios.get("https://sirenappblog.herokuapp.com/api/posts/latest", {headers:{accessToken: localStorage.getItem("accessToken")}});
            await setPosts(res.data);
            setisFetched(false);
        }
        getPosts();
    },[])

    const loadMoredata = ()=>{
        setStart(start+3);
        setElements(noOfElements+3)

    }


    const slice = posts.slice(start,noOfElements);
    return (
        <>
            <div className='fpostlistCont'>
                {isFetched?null: slice.map((item,value) =>{
                    return (
                        <>
                            <FooterPost props={item} />
                            {value===(slice.length)-1?"":<hr style={{"border":"solid 1px #F0F0F0 ","width": "1px","backgroundColor": "#e8e6e6", "height": "90%" ,"marginLeft":"0px","marginRight": "0px"}} key={value}/>}
                        </>
                    );

                })}
            </div>
            <button className="loadMore" onClick={loadMoredata}>ViewMore <i className="downIcon fa fa-arrow-right" aria-hidden="true"></i></button>
        </>
    )
}
