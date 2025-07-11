import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario } from '../auth/firebase'; 
import { dispararSweetBasico } from '../assets/SweetAlert';

function Login() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [show, setShow] = useState(true)

    const { login, user, logout, admin } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loginEmail.includes('@')) {
            alert('Ingresa un correo electrónico válido.');
            return;
        }

    try {
        await login(loginEmail.trim(), loginPassword);
        console.log('Inicio de sesión exitoso');
        navigate('/');
    } catch (error) {
        console.error('Error de autenticación:', error.code, error.message);
        alert('Correo o contraseña incorrectos');
    }
};

    const registrarUsuario = async (e) => {
        e.preventDefault();
    
    try {
        const userCredential = await crearUsuario(registerEmail.trim(), registerPassword);
        const userFirebase = userCredential.user;
        dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar")
        
        if (userFirebase?.email) {
            console.log('Usuario registrado:', userFirebase.email);
            await login(registerEmail.trim(), registerPassword); 
            navigate('/');
        }
        } catch (error) {
            if(error.code == "auth/invalid-credential"){
                dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar")
            }if(error.code == "auth/weak-password"){
                dispararSweetBasico("Contraseña debil", "Password should be at least 6 characters", "error", "Cerrar")
                }
        }
    };

    function handleShow (e) {
        e.preventDefault();
        setShow(!show)
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
    };

    if (user || admin) {
        return (
        <form onSubmit={handleLogout}>
            <p>Sesión iniciada como: {user.email}</p>
            <button type="submit">Cerrar sesión</button>
        </form>
        )
    } if (!user && show) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Iniciar sesión</h2>
                    <div>
                    <label>Correo electrónico:</label>
                    <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        autoComplete="username"
                        required
                    />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
                <button style={{marginTop:"2px"}}  onClick={handleShow}>Registrate</button>

            </div>
        )
    } if (!user && !show) {
        return(
            <div>
                <form onSubmit={registrarUsuario}>
                    <h2>Registrarse</h2>
                    <div>
                        <label>Correo electrónico:</label>
                        <input
                            type="email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                            <input
                                type="password"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                    </div>
                    <button type="submit">Registrarse</button>
                </form>
                <button style={{marginTop:"2px"}} onClick={handleShow}>Iniciar Sesión</button>
            </div>
        );
    }   
}   

export default Login;
