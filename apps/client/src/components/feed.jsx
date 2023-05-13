import { useEffect, useState, useContext } from "react";
import Post from "./post";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import jwtDecode from "jwt-decode"
import axios from "axios";
import { api } from "./path";
import Swal from "sweetalert2";

const Feed = () => {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [description, setDescription] = useState('');

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
        const token = localStorage.getItem('token')
        const userId = jwtDecode(token)
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
                'Welcome to Sati!',
                '',
                'success'
            )
            window.location = '/home'
        })
    };

    return (<>
        <div className="">
            <div className="p-6">
                <div className="flex justify-evenly gap-5">
                    <div>
                        <div className="p-8 bg-white shadow-2xl">
                            <div className=" max-w-2xl">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        What's news?
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        See what's news about today!
                                    </p>
                                </div>
                                <div className="border-t border-gray-200">
                                    <dl className="w-[200px]">
                                        <div className="bg-gray-50 ">
                                            <dt className="text-sm font-medium text-gray-500 py-5 text-clip">
                                                กกต.เตือนเลือกตั้งพรุ่งนี้ ห้ามใส่เสื้อที่มีหมายเลขสอดคล้องผู้สมัคร
                                            </dt>
                                        </div>
                                        <div className="bg-white ">
                                            <dt className="text-sm font-medium text-gray-500 py-5 text-clip">
                                                “2 แคนดิเดตนายกฯ” นำทัพใหญ่ “เพื่อไทย” หาเสียงวันสุดท้าย พร้อมสู้เอาประชาธิปไตยให้ ปชช.
                                            </dt>
                                        </div>
                                        <div className="bg-gray-50 ">
                                            <dt className="text-sm font-medium text-gray-500 py-5 text-clip">
                                                รวมเลขเด็ดงวดนี้ 16/5/66 ปฏิทินจีน แม่น้ำหนึ่ง เลขดังทุกสำนัก
                                            </dt>
                                        </div>
                                        <div className="bg-gray-50 ">
                                            <dt className="text-sm font-medium text-gray-500 py-5 text-clip">
                                                สื่อสารเลือกตั้ง66 อย่างเท่าทันและเท่าเทียม ด้วย “Big Sign ภาษามือคำศัพท์ทางการเมือง” เพื่อคนหูหนวก
                                            </dt>
                                        </div>
                                        <div className="bg-gray-50 ">
                                            <dt className="text-sm font-medium text-gray-500 py-5 text-clip">
                                                เห็นลายปริศนาบนมือลูก อวด "ครู" วาดให้ แม่ตงิดใจแจ้งตำรวจ จับแก๊งลักเด็กในคราบครู
                                            </dt>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Grow w-[700px] mr-5 ml-6">
                        <div className="">
                            <div className="flex-box ">
                                <div className="text-2xl font-bold  ml-6">Home</div>
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
                        <div >
                            <div className="p-8 bg-white shadow-2xl h-[100%]">
                                <div className="w-[300px]">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Trends for you
                                        </h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                            Only on Sati Trending
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-200">
                                        <dl className="w-full">
                                            <div className="bg-gray-50 py-5 px-5  ">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    #ก้าวไกลทั้งแผ่นดิน
                                                </dt>
                                            </div>
                                            <div className="bg-white py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    #ปราศัยใหญ่เพื่อไทย
                                                </dt>

                                            </div>
                                            <div className="bg-gray-50  py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    #วอลเลย์บอลหญิง
                                                </dt>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    #BABYMONSTER
                                                </dt>

                                            </div>
                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    #Sati
                                                </dt>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Feed;