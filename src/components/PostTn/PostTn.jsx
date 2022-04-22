import React from 'react'
import './posttn.css';
import { useNavigate } from 'react-router-dom';

export default function PostTn({props}) {
    const navigate = useNavigate();
    return (
        <div className="pSm">
            <img className="imgPsm" src={props.photo} alt="" />
            <div className='titlePsm' onClick={()=>{navigate(`/singlePost/${props._id}`);}}>
                <span className='titleTextPsm'>{props.title}</span>
                <p className='descPsm'>{props.desc}</p>
                <div className="footerPsm">
                    <span className="fcatPsm">{props.category}</span>
                    <span className="fdatePsm">{"/ "+ new Date(props.createdAt).toDateString()}</span>
                </div>
            </div>
        </div>
    )
}
