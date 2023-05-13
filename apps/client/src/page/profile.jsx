import { useEffect, useState } from "react"
import Navbar from "../components/navbar";
import ProfileAccount from "../components/profile-account";
import UserFeed from "../components/user-feed";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { api } from "../components/path";

const Profile = () => {
    const [showProfile, setShowProfile] = useState(false)
    const [user, setUser] = useState({
        email: '',
        firstname: '',
        lastname: '',
        profile_image: ''
    })
    const token = localStorage.getItem('token')
    const userId = jwt_decode(token)
    const handleEdit = () => {
        navigate('/edit-profile')
    }

    const handleLogOut = () => {
        localStorage.removeItem('token')
        window.location = '/'
    }

    useEffect(() => {
        axios.get(`${api}/user/${userId.sub}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((res) => {
                setUser(res.data)
            })
    })

    return (<div>
        <Navbar />
        <div  className="flex-box ml-16 mr-16 mt-10">
        <div className="flex justify-end gap-5 mr-80">
            <div>
                <button onClick={() => setShowProfile(false)} class=" text-sm font-bold text-white uppercase rounded bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg  transition transform hover:-translate-y-0.5 w-[130px] h-[50px]">
                    Your Feed
                </button>
            </div>
            <div>
                <button onClick={() => setShowProfile(true)} class="font-bold text-sm text-white uppercase rounded bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg transition transform hover:-translate-y-0.5 w-[130px] h-[50px]">
                    Edit Profile
                </button>
            </div>
        </div>
        <div className="flex justify-around ">
            <div class="flex flex-col  items-center mt-16 w-[200px]">
                <img class="w-44 h-44 rounded-full shadow-2xl object-cover" src={user.profile_image} alt="User profile image" />
                <h3 class="mt-4 text-xl font-medium">{user.firstname}{user.lastname}</h3>
                <h4 class="text-gray-400 font-medium">Profile Image</h4>
                <button onClick={() => handleLogOut()} className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">  LogOut</button>
            </div>
            <div className="p-16 grow">
                {showProfile ? (<ProfileAccount />) : <UserFeed />}
            </div>
        </div>
        </div>
    </div>)
}

export default Profile;