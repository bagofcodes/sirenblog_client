import React,{useState} from 'react';
import './topbar.css';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../helpers/AuthContext';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';


export default function TopBar() {
    const [links, showLinks] = useState(false);
    const {authstate,setAuthState} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('accessToken');
        setAuthState({username:"", userid: 0, isLoggedIn: false});
        navigate("/login");
        showLinks(!links)
    }


    

    return (
        <div className='topBarOuter'>
            <div className="headingContainer">
                <span className="firstText">The</span>
                <span className='secondText'>Siren</span>
            </div>
            <div className="optionsContainer">

                <ul className="topList" id={links? "hidden" : ""}>
                    {authstate.isLoggedIn ? 
                    <>
                        <li className="topListItems" onClick={()=>showLinks(!links)}><Link className="link" to="/">Home</Link></li>
                        <li className="topListItems" onClick={()=>showLinks(!links)}><Link className="link" to="/categoryPost/Bollywood">Bollywood</Link></li>
                        <li className="topListItems" onClick={()=>showLinks(!links)}><Link className="link" to="/categoryPost/Tech">Technology</Link></li>
                        <li className="topListItems" onClick={()=>showLinks(!links)}><Link className="link" to="/categoryPost/Hollywood">Hollywood</Link></li>
                        <li className="topListItems" onClick={()=>showLinks(!links)}><Link className="link" to="/categoryPost/Fitness">Fitness</Link></li>
                        <li className="topListItems" onClick={()=>showLinks(!links)}><Link className="link" to="/categoryPost/Food">Food</Link></li>
                        <li className="topListItems" onClick={()=>showLinks(!links)}><Link className="link" to="/writePost">Write Story</Link></li>
                        <li className="topListItems" onClick={handleLogout}>Logout</li>
                    </>:
                    <>
                        <li className="topListItems" onClick={()=>showLinks(!links)}><Link className="link" to="/login">Login</Link></li>
                        <li className="topListItems" onClick={()=>showLinks(!links)}><Link className="link" to="/register">Register</Link></li>

                    </>
                    }
                </ul>
                <i className='fa fa-bars icon-ham' onClick={()=>showLinks(!links)}></i>
            </div>
        </div>
    )
}
