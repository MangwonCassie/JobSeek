import React, { useContext } from 'react'
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {

    const { isAuthorized } = useContext(Context);

    return (
        <footer className={isAuthorized ? "footerShow" : "footerHide"}>
            <div>All Rights Reserved By Cassie Kim</div>
            <div>
                <Link to={""} target="_blank">
                    <FaFacebookF />
                </Link>
                <Link to={""} target="_blank">
                    <FaYoutube />
                </Link>
                <Link to={""} target="_blank">
                    <FaLinkedin />
                </Link>
            </div>
        </footer>
    );
}

export default Footer