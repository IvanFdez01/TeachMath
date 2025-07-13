import { Upload } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    username: string
    setHidden: React.Dispatch<React.SetStateAction<boolean>>
    getFiles: () => Promise<void>
}

const Theory_UploadFile: React.FC<Props> = (props) => {
   
    const {
        username,
        setHidden,
        getFiles
    } = props
    

    const [section, setSection] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [status, setStatus] = useState(-1)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) 
            setSelectedFile(file)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("file",selectedFile!)
        const back_url = window.location.hostname === "localhost" ? 
            "http://localhost:8080" : "/api"; //sustituir api por volum
        try {
            const response = await fetch(`${back_url}/users/uploads/${username}`, {
                method: "POST",
                body: formdata
            })

            if (!response.ok) 
                throw new Error("Upload failed.")

            setStatus(response.status)
            setSelectedFile(null)
            getFiles()

        } catch (e) {
            console.error("Error uploading file: ",e)
        }
    }

    const statusMessageError = () => {
            let classname = "mt-6 p-2 rounded bg-red-200 border border-red-400 text-red-600"
            if (status === 404)
                return <div className = {classname}>
                    Section already exists.
                </div>
            else // status === 409
                return <div className = {classname}>
                    Upload failed. Try again. 
                </div>
    }

    return (
      <form onSubmit={handleSubmit} className = "z-40">
                    <div className="p-10 fixed top-0 right-0 left-0 bottom-0 bg-black opacity-80"></div>
                    <div className = "bg-mainneutral rounded px-8 py-7 fixed top-1/6 left-10 right-10 flex flex-col">
                        <button onClick={() => setHidden(true)} className = "py-3 px-5 rounded bg-maindark text-white absolute top-6 right-6 hover:cursor-pointer">
                            <h2>X</h2>
                        </button>
                        <h1><u>Upload File</u></h1>
                        {(status === 404 || status === 409) && 
                            statusMessageError()}
                {/* Section input */}
                        <div className = "mt-6 flex flex-col gap-2">
                            <label htmlFor="sectioninput">
                                <h2>Section (creates new if does not exists)</h2>
                            </label>
                            <input onChange={(e)=>setSection(e.target.value)} type="text" name="sectioninput" id="sectioninput" placeholder = "Type the section name here"
                            className = "w-[100%] text-maindark p-2 rounded border-b-4 border-mainmid focus:border-none focus:outline-none focus:ring-4 focus: ring-mainlight focus:text-maindark"/>
                        </div>
                {/* Upload file input */}                        
                        <div className = "mt-7 flex flex-col gap-2">
                            <label className="">
                                <h2>Select File</h2>
                            </label>
                            <div className = "flex gap-4 w-[100%]">
                                <label className="flex justify-center items-center w-[25%] cursor-pointer bg-maindark text-white text-sm p-4 rounded hover:bg-mainmid transition border-b-4 border-mainlight">
                                    <Upload />
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                                <div className = "w-[70%] flex gap-8 items-center rounded-xl">
                                    <h2 className="text-gray-700 truncate text-lg">
                                        {selectedFile ? selectedFile!.name : "No file selected yet."}
                                    </h2>
                                </div>
                            </div> 
                        </div>
                        <button
                            className={`mt-7 block mx-auto rounded w-[40%] p-3 text-white 
                                ${selectedFile && section ? 'bg-mainmid hover:cursor-pointer hover:bg-maindark' : 'bg-mainmid opacity-80 cursor-not-allowed'}`}
                            type="submit"
                            disabled={!(selectedFile && section)}
                            >
                            <h2>Upload</h2>
                        </button>
                    </div>
                </form>
    );
  
};

export default Theory_UploadFile;

