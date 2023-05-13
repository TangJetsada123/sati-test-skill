import Navbar from "../components/navbar";
import Swal from 'sweetalert2'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import jwt_decode from "jwt-decode";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../components/path";



const fileTypes = ["image/jpeg", "image/png", "image/bmp"]; // Allowed file types
const maxSize = 5 * 1024 * 1024; // 5 MB
const Edit = () => {
    const navigate = useNavigate()
    const [userToken, setUserToken] = useState('')
    const [userId, setUserId] = useState('')
    const [user, setUser] = useState({
        email: '',
        firstname: '',
        lastname: '',
        file: {}
    })
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        birth_date: "",
        file: {},
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = jwt_decode(token)
        setUserId(user.sub)
        setUserToken(token)
        if (!token) {
            navigate('/')
        }
        const header = {
            Authorization: `Bearer ${token}`
        }

        axios.get(`${api}/user/${user.sub}`, {
            headers: header
        }
        ).then((res) => {
            setUser(res.data)
        })
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const token = localStorage.getItem('token')
                    const user = jwt_decode(token)
                    await axios.put(`${api}/user/update/${user.sub}`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(async (res) => {
                        console.log(res.data)
                        await Swal.fire('Saved!', '', 'success')
                        window.location = 'profile'
                    })
                } else if (result.isDenied) {
                    await Swal.fire('Changes are not saved', '', 'info')
                    window.location.reload()
                }
            })
        } catch (error) {
            await Swal.fire('Changes are not saved', '', 'info')
            window.location.reload()
        }
    }

    return (<div>
        <Navbar />
        <div className="p-24">
            <form onSubmit={handleSubmit}>
                <div >
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="flex justify-between">
                            <h1 className=" mb-1 text-xl font-bold leading-tight tracking-tight">Edit Profile</h1>
                            <h1 className=" mb-1 text-xl font-bold leading-tight tracking-tight">
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <a href="/profile">BACK  TO  PROFILE</a>
                                </button></h1>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-6">
                            <div className="sm:col-span-4 ">
                                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                <div className="mt-2 p-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input type="text" id="disabled-input" aria-label="disabled input" class="rounded-lg text-gray-600 " value={user.email} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                <div className="mt-2 ">
                                    <input
                                        placeholder={user.firstname}
                                        required
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className="h-10 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label for="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        placeholder={user.lastname}
                                        value={formData.value}
                                        onChange={handleChange}
                                        className="h-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
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
                        <div className="col-span-full">
                            <label for="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Profile Image</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                    </svg>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600 text-center">
                                        <label for="file_input" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                            <p>Upload a file</p>
                                            <input
                                                required
                                                onChange={handleChange}
                                                type="file" name='file' accept=".jpg,.jpeg,.png,.bmp" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            />
                                            <span>JPG,JPEG,PNG,BMP (MAX.5Mb).</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <div>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div >)
}

export default Edit;