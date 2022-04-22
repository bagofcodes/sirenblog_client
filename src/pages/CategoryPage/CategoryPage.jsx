import React from 'react';
import "./categorypage.css";
import "../../components/SplitSection/splitsection.css"
import PostContainer from '../../components/PostContainer/PostContainer';
import PostsSidebar from '../../components/PostsSidebar/PostsSidebar';
import Ad from '../../components/Ad/Ad';
import Headings from '../../components/Headings/Headings';
import {useParams} from 'react-router-dom';

function CategoryPage() {
    const cat= useParams();

    return (
        <div className='outerContainerSS' id="ocontainer">
            <div className="largerSection" id="lsection">
                <Headings heading ={cat.catName} />
                <PostContainer style={{height: "100%"}} noOfEle={6} cat={cat}/>
            </div>
            <div className="smallerSection">
                <PostsSidebar />
                <Ad />
            </div>
            
            
        </div>
    )
}

export default CategoryPage
