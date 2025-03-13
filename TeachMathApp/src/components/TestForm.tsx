
import React, { useState } from 'react';
// import { enviarDatos } from '../services/api';



const Formulario: React.FC = () => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {

        const message = { content } 
        console.log(JSON.stringify(message))
        
        e.preventDefault();
        const response = await fetch("http://localhost:8080/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
          });
      
          console.log(response)
          setContent("")
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe algo..."
            />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default Formulario;