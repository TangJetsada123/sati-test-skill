import MultiStepForm from "../components/form";

const Register = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="ml-auto mr-auto flex rounded-xl w-[70vw] h-[80vh] drop-shadow-2xl">
            <div className=" text-[#062e48] flex-box w-[100%] bg-[#062e48] border-none">
                    <div className="text-center">
                        <img className="w-[30%] ml-auto mr-auto mt-28 hover:scale-110 " src="/sati.svg"></img>
                    </div>
                    <div className="text-center mt-20">
                        <p><a href="https://sati.co.th/" className="font-bold text-white">www.sati.co.th</a></p>
                    </div>
                </div>
                <div className="bg-[#062e48]  text-white w-[100%] h-[80vh] overflow-auto">
                    <div className="flex-box p-8 ">
                        <MultiStepForm />
                        <div className="text-center flex mt-4">
                            <p >  Already a user? <a href="/" className="text-white">LOGIN</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register