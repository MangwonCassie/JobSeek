import React, { useContext, useState } from 'react';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const { isAuthorized, setIsAuthorized } = useContext(Context);


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/user/login",
                { email, password, role },
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            document.cookie = `token=${data.token}; path=/;`;  // 토큰을 쿠키에 저장 (getUser 때문에 테스트중)
            console.log("login component" + data.token);
            setEmail("");
            setPassword("");
            setRole("");
            setIsAuthorized(true);// 로그인 성공 시 setIsAuthorized를 true로 설정


        } catch (error) {
            toast.error(error.response.data.message);
        }
    };



    if (isAuthorized) {
        return <Navigate to={'/'} />
    }


    return (
        <>
            <section className="authPage">
                <div className="container">
                    <div className="header">
                        <img src="/cassie-logo.png" alt="logo" />
                        <h3>Login to your account</h3>
                    </div>
                    <form>
                        <div className="inputTag">
                            <label>Login As</label>
                            <div>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select Role</option>
                                    <option value="Employer">Employer</option>
                                    <option value="Job Seeker">Job Seeker</option>
                                </select>
                                <FaRegUser />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Email Address</label>
                            <div>
                                <input
                                    type="email"
                                    placeholder="cassie@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <FaPencilAlt />
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Password</label>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FaPencilAlt />
                            </div>
                        </div>
                        <button type="submit" onClick={handleLogin}>
                            Login
                        </button>
                        <Link to={"/register"}>Register Now</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="/cassie-logo.png" alt="login" />
                </div>
            </section>
        </>

    )
};

export default Login;