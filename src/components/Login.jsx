import React, { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

const Notification = ({ severity, message }) => {
  return <div className={`notification ${severity}`}>{message}</div>;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.current.show({ severity: "success", summary: "Inicio de sesión exitoso", life: 3000 });
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Error al iniciar sesión. Verifica tus credenciales.");
      toast.current.show({ severity: "error", summary: "Error", detail: error.message, life: 3000 });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen bg-gray-100">
      <Card className="p-4 shadow-2 w-full md:w-6 lg:w-4">
        <h2 className="text-center text-2xl font-semibold mb-4">Iniciar Sesión</h2>

        {errorMessage && <Notification severity="error" message={errorMessage} />}

        <form onSubmit={handleSubmit}>
          <div className="field mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" required />
          </div>

          <div className="field mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña
            </label>
            {/* Contenedor para el input de contraseña y el botón de ojo */}
            <div className="relative">
              <InputText
                id="password"
                type={showPassword ? "text" : "password"} // Cambiar entre password y text
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
              {/* Botón para mostrar/ocultar la contraseña */}
              <Button
                icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"} // Icono de ojo
                className="p-button-text absolute right-0 top-0 h-full" // Estilos para posicionar el botón
                onClick={toggleShowPassword}
                type="button" // Evitar submit
              />
            </div>
          </div>

          <Button label="Iniciar Sesión" icon="pi pi-sign-in" type="submit" className="w-full p-button-primary" />
        </form>
      </Card>
      <Toast ref={toast} />
    </div>
  );
}
