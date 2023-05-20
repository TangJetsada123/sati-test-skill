import { useRef, useState, useEffect, useContext } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { api } from "../components/path";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import { MyContext } from "../context/context";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const Login = () => {
    const navigate = useNavigate()
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [userFocus, setUserFocus] = useState(false);
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const { myData, setMyData } = useContext(MyContext)
    const { token, setToken } = useContext(MyContext)
    const [userData, setUserData] = useState({
        _id: "",
        firstname: "",
        lastname: "",
        profile_image: "",
        birth_date: "",
        email: "",
        post_count: 0
    })
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setValidPwd(PASSWORD_REGEX.test(pwd) && pwd.length >= 8);
    }, [pwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/home')
        } else {
            navigate('/')
        }
    }, [myData])
    const handleSubmit = async () => {
        try {
            await axios.post(`${api}/auth/login`, {
                email: user,
                password: pwd
            }).then(
                async (res) => {
                    localStorage.setItem('token', res.data.access_token);
                    const userId = await jwtDecode(res.data.access_token)
                    await axios.get(`${api}/user/${userId.sub}`, {
                        headers: {
                            Authorization: `Bearer ${res.data.access_token}`
                        }
                    }).then(async (res) => {
                        localStorage.setItem('userData', JSON.stringify(res.data))
                        if (res.data) {
                            const { _id, firstname, lastname, profile_image, birth_date, email, post_count } = res.data;
                            setUserData({
                                _id,
                                firstname,
                                lastname,
                                profile_image,
                                birth_date,
                                email,
                                post_count
                            }); // pass the entire object to setUserData
                            await Swal.fire(
                                'Welcome to Sati!',
                                '',
                                'success'
                            );
                            navigate(`/home`);
                        } else {
                            throw new Error(); // use "Error" instead of "error"
                        }
                    });
                }
            )
        } catch (error) {
            Swal.fire(
                'The usename or password you entered is invalid!',
                '',
                'error'
            )
        }

    };

    useEffect(() => {
        if (userData && Object.keys(userData).length > 0) { // check if userData exists and is not empty
            localStorage.setItem("userData", JSON.stringify(userData));
        }
    }, [userData]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="ml-auto mr-auto flex rounded-xl w-[70vw] h-[80vh] drop-shadow-2xl">
                <div className=" text-[#062e48] flex-box w-[100%] bg-[#062e48] border-none">
                    <div className="text-center">
                        <img className="w-[30%] ml-auto mr-auto mt-28 hover:scale-110 " src="/sati.svg"></img>
                    </div>
                    <div className="text-center mt-20">
                        <p><a href="https://sati.co.th/" className="font-bold text-white">www.sati.co.th</a></p>
                    </div>
                </div>
                <div className="bg-[white] w-[100%]  ">
                    <div className="flex-box p-10 mt-10">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1 className="text-[#062e48] font-bold text-center text-xl">Login to Sati</h1>
                        <form className="flex-box gap-8">
                            <div className="flex-box items-center gap-3">
                                <label htmlFor="username" className="text-lg text-[#062e48]">
                                    Email:

                                </label>
                                <input
                                    className="
                                    border-[2px]
                                    border-[#062e48]
                                    mt-4 w-full px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-[#44edc7] focus:border-[#44edc7] text-[#062e48]"
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                            </div>
                            <div className="flex-box items-center gap-4">
                                <label htmlFor="password" className="text-lg text-[#062e48]">
                                    Password:
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-green-500" : "hidden"} />
                                    <FontAwesomeIcon icon={faTimes} className={!validPwd && pwd ? "text-red-500" : "hidden"} />
                                </label>
                                <input
                                    className=" 
                                    border-[2px]
                                    border-[#062e48] 
                                    mt-4 w-full 
                                    px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-[#44edc7]"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={!validPwd}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                            </div>
                            <p id="pwdnote" className={`${pwdFocus && !validPwd ? "text-[#062e48]" : "hidden"} text-sm`}>
                                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                                Password must contain at least one Uppercase letter, one Lowercase letter, one digit, and one special symbol @$!%*?&.
                            </p>
                        </form>
                        <button onClick={handleSubmit} className="bg-[#44edc7] text-[#062e48] hover:bg-[#43e8c1]  font-semibold py-2 px-4 border border-gray-400 rounded shadow">Sign In</button>
                        <p className="text-[#062e48]">
                            Not registred?<br />
                            <span className="hover:underline">
                                <p ><a href="/register" className="text-[#44edc7]">Create an account!</a></p>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login