import Navbar from "../components/navbar";
import Feed from '../components/feed'
import Footer from "../components/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('userData')
        if(!token || !user){
            navigate('/')
        }
    },[])


    return (
        <div>
            <Navbar />
            <Feed id=""/>
            <Footer />
        </div >)
}

export default Homepage;