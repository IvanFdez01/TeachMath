
import React, { useState } from 'react';

import { OPS, ROL } from "../context/types";
import { useSession } from '../context/SessionContext';
import { Menu } from 'lucide-react';

interface SideBarProps {
  setStatus: (value: OPS) => void;
}

const SideBar: React.FC<SideBarProps> = ({setStatus}) => {

    const [hidden, setHidden] = useState(true)
    const { user } = useSession()

    const licss = "w-full text-left py-3 pl-3 border-b-2 border-b-mainlight hover:bg-mainlight hover:cursor-pointer"

    const changeSection = (op:OPS) => {
        setStatus(op)
        setHidden(true)
    }

    return (
        <div>
            {hidden ? (
                // boton abrir side-bar
                <button onClick={() =>setHidden(false)} className = "z-30 fixed top-10 left-10 p-3 bg-mainmid text-white border-4 border-mainmid rounded hover:cursor-pointer">
                    <Menu/>
                </button>
            ) : (
                // side-bar
                <>
                <div className="z-30 p-10 fixed top-0 right-0 left-0 bottom-0 bg-gray-900 opacity-80 pointer-events-none"></div>
                <div className = "z-30 text-2xl fixed top-0 bottom-0 left-0 right-1/4 bg-gray-900 shadow-xl shadow-mainlight p-10">
                    <button onClick = {() => setHidden(true)} className = "underline text-mainlight hover:cursor-pointer">
                        &larr;Hide
                    </button>
                    <ul className = "text-mainneutral flex flex-col gap-2 mt-4">
                        {user.rol == ROL.TEACHER ? 
                        <>
                            <li><button onClick={() => changeSection(OPS.STUDENTS)} className={licss}>Students</button></li>
                            <li><button onClick={() => changeSection(OPS.THEORY)} className={licss}>Theory</button></li>
                        </> : 
                        <>
                            <li><button onClick={() => changeSection(OPS.TASKS)} className={licss}>Tasks</button></li>
                            <li><button onClick={() => changeSection(OPS.THEORY)} className={licss}>Theory</button></li>
                            <li><button onClick={() => changeSection(OPS.ACCOUNT)} className={licss}>My Account</button></li>
                        </>}
                    </ul>
                </div>
                </>
            )}
        </div>
    );
};

export default SideBar;