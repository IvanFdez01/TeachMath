
import { ShieldBan, Upload,  } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSession } from '../../context/SessionContext';
import Theory_UploadFile from './Theory_UploadFile';

const Theory: React.FC = () => {

    const {user} = useSession()

    // para POST upload form 
    const [hidden, setHidden] = useState(true)

    //para get
    const [fileList,setFileList] = useState<string[]>([])

    const getFiles = async () => {
        fetch(`http://localhost:8080/users/uploads/${user.username}/`)
            .then(res => {
                if (!res.ok)
                    throw new Error("Error obtaining files.")
                return res.json()
            })
            .then((list:string[]) => setFileList(list))
            .catch(e => console.error("Error: ",e))
    }

    useEffect(() => {getFiles()}, [])

    return (
        <>
            <div className="flex flex-col px-[15%] py-[20%] gap-4 bg-mainneutral">
                <div>
                    <h1>Upload your files,</h1>
                    <h2>then unlock them for your students!</h2>
                </div>
{/* Upload button and error msg*/}
            
                
                <button onClick = {() => setHidden(false)} className = "block w-fit cursor-pointer rounded-xl bg-maindark px-6 py-3 text-white font-semibold shadow-md hover:bg-mainmid transition duration-200">
                    <h2 className = "flex gap-4"><Upload/> Upload PDF</h2>
                </button>
                {!hidden && 
                    <Theory_UploadFile
                        username={user.username}
                        setHidden={setHidden}
                        getFiles={getFiles}
                    />
                }
                
{/* My Content List (in sections) */}
                <ul className = "mt-6 flex flex-col gap-4">
                {
                    fileList.map(filename => (
                        <li key = {filename}>
                            <a 
                                href={`http://localhost:8080/users/uploads/${user.username}/${filename}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className = "flex gap-3 hover:underline"
                            >
                                <ShieldBan /> {filename}
                            </a>
                        </li>
                    ))
                }
                </ul>
            </div>
        </>
    );
};

export default Theory;