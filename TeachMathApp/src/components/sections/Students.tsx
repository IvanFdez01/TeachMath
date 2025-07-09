
import React, { useEffect, useState } from 'react';
import { useSession } from '../../context/SessionContext';
import { COURSES, TeacherStudent } from '../../context/types';
import { useAlert } from '../../context/AlertContext';
import Students_AddStudent from './Students_AddStudent';
import Students_List from './Students_List';

const Students: React.FC = () => {
    
    // States Contexto
    const {user} = useSession()
    const teacher_uname = user.username
    const {showAlertHandler} = useAlert()

    // States para el form de añadir nuevo estudiante
    const [hidden, setHidden] = useState(true)
    const [status, setStatus] = useState(-1)
    const [newStudentName, setNewStudentName] = useState("")
    const [courseName, setCourseName] = useState<keyof typeof COURSES>("MATH")
    // State para que no varie el err_msg
    const [errorCourse, setErrorCourse] = useState<keyof typeof COURSES>("MATH");

    // State de lista de estudiantes
    const [students, setStudents] = useState<TeacherStudent[]>([]);

    // Seguridad en re-renders
    useEffect(() => {
        if (!hidden) setCourseName("MATH");
    }, [hidden]);


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

    const statusMessageError = (key: keyof typeof COURSES) => {
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

    const getStudentList = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/teachers/${teacher_uname}/students`)
            if (!response.ok)
                throw new Error("Error fetching students.")

            setStudents(await response.json())

        } catch (e) {
            console.log("Error capturado en vista:", e);
        }
    }

    useEffect(() => {getStudentList()},[])

    return (
        <>
        <div className = "h-screen flex flex-col px-[15%] py-[20%] gap-4 bg-mainneutral">
            <div>
                <h1>Your Students {user.username}</h1>
                <h2>are shown below.</h2>
            </div>
{/* Add New Student Button & Form */}            
            <button className = "p-4 bg-maindark text-white rounded hover:cursor-pointer hover:bg-mainmid"
                    onClick = {() => {setHidden(false);setStatus(-1)}}>
                <h2>&#43; Add Student</h2>
            </button>
            {!hidden && 
               <Students_AddStudent 
                    courseName={courseName}
                    setCourseName={setCourseName}
                    errorCourse={errorCourse}
                    status={status}
                    setNewStudentName={setNewStudentName}
                    statusMessageError={statusMessageError}
                    handleSubmit={handleSubmit}
                    setHidden={setHidden}
                /> 
            }
{/* Students List */}     
            <Students_List
                students={students}    
            />
        </div>
        </>
    );
};

export default Students;