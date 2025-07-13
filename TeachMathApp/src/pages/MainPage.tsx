
import { useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { OPS } from "../context/types";
import { useSession } from "../context/SessionContext";
import Theory from "../components/sections/Theory";
import Courses from "../components/sections/Courses";

const Home: React.FC = () => {

    const [status, setStatus] = useState<OPS>(OPS.NONE)
    const { user } = useSession()

    // RELEASE: TOKENIZATION FOR CURRENT SESSION (COOKIES)
    const renderSwitch = () => {
        switch(status) {
// Student HU
            case OPS.TASKS:
                return <Tasks/>;
            case OPS.ACCOUNT:
                return <Account/>;
// Teacher HU
            case OPS.THEORY:
                return <Theory/>;
            case OPS.STUDENTS:
                return <Courses/>;
            default: //NONE, proximamente INICIO/HOME
                return <div className = "h-screen flex flex-col px-[15%] py-[20%] bg-mainneutral">
                            <h1>Hi, {user.username}</h1>
                            <h2>select an option in the sidebar to start.</h2>
                        </div>;
        }
    }
    
    return ( 
        <>
            <SideBar setStatus = {setStatus} />
            {renderSwitch()}
            <Footer/>
        </>
    );
};

export default Home;