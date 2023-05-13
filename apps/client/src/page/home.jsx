import Navbar from "../components/navbar";
import Feed from '../components/feed'
import Footer from "../components/footer";
const Homepage = () => {
    const [post, setPost] = ''


    return (
        <div>
            <Navbar />
            <Feed />
            <Footer />
        </div >)
}

export default Homepage;