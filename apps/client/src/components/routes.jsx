import {
    Routes, Route, BrowserRouter
} from 'react-router-dom';
import Register from '../page/register';
import Login from '../page/login';
import MultiStepForm from './Form';
import Edit from '../page/edit-profile';
import Homepage from '../page/home'
import Profile from '../page/profile'
import Post from './post';
import Navbar from './navbar';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/edit-profile' element={<Edit />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/information" element={<MultiStepForm />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/feed" element={<Post/>} />
                <Route path="/navbar" element={<Navbar />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;