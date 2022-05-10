import React from 'react';
import Banner from './Banner';
import Footer from './Footer';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import Services from './Services';
import Textimonial from './Textimonial';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <MakeAppointment></MakeAppointment>
            <Textimonial></Textimonial>
            <Footer></Footer>
        </div>
    );
};

export default Home;