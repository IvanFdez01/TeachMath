import React, { Component, JSX } from 'react'
import { COURSES } from '../../context/types';

type Props = {
    courseName: keyof typeof COURSES;
    setCourseName: (k: keyof typeof COURSES) => void;
    errorCourse: keyof typeof COURSES;
    status: number
    setNewStudentName: (name:string) => void
    statusMessageError: (k: keyof typeof COURSES) => JSX.Element;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setHidden: (b:boolean) => void
}

const Students_AddStudent: React.FC<Props> = (props) => {
    const {courseName,
        setCourseName, 
        errorCourse,
        status,
        setNewStudentName,
        statusMessageError,
        handleSubmit,
        setHidden} = props
    return (
      <form onSubmit={handleSubmit}>
                    <div className="p-10 fixed top-0 right-0 left-0 bottom-0 bg-black opacity-80"></div>
                    <div className = "bg-mainneutral rounded px-8 py-7 fixed top-1/6 left-10 right-10 flex flex-col">
                        <button onClick={() => setHidden(true)} className = "py-3 px-5 rounded bg-maindark text-white absolute top-6 right-6 hover:cursor-pointer">
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
    );
  
};

export default Students_AddStudent;

