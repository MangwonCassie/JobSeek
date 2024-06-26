import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../main';
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    console.log("Navbar의 Context 정보:", Context); // user 정보 출력
    console.log("Navbar의 user 정보:", user); // user 정보 출력
    console.log("isAuthorized 했나 아니오:", isAuthorized); // isAuthorized 값 콘솔에 출력


    const handleLogout = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:4000/api/v1/user/logout",
                {}, //빈객체전달
                {
                    withCredentials: true,
                }
            );
            toast.success(response.data.message);
            setIsAuthorized(false);
            navigateTo("/login");
        } catch (error) {
            toast.error(error.response.data.message), setIsAuthorized(true);
        }
    };

    const renderAuthButtons = () => {
        if (isAuthorized) {
            return <button onClick={handleLogout}>LOGOUT</button>;
        } else {
            return <Link to="/login">LOGIN</Link>;
        }
    };



    return (
        <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
            <div className="container">
                <div className="logo">
                    <img src="/cassie-logo.png" alt="logo" />
                </div>

                <ul className={!show ? "menu" : "show-menu menu"}>
                    <li>
                        <Link to={"/"} onClick={() => setShow(false)}>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link to={"/job/getall"} onClick={() => setShow(false)}>
                            ALL JOBS
                        </Link>
                    </li>
                    <li>
                        <Link to={"/applications/me"} onClick={() => setShow(false)}>
                            {user && user.role === "Employer"
                                ? "APPLICANT'S APPLICATIONS"
                                : "MY APPLICATIONS"}
                        </Link>
                    </li>
                    {user && user.role === "Employer" ? (
                        <>
                            <li>
                                <Link to={"/job/post"} onClick={() => setShow(false)}>
                                    POST NEW JOB
                                </Link>
                            </li>
                            <li>
                                <Link to={"/job/me"} onClick={() => setShow(false)}>
                                    VIEW YOUR JOBS
                                </Link>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}

                    <div className="hamburger">
                        <GiHamburgerMenu onClick={() => setShow(!show)} />
                    </div>

                    {renderAuthButtons()}
                </ul>

            </div>
        </nav>
    )
}

export default Navbar;