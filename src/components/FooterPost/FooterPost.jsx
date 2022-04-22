import React from 'react';
import './footerpost.css';
import { useNavigate } from 'react-router-dom';


export default function FooterPost({props}) {
    const navigate = useNavigate();
    const handleClick =()=>{
        navigate(`/singlePost/${props._id}`);
    }
    return (
        <div className='fpostCont'>
            <span className="fpostTitle" onClick={handleClick}>{props.title}</span>
            <p className='fpostdesc'>{props.desc}</p>
            <div className="fPostf">
                    <span className="fPostfct">{props.category}</span>
                    <span className="fPostfdt">{"/ "+ new Date(props.createdAt).toDateString()}</span>
            </div>
            
        </div>
    )
}
