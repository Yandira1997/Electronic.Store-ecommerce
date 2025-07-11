import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario } from '../auth/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Login.css";

function LoginBoost() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [esRegistro, setEsRegistro] = useState(false);
  const [errorConexion, setErrorConexion] = useState(false);

  const { login, user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorConexion(false); 

    try {
      if (esRegistro) {
        await crearUsuario(email.trim(), password);
        toast.success("Registro exitoso");
        await login(email.trim(), password);
      } else {
        await login(email.trim(), password);
        toast.success("Inicio de sesión exitoso");
      }

      navigate('/');
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Credenciales incorrectas");
      } else if (error.code === "auth/weak-password") {
        toast.warn("Contraseña débil: mínimo 6 caracteres");
      } else if (error.code === "auth/network-request-failed") {
        setErrorConexion(true);
        toast.error("Sin conexión con Firebase. Verifica tu red.");
      } else {
        toast.error("Error desconocido");
        console.error("Error:", error.code, error.message);
      }
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    toast.info("Sesión cerrada");
  };

  if (user) {
    return (
      <form onSubmit={handleLogout} className="login-container">
        <div className="login-card text-center">
          <p>Sesión iniciada como: <strong>{user.email}</strong></p>
          <button type="submit" className="btn btn-danger w-100 mt-3">Cerrar sesión</button>
        </div>
      </form>
    );
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h3 className="text-center mb-4">{esRegistro ? "Registrarse" : "Iniciar Sesión"}</h3>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={esRegistro ? "new-password" : "current-password"}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {esRegistro ? "Registrarse" : "Iniciar sesión"}
        </button>

        <button
          type="button"
          className="btn btn-secondary w-100 mt-2"
          onClick={() => setEsRegistro(!esRegistro)}
        >
          {esRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>

        {errorConexion && (
          <div className="alert alert-warning mt-3 text-center">
            ⚠️ No se pudo conectar con Firebase. Revisa tu conexión a internet.
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginBoost;




