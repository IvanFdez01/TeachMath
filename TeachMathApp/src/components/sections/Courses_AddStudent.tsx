import React, { useEffect, useState } from 'react'
import { COURSES } from '../../context/types';
import { useAlert } from '../../context/AlertContext';

type Props = {
    username: string
    getStudentList: () => void
    setHidden: (b:boolean) => void
}

const Courses_AddStudent: React.FC<Props> = (props) => {

    const {showAlertHandler} = useAlert()
    
    const [status, setStatus] = useState(-1)
    const [newStudentName, setNewStudentName] = useState("")
    const [courseName, setCourseName] = useState<keyof typeof COURSES>("MATH")
    // State para que no haya bug en el err_msg
    const [errorCourse, setErrorCourse] = useState<keyof typeof COURSES>("MATH");
    
    const {
        username,
        getStudentList,
        setHidden
    } = props

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8080/users/teachers/${username}/add-student`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({student_uname:newStudentName, courseName:courseName})
            });
            setStatus(response.status)
            // CUIDADO: no usar en el condicional el state status
            // porque esta funcion es async y el state se actualiza
            // cuando esta acaba
            if (response.status === 201) {
                showAlertHandler(`Student '${newStudentName}' has been registered succesfully in course '${courseName}'`)
                setHidden(true)
                getStudentList()
            }
            else if (response.status === 409)
                setErrorCourse(courseName)
        } catch (e) {
            console.log("Error capturado en vista:", e); // para CORS u otro tipo de server errors
        }
    }

    // Seguridad en re-renders
    useEffect(() => {
        setCourseName("MATH");
        setStatus(-1)
    }, []);


    const statusMessageError = () => {
        let classname = "mt-6 p-2 rounded bg-red-200 border border-red-400 text-red-600"
        if (status === 404)
            return <div className = {classname}>
                Student does not exist.
            </div>
        else // status === 409
            return <div className = {classname}>
                {`You are already the student's teacher for the course: ${COURSES[errorCourse]}.`}
            </div>
    }

    return (
      <form onSubmit={handleSubmit} className = "z-40">
                    <div className="p-10 fixed top-0 right-0 left-0 bottom-0 bg-black opacity-80"></div>
                    <div className = "bg-mainneutral rounded px-8 py-7 fixed top-1/6 left-10 right-10 flex flex-col">
                        <button onClick={() => setHidden(true)} className = "py-3 px-5 rounded bg-maindark text-white absolute top-6 right-6 hover:cursor-pointer">
                            <h2>X</h2>
                        </button>
                        <h1><u>New Course</u></h1>
                        {(status === 404 || status === 409) && 
                            statusMessageError()}
                {/* student name input */}
                        <div className = "mt-7 flex flex-col gap-2">
                            <label htmlFor="studentnameinput">
                                <h2>What's your new Student name?</h2>
                            </label>
                            <input onChange={(e)=>setNewStudentName(e.target.value)} type="text" name="studentnameinput" id="studentnameinput" placeholder = "Type the student name here"
                            className = "w-[100%] text-maindark p-2 rounded border-b-4 border-mainmid focus:border-none focus:outline-none focus:ring-4 focus: ring-mainlight focus:text-maindark"/>
                        </div>
                {/* course input */}                        
                        <div className = "mt-7 flex flex-col gap-2">
                            <label htmlFor="courseinput">
                                <h2>What course will you be teaching?</h2>
                            </label>
                            <select name="inputcourse" id="inputcourse" className = "peer text-maindark p-2 rounded border-b-4 border-mainmid focus:border-none focus:outline-none focus:ring-4 focus: ring-mainlight"
                                value={courseName} onChange={(e)=>setCourseName(e.target.value as keyof typeof COURSES)}>
                                {Object.entries(COURSES)
                                    .map(([key, label]) => (
                                    <option key={key} value={key} className = "text-maindark bg-white hover:bg-mainlight">
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className = {`mt-7 block mx-auto rounded w-[40%] p-3 text-white 
                                ${newStudentName !== "" ? 'bg-mainmid hover:cursor-pointer hover:bg-maindark' : 'bg-mainmid opacity-80 cursor-not-allowed'}`}
                                type="submit"
                                disabled={newStudentName !== ""}>
                            Add Course
                        </button>
                    </div>
                </form>
    );
  
};

export default Courses_AddStudent;

