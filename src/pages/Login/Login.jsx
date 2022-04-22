import React, { useState } from 'react';
import axios from 'axios';
import {useContext} from 'react';
import {AuthContext} from '../../helpers/AuthContext';
import {useNavigate} from 'react-router-dom';
import * as ReactBootstrap from "react-bootstrap";

export default function Login() {
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const {setAuthState} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            setLoading(true);
            var fd = new FormData();
            fd.append("username",username);
            fd.append("password",password);
            var res = await axios.post("/api/auth/login",fd);
            if(res.data.error){
                setLoading(false);
                alert(res.data.error);
            }
            else{
                localStorage.setItem("accessToken",res.data.token);
                setAuthState({
                    username: res.data.username,
                    userid: res.data.userid,
                    isLoggedIn: true,
                });
                setLoading(false);
                alert("Login Successfull");
                navigate("/");
            }

        }catch(err){
            setLoading(false);
            alert(res.data.error);
        }

    }

  return (
    <div className="out-contain">
    <div className="card-cont">
        <div className="heading-cont">
            <span className='heading-text'>Login</span>
            <span><i className="fa fa-pencil-square icon"></i></span>
        </div>
        <form onSubmit={handleSubmit} className='writeForm'>
            <div className="form-group">
                <label className="title-label" htmlFor="username">
                    <span>Username<span style={{color: "red"}}>*</span></span>
                </label>
                <input type="text" id='username' className='title-area' placeholder="Write the Username Here...." onChange={(e)=> setUsername(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label className="title-label" htmlFor="password">
                    <span>Password<span style={{color: "red"}}>*</span></span>
                </label>
                <input type="password" id='password' className='title-area' placeholder="Write your Password here....." onChange={(e)=> setPassword(e.target.value)} required/>
            </div>
            <div className="button-div">
            <button className='writeSubmitButton ' type='submit'>Login{loading? <ReactBootstrap.Spinner animation="border" variant="danger" size ="sm" />:<i className="fa fa-paper-plane"></i>}</button>
            </div>
        </form>
    </div>
</div>
  )
}
