import { useEffect, useState, useContext } from "react";
import Post from "./post";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import jwtDecode from "jwt-decode"
import axios from "axios";
import { api } from "./path";
import Swal from "sweetalert2";

const UserFeed = () => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [description, setDescription] = useState('');
    const [user, setUser] = useState({
        email: '',
        firstname: '',
        lastname: '',
        profile_image: ''
    })
    const token = localStorage.getItem('token')
    const userId = jwtDecode(token)

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


    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedImage);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${api}/post`, {
            text: description,
            file: image,
            userId: userId.sub
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }

        }).then(async (res) => {
            await Swal.fire(
                'Post Success!',
                '',
                'success'
            )
            window.location = '/profile'
        })
    };

    return (<>
        <div className="">
            <div className="p-6">
                <div className="flex justify-evenly gap-5 mr-20 ">
                    <div className="Grow w-[700px] mr-5 ml-6">
                        <div className="">
                            <div className="flex-box ">
                                <div className="flex justify-between">
                                    <div className="text-2xl font-bold  ml-6">Your Feed</div>
                                </div>
                                <div>
                                    <form className="bg-white shadow-md rounded px-8  pb-8 mb-4" onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <TextareaAutosize className="border-gray-300 border-b-[0.5px] bg-[white] text-black  text-lg  w-[100%] min-w-[300px] max-w-full h-[20vh] pt-10 p-6" placeholder="What's happening?!" id="description"
                                                value={description}
                                                onChange={(event) => setDescription(event.target.value)} >
                                            </TextareaAutosize>
                                        </div>
                                        <div className="mb-4">
                                            {previewImage && (
                                                <img
                                                    className="mt-4 h-48 w-auto mx-auto object-cover"
                                                    src={previewImage}
                                                    alt="Preview"
                                                />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="relative hover:bg-blue-100">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                    type="submit"
                                                >
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                                        onChange={handleImageUpload}
                                                    />
                                                    Select Image
                                                </button>
                                            </div>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                type="submit"
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className=" bg-white shadow-2xl">
                                <Post />
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default UserFeed;