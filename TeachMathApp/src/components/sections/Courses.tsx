
import React, { useEffect, useState } from 'react';
import { useSession } from '../../context/SessionContext';
import { TeacherStudent } from '../../context/types';
import Students_AddStudent from './Courses_AddStudent';
import Students_List from './Courses_List';
import { SquarePlus } from 'lucide-react';

const Courses: React.FC = () => {
    
    // State Contexto
    const {user} = useSession()

    // States para el form de añadir nuevo estudiante
    const [hidden, setHidden] = useState(true)

    const [students, setStudents] = useState<TeacherStudent[]>([]);

    const getStudentList = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/teachers/${user.username}/students`)
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
        <div className = "flex flex-col px-[15%] py-[20%] gap-4 bg-mainneutral">
            <div>
                <h1>Your Courses, {user.username}</h1>
                <h2>are shown below.</h2>
            </div>
{/* Add New Student Button & Form */}            
            <button className = "flex gap-2 justify-center items-center p-4 bg-maindark text-white rounded hover:cursor-pointer hover:bg-mainmid transition duration-200 border-b-4 border-mainlight"
                    onClick = {() => {setHidden(false)}}>
                <SquarePlus />
                <h2> Add Course</h2>
            </button>
            {!hidden && 
               <Students_AddStudent 
                    username={user.username}
                    getStudentList={getStudentList}
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

export default Courses;