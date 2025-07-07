
import { useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import { OPS } from "../context/types";
import { useSession } from "../context/SessionContext";
import Students from "../components/homepage/Students";

const Home: React.FC = () => {

    const [status, setStatus] = useState<OPS>(OPS.NONE)
    const { user } = useSession()

    // RELEASE: TOKENIZATION FOR CURRENT SESSION (COOKIES)
    const renderSwitch = () => {
        switch(status) {
            case OPS.TASKS:
                return <Tasks/>;
            case OPS.THEORY:
                return <Theory/>;
            case OPS.ACCOUNT:
                return <Account/>;
            case OPS.STUDENTS:
                return <Students/>;
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