import { useEffect, useState } from "react"
import Navbar from "../components/navbar";
import ProfileAccount from "../components/profile-account";
import UserFeed from "../components/user-feed";
import { useNavigate } from "react-router-dom";
import { api } from "../components/path";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate()
    const [showProfile, setShowProfile] = useState(false)
    const data = JSON.parse(localStorage.getItem("userData"))
    const token = localStorage.getItem('token')

    const handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        navigate('/')
    }

    return (<div>
        <Navbar />
        <div className="flex-box mt-4 ml-16">
            <div className="flex justify-stretch  ">
                <div class="flex flex-col  items-center mt-16 w-[300px]">
                    <img class="w-44 h-44 rounded-full shadow-2xl object-cover" src={data.profile_image} alt="User profile image" />
                    <h4 class="text-gray-400 font-medium mt-5">{data.post_count} Post</h4>
                    <h3 class="mt-4 text-xl font-medium">{data.firstname}  {data.lastname}</h3>
                    <h4 class="text-gray-400 font-medium">Profile Image</h4>
                    <button onClick={handleLogOut} className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">  LogOut</button>
                </div>
                <div className="grow">
                    <div className="flex justify-end gap-2 mr-72 mb-4">
                        <div>
                            <button onClick={() => setShowProfile(false)} class="p-2 text-sm font-bold text-white uppercase rounded bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg  transition transform hover:-translate-y-0.5 w-[100px] h-[30px]">
                                Your Feed
                            </button>
                        </div>
                        <div>
                            <button onClick={() => setShowProfile(true)} class="p-2 font-bold text-sm text-white uppercase rounded bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg transition transform hover:-translate-y-0.5 w-[100px] h-[30px]">
                                Profile
                            </button>
                        </div>
                    </div>
                    {showProfile ? (<ProfileAccount />) : <UserFeed />}
                </div>
            </div>
        </div>
    </div>)
}

export default Profile;