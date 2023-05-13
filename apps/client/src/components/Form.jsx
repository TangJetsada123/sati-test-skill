import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import { api } from "./path";
import Swal from 'sweetalert2'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom'


const fileTypes = ["image/jpeg", "image/png", "image/bmp"]; // Allowed file types
const maxSize = 5 * 1024 * 1024; // 5 MB
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const FormComponent = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        birth_date:"",
        file: {},
    });
    const navigate = useNavigate()
    const userRef = useRef();
    const errRef = useRef();
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [validConPwd, setValidConPwd] = useState(false);
    const [conpwdFocus, setConPwdFocus] = useState(false);
    const [validFile, setValidFile] = useState(false)
    const [fileFocus, setFileFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setValidPwd(PASSWORD_REGEX.test(formData.password))
        setValidConPwd(formData.password === formData.confirmPassword)        
        setValidFile(formData.file && fileTypes.includes(formData.file.type) && formData.file.size <= maxSize)
    }, [{ ...formData }])

    useEffect(() => {
        setErrMsg('')
    }, [{ ...formData }])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/home')
        }
    })

   

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value,
        });
    };


    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api}/user/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'Welcome to Sati',
            })
            await axios.post(`${api}/auth/login`,{
                email: formData.email,
                password: formData.password
            }).then((res)=>{
                localStorage.setItem('token',res.data.access_token)
                window.location = '/home'
            })


        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Username is already !',
                text: 'Please Choose another Username'
            });
        }
    };

    return (
        <div className="text-white">
            <div className=" p-6 rounded-lg shadow-md w-full lg:max-w-xl text-black bg-white">
                <h1 className="font-bold text-center text-xl ">Registration</h1>
                <h2 className="text-lg font-medium mb-4">Step {step} of 2</h2>
                <div className="flex mb-4">
                    <div
                        className={`w-1/2 border-r border-gray-400 ${step === 1 ? "bg-[#44edc7] text-white" : "bg-gray-200"
                            } p-2 text-center cursor-pointer`}
                        onClick={() => setStep(1)}
                    >
                        Step 1
                    </div>
                    <div
                        className={`w-1/2 ${step === 2 ? "bg-[#44edc7] text-white" : "bg-gray-200"
                            } p-2 text-center cursor-pointer`}
                        onClick={() => setStep(2)}
                    >
                        Step 2
                    </div>
                </div>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form onSubmit={handleSubmit}>
                    {step === 1 ? <div className="text-black">
                        <div className="mb-4">
                            <label className="block font-medium mb-2 text-black" htmlFor="name">
                                Email
                            </label>
                            <input
                                required
                                type="text"
                                id="email"
                                name="email"
                                className="w-full border border-gray-400 p-2"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-2 text-black" htmlFor="email">
                                Password
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-green-500" : "hidden"} />
                                <FontAwesomeIcon icon={faTimes} className={!validPwd && formData.password ? "text-red-500" : "hidden"} />
                            </label>
                            <input
                                required
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border border-gray-400 p-2"
                                value={formData.password}
                                onChange={handleChange}
                                ref={userRef}
                                autoComplete="off"
                                aria-invalid={!validPwd}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)} />
                            <p id="pwdnote" className={`${pwdFocus && formData.password && !validPwd ? "text-red-500" : "hidden"} text-sm`}>
                                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                                4 to 24 characters. Must contain with Letters, numbers, underscores.
                            </p>
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-2 text-black" htmlFor="email">
                                Confirm Password
                                <FontAwesomeIcon icon={faCheck} className={validConPwd ? "text-green-500" : "hidden"} />
                                <FontAwesomeIcon icon={faTimes} className={!validConPwd && formData.confirmPassword ? "text-red-500" : "hidden"} />
                            </label>
                            <input
                                required
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="w-full border border-gray-400 p-2"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                ref={userRef}
                                autoComplete="off"
                                aria-invalid={!validConPwd}
                                aria-describedby="conpwdnote"
                                onFocus={() => setConPwdFocus(true)}
                                onBlur={() => setConPwdFocus(false)}
                            />
                            <p id="conpwdnote" className={`${conpwdFocus && formData.confirmPassword && !validConPwd ? "text-red-500" : "hidden"} text-sm`}>
                                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                                Confirm password must be the same as password.
                            </p>
                        </div>
                    </div> : <div>
                        <div className="mb-4">
                            <label className="block font-medium mb-2 text-black" htmlFor="name">
                                Firstname
                            </label>
                            <input
                                required
                                type="text"
                                id="firstname"
                                name="firstname"
                                className="w-full border border-gray-400 p-2"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-2 text-black" >
                                Lastname
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                className="w-full border border-gray-400 p-2"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-2 text-black" >
                                Birth Date
                            </label>
                            <input
                                type="date"
                                id="birth_date"
                                name="birth_date"
                                className="w-full border border-gray-400 p-2"
                                value={formData.birth_date}
                                onChange={handleChange}
                            />
                        </div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" for="file_input">
                            Upload file
                            <FontAwesomeIcon icon={faCheck} className={validFile ? "text-green-500" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={!validFile && formData.file ? "text-red-500" : "hidden"} />
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            type="file" name='file' accept=".jpg,.jpeg,.png,.bmp" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            ref={userRef}
                            autoComplete="off"
                            aria-invalid={!validFile}
                            aria-describedby="filenote"
                            onFocus={() => setFileFocus(true)}
                            onBlur={() => setFileFocus(false)} />
                        <p id="filenote" className={`${fileFocus && formData.file && !validFile ? "text-red-500" : "hidden"} text-sm`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            Please select a valid file (JPG, PNG, or BMP under 5 MB).
                        </p>
                        <p class="mt-1 text-sm text-black " id="file_input_help">JPG,JPEG,PNG,BMP (MAX.5Mb).</p>

                    </div>}
                    <div className="flex justify-between mt-6">
                        {step > 1 && (
                            <div className="flex gap-2">
                                <div>
                                    <button
                                        className="bg-white px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400"
                                        onClick={handleBack}
                                    >
                                        Back
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-[#44edc7] px-6 py-1.5 rounded-lg text-white hover:bg-[#002c8c]"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        )}
                        {step < 2 && (
                            <button
                                className="bg-[#44edc7] px-6 py-1.5 rounded-lg text-white hover:bg-[#002c8c]"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;