import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { api } from "./path"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';

const Post = () => {
    const [post, setPost] = useState([])
    const [profile_image, setProfileImage] = useState("")
    const [count, setCount] = useState(0)


    useEffect(() => {
        const token = localStorage.getItem('token')
        const header = {
            Authorization: `Bearer ${token}`
        }
        axios.get(`${api}/post`, {
            headers: header
        }).then((res) => {
            setPost(res.data)
        })

    }, [post, profile_image])

    return (
        <>
            {<div >
                {post.map((data) => {
                    return <div className="flex-box p-6  border-b-2 bg-white hover:bg-gray-100">
                        <div className="flex">
                            <div className="mr-6">
                                <img className="rounded-full  h-12 w-12" src={data.user.profile_image}></img>
                            </div>
                            <div className="flex-box">
                                <div><span className="font-bold">{data.user.firstname}{data.user.lastname}</span></div>
                                <div><span className="font-medium">{new Date(data.user.createdAt).toLocaleDateString().substring(0, 10)}</span></div>
                            </div>
                        </div>
                        <div className="mb-5 ml-[73px]">{data.text}</div>
                        <div className="ml-[73px]"><img src={data.post_image} className="rounded-3xl"></img></div>
                        <div className="flex  mt-3 justify-evenly">
                            <div className="hover:bg-red-200" onClick={() => setCount(count + 1)}>
                                <FavoriteBorderOutlinedIcon /> {count}
                            </div>
                            <div className="hover:bg-blue-100" ><AnalyticsOutlinedIcon /></div>
                        </div>
                    </div>
                })}
            </div>}
            <div>
            </div>
        </>)
}

export default Post;