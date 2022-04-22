import React from 'react';
import './topthreecard.css';
import { useNavigate } from 'react-router-dom';

export default function TopThreeCard(Posts) {
    const navigate = useNavigate();

    return (
        <div className='outerContainer'>
            <img className="imgCard" src={Posts["Posts"].photo} alt="" onClick={()=>{navigate(`/singlePost/${Posts["Posts"]._id}`);}}/>
            <p className="cardTitle" onClick={()=>{navigate(`/singlePost/${Posts["Posts"]._id}`);}}>{Posts["Posts"].title}</p>
            <p className="cardContent">{Posts["Posts"].desc}</p>
            <div className="cardFooter">
                <span className="footerCat">{Posts["Posts"].category}</span>
                <span className="dateFooter">{"/ " + new Date(Posts["Posts"].createdAt).toDateString()}</span>
            </div>
            
        </div>
    )
}
