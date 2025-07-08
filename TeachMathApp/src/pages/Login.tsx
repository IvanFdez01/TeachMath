import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { useAlert } from "../context/AlertContext";
import { useSession } from "../context/SessionContext";
import { ROL } from "../context/types";


const Login: React.FC = () => {

    const navigate = useNavigate(); 
    const [uname, setUname] = useState('')
    const [pswd, setPswd] = useState('')
    const [status, setStatus] = useState(0) // solo para mensaje de invalid credentials 

    const { showAlertHandler } = useAlert();
    const { setUsername,setRol } = useSession()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newuser = { username: uname, hash_pswd: pswd };
        try {
            const response = await fetch(`http://localhost:8080/users/login`, { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newuser)
            });
            setStatus(response.status)
            console.log(status)
            if (response.ok) {
                // contexto session
                const data = await response.json()
                setUsername(data.username)
                setRol(data.rol as ROL)
                // - - -
                showAlertHandler(`Login succesfull, ${uname}!`)
                navigate("/home")
            }
        } catch (e) {
            console.log("Error capturado en vista:", e); // para CORS u otro tipo de server errors
        }
    }

    return ( 
        <>
        <div className = "flex flex-col min-h-screen">
            <header className = "flex flex-col p-[10%] text-mainneutral bg-gradient-to-b from-mainmid from-95% to-mainneutral">
                <h1 className = "text-white">Welcome back,</h1>
                <h2>we're happy to see you again!</h2>

            </header>
            <section className = "bg-mainneutral p-8">
                <form onSubmit={handleSubmit} className = "flex flex-col px-10 py-10 gap-6 bg-white rounded shadow">
{/* Invalid Cred error */}           
                    {status === 401 && // 401:UNAUTHORIZED
                        <p className = "p-2 rounded bg-red-200 border border-red-400 text-red-500">
                            Invalid credentials. 
                        </p>
                    }
{/* Username Field */}          
                    <div className = "flex flex-col gap-1">
                        <label htmlFor="inputname" className = "text-xl font-bold text-maindark">Username</label>
                        <input onChange={(e)=>setUname(e.target.value)} type="text" name="inputname" id="inputname" placeholder = "Type your username here"
                            className = "text-maindark p-2 border-3 border-mainneutral rounded border-b-mainmid focus:border-none focus:outline-none focus:ring-4 focus: ring-mainlight focus:text-mainmid"/>
                    </div>
{/* Password Field */}
                    <div className = "flex flex-col gap-1">
                        <label htmlFor="inputpswd" className = "text-xl font-bold text-maindark">Password</label>
                        <input onChange={(e)=>setPswd(e.target.value)} type="password" name="inputpswd" id="inputpswd" placeholder = "Type your password here"
                            className = "text-maindark p-2 border-3 border-mainneutral rounded border-b-mainmid focus:border-none focus:outline-none focus:ring-4 focus: ring-mainlight focus:text-mainmid"/>
                    </div>
{/* Submit Bttn */}
                    <button type="submit" className = "text-xl font-bold text-white bg-mainmid p-[5%] rounded hover:cursor-pointer">
                        Log in
                    </button>
                    
                    <p className = "flex flex-col items-center gap-0 text-maindark">
                        Do not have an account? 
                        <Link to = "/registeruser" className = "text-mainmid underline ">
                            Create account here
                        </Link>
                    </p>
                </form>
            </section>
            <Footer/>
        </div>
        </>
    );
};

export default Login;
