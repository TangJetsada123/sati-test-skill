import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { api } from "../components/path";

const ProfileAccount = () => {
    const [clickResetPwd, setClickResetPwd] = useState(false)
    const [user, setUser] = useState({
        email: '',
        firstname: '',
        lastname: '',
        profile_image: '',
        birth_date: '',
        createdAt: ''
    })
    const [resetData, setResetData] = useState({
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = jwt_decode(token)
        if (!token) {
            navigate('/')
        }
        axios.get(`${api}/user/${user.sub}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setUser(res.data)
        })
    }, [])

    const onClickDelete = () => {
        const token = localStorage.getItem('token')
        const user = jwt_decode(token)
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
                axios.delete(`${api}/user/${user.sub}`, {
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
                window.location = '/'
            }
        }))
    }

    const handleClickReset = () => {
        setClickResetPwd(true)
    }

    const handleBack = () => {
        window.location = 'profile'
        window.location.reload()
    }

    const handleChangePassword = async () => {
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
                    const user = jwt_decode(token)
                    if (result.isConfirmed) {
                        const password = {
                            password: resetData.password
                        }
                        const header = {
                            Authorization: `Bearer ${token}`
                        }
                        try {
                            const res = await axios.put(`${api}/user/reset-password/${user.sub}`, password, {
                                headers: header
                            }).then(async () => {
                                await Swal.fire(
                                    'Your Password has been updated!',
                                    'success'
                                )
                                setClickResetPwd(false)
                                window.location = '/profile'
                            })
                        } catch (error) {
                            await Swal.fire({
                                icon: 'error',
                                title: 'Your Password must not same as last 5 older password !',
                            }

                            )
                        }

                    }
                }
                )
            )
        }
    }
    const handlePassword = (e) => {
        setResetData({
            ...resetData,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = () => {
        window.location = 'edit-profile'
    }

    return (<div>
        <h1 className="text-4xl font-medium text-gray-700">PROFILE ACCOUNT</h1>
        <div className="flex gap-5 mt-10">
            <div>
                <div>
                    <div className="p-8 bg-white shadow-2xl w-[70vw] h-[100%]">
                        {!clickResetPwd ? (
                            <div className=" max-w-2xl">
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
                                                {user.email}
                                            </dd>
                                        </div>
                                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                First name
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {user.firstname}
                                            </dd>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Last name
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {user.lastname}
                                            </dd>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Birth Date
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {new Date(user.birth_date).toLocaleDateString().substring(0, 10)}
                                            </dd>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                Joined
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                {new Date(user.createdAt).toLocaleDateString().substring(0, 10)}
                                            </dd>
                                        </div>
                                        <div className="space-x-8 flex">
                                            <button onClick={() => handleEdit()} className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"> Edit Profile</button>
                                            <button onClick={handleClickReset} className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">  Reset Password</button>
                                        </div>
                                        <button onClick={() => onClickDelete()} className="text-white py-2 px-4 uppercase rounded bg-red-600 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Delete User</button>
                                    </dl>
                                </div>
                            </div>) : <div>
                            <div className="flex justify-between">
                                <div className="mt-5">
                                    <h2 className="text-xl font-bold leading-tight tracking-tight ">
                                        Change Password
                                    </h2>
                                </div>
                                <div>
                                    <button onClick={()=>handleBack()}   type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                       BACK TO PROFILE
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5"  >
                                <div>
                                    <label className="block mb-2 text-sm font-medium ">New Password</label>
                                    <input
                                        value={resetData.password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={handlePassword}
                                        className=" text-black bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium ">New Password</label>
                                    <input
                                        value={resetData.confirmPassword}
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        onChange={handlePassword}
                                        className=" text-black bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " required="" />
                                </div>
                                <button onClick={handleChangePassword} className="text-white py-2 px-4 rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Reset Password</button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default ProfileAccount