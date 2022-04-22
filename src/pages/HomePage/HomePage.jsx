import React from 'react'
import FooterPostList from '../../components/FooterPostList/FooterPostList';
import Headings from '../../components/Headings/Headings';
import SplitSection from '../../components/SplitSection/SplitSection';
import TopThree from '../../components/TopThree/TopThree';
import VerticalGallery from '../../components/VerticalGallery/VerticalGallery';
import './homepage.css';

export default function HomePage() {

    

    return (
        <div className='home'>
            

            <VerticalGallery />
            <Headings heading ="The Latest"/>
            <TopThree Type="" category="" />
            <Headings heading ="Latest Articles"/>
            <SplitSection />
            <Headings heading ="Latest Stories"/>
            <hr style={{"border":"solid 1px #F0F0F0 ","width": "80%","backgroundColor": "#F0F0F0 ", "height": "1px", "marginBottom": "60px"}}/>
            <FooterPostList />
            <hr style={{"border":"solid 1px #F0F0F0 ","width": "80%","backgroundColor": "#F0F0F0 ", "height": "1px","marginTop": "60px"}}/>
            
        </div>
    )
}
