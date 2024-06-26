import React, { useEffect } from 'react';
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";


const Home = () => {
    const { isAuthorized, user } = useContext(Context);

    console.log("Home 컴포넌트", user);


    if (!isAuthorized) {
        return <Navigate to={"/login"} />;
    }


    return (
        <>
            <section className="homePage page">
                <HeroSection />
                <HowItWorks />
                <PopularCategories />
                <PopularCompanies />
            </section>
        </>
    );
};

export default Home