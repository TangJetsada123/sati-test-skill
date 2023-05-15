import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2";
import { api } from "../components/path";
import { useNavigate } from "react-router-dom";



const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const ProfileAccount = () => {
    const [clickResetPwd, setClickResetPwd] = useState(false)
    const navigate = useNavigate()
    const data = JSON.parse(localStorage.getItem("userData"))
    const [resetData, setResetData] = useState({
        current_password: '',
        password: '',
        confirmPassword: ''
    })
    

    const handlePassword = (e) => {
        setResetData({
            ...resetData,
            [e.target.name]: e.target.value
        })
    }


    const onClickDelete = () => {
        const token = localStorage.getItem('token')
        return (Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const confirm = {
                    confirm: true
                }
                axios.delete(`${api}/user/${data._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                },
                    {
                        confirm
                    }
                ).then(
                    await Swal.fire(
                        'Your User has been deleted!',
                        'We will redirect you to login page',
                        'success'
                    ))
                localStorage.removeItem('token')
                navigate('/')
            }
        }))
    }

    const handleClickReset = () => {
        setClickResetPwd(true)
    }

    const handleChangePassword = async () => {
        const validate = PASSWORD_REGEX.test(resetData.password)
        if (!validate) {
            Swal.fire({
                icon: 'error',
                title: ` Password must contain at least one Uppercase letter, one Lowercase letter, one digit, and one special symbol @$!%*?&. `,
            }
            )
        } 
        
        if (resetData.password == resetData.confirmPassword) {
                return (
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, Change it!'
                    }).then(async (result) => {
                        const token = localStorage.getItem('token')
                        if (result.isConfirmed) {
                            const password = {
                                current_password: resetData.current_password,
                                password: resetData.password
                            }
                            const header = {
                                Authorization: `Bearer ${token}`
                            }
                            try {
                                await axios.put(`${api}/user/reset-password/${data._id}`, password, {
                                    headers: header
                                }).then(async (res) => {
                                    await Swal.fire(
                                        'Your Password has been updated!',
                                        'success'
                                    )
                                    setClickResetPwd(false)
                                    navigate('/profile')
                                    window.location.reload()
                                })
                            } catch (error) {
                                await Swal.fire({
                                    icon: 'error',
                                    title: `${error['response'].data.message}`,
                                }
                                )
                            }
                        }
                    }
                    )
                )
            }else{
                await Swal.fire({
                    icon: 'error',
                    title: `Password and Confirm Password missmatch`,
                })
            }
        

    }

    const handleEdit = () => {
        navigate('/edit-profile')
    }

    return (<div>
        <div className="flex ">
            <div>
                <div className="">
                    <div className="p-6 bg-white shadow-2xl w-[60vw] h-[100%] ">
                        {!clickResetPwd ? (
                            <div className="">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        User Information
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Details and informations about user.
                                    </p>
                                </div>
                                <div className="border-t border-gray-200">
                                    <dl className="w-full">
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Email
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {data.email}
                                            </dd>
                                        </div>
                                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                First name
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {data.firstname}
                                            </dd>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Last name
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {data.lastname}
                                            </dd>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Birth Date
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {new Date(data.birth_date).toLocaleDateString().substring(0, 10)}
                                            </dd>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Joined
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {new Date(data.createdAt).toLocaleDateString().substring(0, 10)}
                                            </dd>
                                        </div>
                                        <div className="space-x-8 flex">
                                            <button onClick={handleEdit} className="ml-6 text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Edit Profile</button>
                                            <button onClick={handleClickReset} className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">  Reset Password</button>
                                        </div>
                                        <button onClick={() => onClickDelete()} className="ml-6 text-white py-2 px-4 uppercase rounded bg-red-600 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Delete User</button>
                                    </dl>
                                </div>
                            </div>) : <div>
                            <div className="flex">
                                <div className="mt-5">
                                    <h2 className="text-xl font-bold leading-tight tracking-tight ">
                                        Change Password
                                    </h2>
                                </div>
                            </div>
                            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5"  >
                                <div>
                                    <label className="block mb-2 text-sm font-medium ">Current Password
                                    </label>
                                    <input
                                        value={resetData.current_password}
                                        type="password"
                                        name="current_password"
                                        id="current_password"
                                        onChange={handlePassword}
                                        className=" text-black bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium ">
                                        New Password
                                    </label>
                                    <input
                                        required
                                        value={resetData.password}
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={handlePassword}
                                        className=" text-black bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium ">
                                        Confirm Password
                                    </label>
                                    <input
                                        value={resetData.confirmPassword}
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        onChange={handlePassword}
                                        className=" text-black bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""
                                    />
                                </div>
                                <button onClick={handleChangePassword} className="text-white py-2 px-4 rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Reset Password</button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div >)
}

export default ProfileAccount