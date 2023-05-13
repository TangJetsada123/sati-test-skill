import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/context";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { api } from "./path";

const Navbar = () => {
    const navigate = useNavigate()
    const [onClick, setOnClick] = useState(false)
    const { myData, setMyData } = useMyContext();

    const onClickSignOut = async () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    const onClickProfile = () => {
        window.location = 'profile'
    }

    const IconMenu = () => {
        return (
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <div onClick={onClickProfile} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile
                </div>
                <div onClick={onClickSignOut} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2" >Sign out
                </div>
            </div>
        )
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = jwtDecode(token)
        axios.get(`${api}/user/${user.sub}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setMyData(res.data)
        })
    }, [])


    return (<div>
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-evently">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <a href="/home">
                                <img className="block h-10 w-auto lg:hidden" src="/sati.svg" alt="Your Company" />
                                <img className="hidden h-10 w-auto lg:block" src="/sati.svg" alt="Your Company" />
                            </a>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <a href="/home" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>
                                <a href="/product" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">SERVICE</a>
                                <a href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">ABOUT US</a>
                                <a href="/contact-us" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">CONTACT</a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative  mt-[-20px]">
                            <div onClick={() => setOnClick(!onClick)}>
                                <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-10 w-10 rounded-full bg-white object-cover " alt="" />
                                </button>
                            </div>
                            {onClick ? <IconMenu></IconMenu> : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">SERVICE</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">ABOUT US</a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">CONTACT</a>
                </div>
            </div>
        </nav>
    </div>)
}
export default Navbar;