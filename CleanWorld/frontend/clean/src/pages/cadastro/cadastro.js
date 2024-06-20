import React, { useState, useEffect } from "react";
import axios from "axios";

export function Cadastro () {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async ()=> {

            try {
                const response = await axios.get("http://localhost:3006/api/usuario");

                setUsuarios(response.data);
            } catch(error) {
                console.log(error)
            }
        };

        fetchUsuarios();
    }, []);

    return (

        <div>
            <h1>Usuarios</h1>

            <ul>

                {(usuarios || []).map((usuario) => {
                    return (<li> {usuario.id} - {usuario.nome} </li>)
                })}

            </ul>

        </div>

    );
}