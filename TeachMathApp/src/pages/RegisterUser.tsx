import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useAlert } from "../context/AlertContext";
import { ROL } from "../context/types";

const RegisterUser: React.FC = () => {

    const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="green"/>
            <path d="M9 12l2 2l4-4" stroke="white" stroke-width="2" fill="none"/>
        </svg>`;

    const crossIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="red"/>
            <path d="M9 9l6 6M15 9l-6 6" stroke="white" stroke-width="2" fill="none"/>
        </svg>`;

    //const paswd_regex = '/^(?=.*\d).{8,}$/'
    const navigate = useNavigate(); 
    const [uname, setUname] = useState('')
    const [pswd, setPswd] = useState('')
    const [rol, setRol] = useState<ROL>(ROL.TEACHER)
    const [status, setStatus] = useState(0) // response HttpStatus

    const { showAlertHandler } = useAlert();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const newuser = { username: uname, hash_pswd: pswd, rol:rol };
        console.log(rol)
        try {
            const response = await fetch("http://localhost:8080/users/register", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newuser)
            });
            setStatus(response.status)
            if (response.ok) {
                // si se ha registrado correctamente se vuelve al login
                showAlertHandler('User registered succesfully!')
                navigate("/");
            }
        } catch (e) {
            console.log("Error capturado en vista:", e); // para CORS u otro tipo de server errors
        }
    }

    return ( 
        <div className = "flex flex-col min-h-screen bg-secneutral">
            <header className = "flex flex-col p-[10%] text-secneutral bg-gradient-to-b from-secmid from-95% to-secneutral">
                <h1 className = "text-white">Create a new account</h1>
                <h2>by entering a valid format inside the fields.</h2>
            </header>
            <section className = "p-8 flex flex-col gap-6">
{/* Link to Login */}
                <p className = "underline text-xl text-maindark">
                    <Link to = "/">&larr; Back to Login</Link>
                </p>
                <div>
                    <form onSubmit={handleSubmit} method="post" className = "flex flex-col px-10 py-10 gap-6 bg-white rounded shadow">
{/* Error msg */}
                        {status === 400 &&
                            <p className = "p-2 rounded bg-red-200 border border-red-400 text-red-500">
                                Username already taken. 
                            </p>
                        }
{/* Username Field */}
                        <div className = "flex flex-col gap-1">
                            <label htmlFor="inputname2" className = "text-xl font-bold text-maindark">Username</label>
                            <input onChange = {(e) => {setUname(e.target.value)}} type="text" name="inputname2" id="inputname2" placeholder="Enter new user name "
                                className = "peer text-secdark p-2 border-3 border-secneutral rounded border-b-secmid focus:border-none focus:outline-none focus:ring-4 focus: ring-seclight focus:text-secmid"/>
                            {/* Username Requirements */}
                            <div className = "hidden peer-focus:block">
                                <div className = "flex gap-2">
                                    {/[a-zA-Z]/.test(uname) ? (
                                        <div dangerouslySetInnerHTML={{ __html: checkIcon }} />
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: crossIcon }} />
                                    )}
                                    <p className = {/[a-zA-Z]/.test(uname) ? "text-secmid" : "text-red-600"}>Username must contain <strong>letters</strong>.</p>
                                </div>
                            </div>
                        </div>
{/* Password cont */}
                        <div className = "flex flex-col gap-1">
                            <label htmlFor="inputpswd2" className = "text-xl font-bold text-maindark">Password</label>
                            <input onChange = {(e) => {setPswd(e.target.value)}} type="text" name="inputpswd2" id="inputpswd2" placeholder="Enter new password"
                                className = "peer text-secdark p-2 border-3 border-secneutral rounded border-b-secmid focus:border-none focus:outline-none focus:ring-4 focus: ring-seclight focus:text-secmid"/>
                            {/* Password Requirements */}
                            <div className = "hidden peer-focus:block">
                                <div className = "text-sm flex flex-col mt-4">
                                    <div className = "flex gap-2">
                                        {pswd.length >= 8 ? (
                                            <div dangerouslySetInnerHTML={{ __html: checkIcon }} />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: crossIcon }} />
                                        )}
                                        <p className = {pswd.length >= 8 ? "text-secmid" : "text-red-600"}>Password must contain min. <strong>8 characters</strong>.</p>
                                    </div>
                                    <div className = "flex gap-2">
                                        {/\d/.test(pswd) ? (
                                            <div dangerouslySetInnerHTML={{ __html: checkIcon }} />
                                        ) : (
                                            <div dangerouslySetInnerHTML={{ __html: crossIcon }} />
                                        )}
                                        <p className = {/\d/.test(pswd) ? "text-secmid" : "text-red-600"}>Password must contain min. <strong>1 number</strong>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
{/* Rol cont */}
                        <div className = "flex flex-col gap-1">
                            <label htmlFor="inputrol" className = "text-xl font-bold text-maindark">Rol</label>
                            <select name="inputrol" id="inputrol" className = "peer text-secdark p-2 border-3 border-secneutral rounded border-b-secmid focus:border-none focus:outline-none focus:ring-4 focus: ring-seclight focus:text-secmid"
                                value={rol} onChange={(e)=>setRol(e.target.value as ROL)}>
                                {Object.values(ROL)
                                    .filter(rol => rol !== ROL.NONE)
                                    .map(rol => (
                                    <option key={rol} value={rol}>
                                        {rol}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button disabled = {!(/\d/.test(pswd)) || !(pswd.length >= 8) || !uname} type="submit" 
                        className={`hover:cursor-pointer text-xl font-bold text-white bg-mainmid p-[5%] rounded ${(!/\d/.test(pswd) || pswd.length < 8 || !/[a-zA-Z]/.test(uname)) ? "opacity-50" : "opacity-100"}`}>
                            Register
                        </button>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default RegisterUser;