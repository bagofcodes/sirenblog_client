import React,{useEffect, useState} from 'react';
import "./WritePage.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as ReactBootstrap from "react-bootstrap";


export default function WritePage() {

    const [file,setFile] = useState("");
    const [catList, setCatList] = useState([]);
    const [title,setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [cat, setCat] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    


    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axios.get("/api/cat");
            setCatList(res.data);
        }
        getCats();
    },[]);


    const submitPost = async (e)=>{
        e.preventDefault();
        if(file === ""){
            alert("Please Upload an Image")
        }
        else{
            try{
                setLoading(true);
                var fd =new FormData();
                fd.append("title", title);
                fd.append("desc", desc);
                fd.append("photo",file);
                fd.append("category",cat);
                var res = await axios.post("/api/posts", fd, {headers:{accessToken: localStorage.getItem("accessToken")}});
                setLoading(false);
                setFile("");
                setTitle("");
                setDesc("");
                setCat("");
                alert(res.data.status);
                navigate("/")
            }catch(err){
                alert(err);
            }

        }
    }




  return (
    <div className='outer-container'>
        <div className="card-contain">
            <div className="heading">
                <span className='heading-text'>Write Your Story</span>
                <span><i className="fa fa-paper-plane"></i></span>
            </div>
            {file?<img className='img-back' src={URL.createObjectURL(file)} alt="No Internet"/>: <img className='img-back' src="https://cdn.twibooru.org/img/2020/7/19/1467720/medium.jpeg" alt="No Internet"/>}
            <form onSubmit={submitPost} className='writeForm'>
                <div className="form-group">
                    <label className="back-img-label" htmlFor="file-input">
                        <i className="fa fa-plus-circle" />
                        <span>Choose File for the background</span>
                    </label>
                    <input type="file" id='file-input' style={{display:"none"}} onChange={(e)=> setFile(e.target.files[0])}/>
                </div>
                <div className="form-group">
                    <label className="title-label" htmlFor="title">
                        <span>Title</span>
                    </label>
                    <input type="text" id='title' className='title-area' autoFocus={true} placeholder="Write the Title Here...." required onChange={(e)=> setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="desc-label" htmlFor="desc">
                        <span>Your Story</span>
                    </label>
                    <textarea type="text" id='desc' className='desc-area'  placeholder='Pen down your thoughts...' onChange={(e)=> setDesc(e.target.value)} required/>
                </div>

                <div className="form-group">
                    <label className="cat-label" htmlFor="cat-cont">
                        <span>Category</span>
                    </label>
                    <div className="cat-cont">
                        {catList.map((item,index)=>{
                            return (
                                <label className='cat-disp' htmlFor={item._id} key={item._id}>
                                    <input type="radio" id={item._id} name="category" value={item.name} onChange={(e)=>setCat(e.target.value)}/>
                                    <span className='dot'></span>
                                    <span className='category'>{item.name}</span>
                                </label>
                            );
                        })}

                    </div>
                </div>

                <div className="button-div">
                <button className='writeSubmitButton' type='submit'>Publish{loading? <ReactBootstrap.Spinner animation="border" variant="danger" size ="sm" />:<i className="fa fa-paper-plane"></i>}</button>
                </div>

            </form>
        </div>
    </div>
  )
}
