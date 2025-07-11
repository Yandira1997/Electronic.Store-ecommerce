import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../auth/firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { loginEmailPass } from "../auth/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Sincroniza el estado de autenticación con Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const adminEmails = ["admin@gmail.com", "admin2@gmail.com"]; //Contaseña: administrador
                setAdmin(adminEmails.includes(currentUser.email));
                console.log("Usuario logueado:", currentUser.email);
            } else {
                setUser(null);
                setAdmin(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Login con email y contraseña
    const login = (email, password) => {
        return loginEmailPass(email, password)
            
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                setAdmin(false);
                localStorage.removeItem('authToken');
            })
            .catch((error) => console.error("Error al cerrar sesión", error));
    };

    function verificacionLog(){
        const userToken = localStorage.getItem("authToken")
        if(userToken && userToken == "fake-token-admin@gmail.com"){
            setAdmin(true)
            return
        }if(userToken){
            setUser(userToken)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, admin, loading, verificacionLog  }}>
            {children}
        </AuthContext.Provider> );
    }

    export const useAuthContext = () => useContext(AuthContext);