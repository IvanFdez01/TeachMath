
import React, { useState } from 'react';
import { useSession } from '../../context/SessionContext';
import { COURSES } from '../../context/types';

const Students: React.FC = () => {
    
    const {user} = useSession()
    const teacher_uname = user.username

    // States para el form de añadir nuevo estudiante
    const [hidden, setHidden] = useState(true)
    const [status, setStatus] = useState(-1)
    const [newStudentName, setNewStudentName] = useState("")
    const [courseName, setCourseName] = useState<keyof typeof COURSES>("MATH")
    // State para que no varie el err_msg
    const [errorCourse, setErrorCourse] = useState<keyof typeof COURSES>("MATH");


    // State de lista de estudiantes
    const [students, setStudents] = useState<[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8080/users/teachers/${teacher_uname}/add-student`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({student_uname:newStudentName, courseName:courseName})
            });
            setStatus(response.status)
            if (status === 409)
                setErrorCourse(courseName)
        } catch (e) {
            console.log("Error capturado en vista:", e); // para CORS u otro tipo de server errors
        }
    }

    // obj:Record<x,y>: exige a err_msgs que sea un mapa con claves de 
    // x y valores y
    // EJ. err_msgs:Record<StatusCode,(key keyof typeof COURSES)=>string>
    // sea type StatusCode = 404 | 409 
    const err_msgs: {
        404: () => string;
        409: (key: keyof typeof COURSES) => string;
    } = {
        404: () => "Student does not exist.",
        409: (key) => `You are already the student's teacher for the course: ${COURSES[errorCourse]}.`
    };

    const statusMessageError = (key: keyof typeof COURSES) => {
        let classname = "mt-6 p-2 rounded bg-red-200 border border-red-400 text-red-600"
        if (status === 404)
            return <div className = {classname}>{err_msgs[404]()}</div>
        else // status === 409
            return <div className = {classname}>{err_msgs[409](key)}</div>
    }

    const getStudentList = async () => {
        try {
            const response = await fetch(`http://localhost:8080/teachers/${teacher_uname}/students`)
            if (!response.ok)
                throw new Error("Error fetching students.")

            const list = await response.json()


        } catch (e) {
            console.log("Error capturado en vista:", e);
        }
    }

    return (
        <>
        <div className = "h-screen flex flex-col px-[15%] py-[20%] gap-4 bg-mainneutral">
            <div>
                <h1>Your Students {user.username}</h1>
                <h2>are shown below.</h2>
            </div>
{/* Add New Student Button & Form */}            
            <button className = "p-4 bg-maindark text-white rounded hover:cursor-pointer hover:bg-mainmid"
                    onClick = {() => setHidden(false)}>
                <h2>&#43; Add Student</h2>
            </button>
            {!hidden && 
                <form onSubmit={handleSubmit}>
                    <div className="p-10 fixed top-0 right-0 left-0 bottom-0 bg-black opacity-80"></div>
                    <div className = "bg-mainneutral rounded px-8 py-7 fixed top-1/6 left-10 right-10 flex flex-col">
                        <button className = "py-3 px-5 rounded bg-maindark text-white absolute top-6 right-6 hover:cursor-pointer" onClick={() => setHidden(true)}>
                            <h2>X</h2>
                        </button>
                        <h1>New Student</h1>
                        {(status === 404 || status === 409) && 
                            statusMessageError(courseName)}
                {/* student name input */}
                        <div className = "mt-7 flex flex-col gap-2">
                            <label htmlFor="studentnameinput">
                                <h2>What's your new Student name?</h2>
                            </label>
                            <input onChange={(e)=>setNewStudentName(e.target.value)} type="text" name="studentnameinput" id="studentnameinput" placeholder = "Type the student name here"
                            className = "w-[100%] text-maindark p-2 border-3 border-mainneutral rounded border-b-mainmid focus:border-none focus:outline-none focus:ring-4 focus: ring-mainlight focus:text-maindark"/>
                        </div>
                {/* course input */}                        
                        <div className = "mt-7 flex flex-col gap-2">
                            <label htmlFor="courseinput">
                                <h2>What course will you be teaching?</h2>
                            </label>
                            <select name="inputcourse" id="inputcourse" className = "peer text-maindark p-2 border-3 border-mainneutral rounded border-b-mainmid focus:border-none focus:outline-none focus:ring-4 focus: ring-mainlight"
                                value={courseName} onChange={(e)=>setCourseName(e.target.value as keyof typeof COURSES)}>
                                {Object.entries(COURSES)
                                    .map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className = "mt-7 block mx-auto rounded w-[40%] p-4 bg-mainmid text-white hover:cursor-pointer hover:bg-maindark" 
                                type="submit">
                            Add Student
                        </button>
                    </div>
                </form>
            }
{/* Students List */}     

        </div>
        </>
    );
};

export default Students;