import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { api } from "./path"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Post = (props) => {
    const [post, setPost] = useState([])
    const [profile_image, setProfileImage] = useState("")
    const [selectedPost, setSelectedPost] = useState(null);
    const [count, setCount] = useState(0);
    const [editedText, setEditedText] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState(null);
    const [currentUser, setCurrentUser] = useState(false)
    const [postId, setPostId] = useState(null)
    const token = localStorage.getItem('token')
    const data = JSON.parse(localStorage.getItem('userData'))
    const navigate = useNavigate()

    useEffect(() => {
        const header = {
            Authorization: `Bearer ${token}`
        }
        axios.get(`${api}/post/${props.id}`, {
            headers: header
        }).then((res) => {
            if (res.data) {
                setPost(res.data)
            }
        })
        if (props.id) {
            setCurrentUser(true)
        } else {
            setCurrentUser(false)
        }

    }, [])

    const handleEdit = (post) => {
        setSelectedPost(post);
        setEditedText(post.text);
        setImage(post.post_image)
        setPostId(post._id)
    };


    const handleChangePost = (e) => {
        setEditedText(e.target.value);
    };

    const hangleChangeImage = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedImage);
    }

    const handleDelete = async (post) => {
        const confirm = {
            confirm: true
        }
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(`${api}/post/${post._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    },
                        {
                            confirm
                        }).then(()=>{
                            axios.get(`${api}/user/${data._id}`,{
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }).then((res)=>{
                                localStorage.setItem('userData',JSON.stringify(res.data))
                                window.location.reload()
                            })
                        })
                    navigate('/profile')
                    
                }
                catch (error) {
                    throw new error()
                }


            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${api}/post/${postId}`, {
            text: editedText,
            file: image
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(async (res) => {
            setSelectedPost(false)
            await Swal.fire(
                'Post Success!',
                '',
                'success'
            ).then(() => {
                window.location = '/home'
                window.location.reload()
            })
        })

    };


    return (
        <>
            {post ? (<div>
                {post.map((data) => {
                    return (
                        <div key={data.id} className="flex-box p-6  border-b-2 bg-white hover:bg-gray-100">
                            <div className="flex">
                                <div className="mr-6">
                                    <img className="rounded-full  h-12 w-12 object-cover" src={data.user.profile_image} alt="Profile"></img>
                                </div>
                                <div className="flex-box">
                                    <div>
                                        <span className="font-bold">{data.user.firstname} {data.user.lastname}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            {new Date(data.user.createdAt).toLocaleDateString().substring(0, 10)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5 ml-[73px]">{data.text}</div>
                            <div className="ml-[73px]">
                                {data.post_image && <img src={data.post_image} alt="Post" className="rounded-3xl"></img>}
                            </div>
                            <div className="flex  mt-3 justify-evenly">
                                <div className="hover:bg-red-200" onClick={() => setCount(count + 1)}>
                                    <FavoriteBorderOutlinedIcon /> {count}
                                </div>
                                <div className="hover:bg-blue-100" onClick={() => handleEdit(data)}>
                                    <AnalyticsOutlinedIcon />
                                </div>
                                {currentUser ? (<div>
                                    <div className="hover:bg-blue-100" onClick={() => handleDelete(data)}
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </div></div>) : null}
                            </div>
                        </div>
                    );
                })}
                {currentUser && selectedPost && (
                    <div class="fixed top-0 left-0 bottom-0 right-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                        <div class="bg-white p-6 rounded-lg absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <div className="flex justify-between">
                                <h2 class="text-xl font-bold mb-4">Edit Post</h2>
                                <h2 onClick={() => setSelectedPost(false)} class="text-xl font-bold mb-4">X</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <label for="text" class="block font-medium mb-2">Text:</label>
                                <textarea
                                    id="text"
                                    name="text"
                                    class="w-full h-32 border-gray-400 rounded-lg py-2 px-4 mb-4 focus:outline-0"
                                    onChange={(e) => handleChangePost(e)}
                                    value={editedText}
                                ></textarea>
                                <div>
                                    {previewImage ? (<div><img
                                        src={previewImage}
                                        alt="Selected image preview"
                                        class="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={hangleChangeImage} />
                                    </div>) : (
                                        <div>
                                            <img
                                                src={image}
                                                alt="Selected image preview"
                                                class="w-full h-48 object-cover rounded-lg mb-4"
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={hangleChangeImage} />
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>) : (<div>No Post  item</div>)}

        </>
    );
}

export default Post;