import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";

// Importa los estilos de PrimeReact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Form() {
  const categories = [
    { icon: "pi pi-heart", label: "Plomero" },
    { icon: "pi pi-brain", label: "Gasista" },
    { icon: "pi pi-apple", label: "Electricista" },
    { icon: "pi pi-comments", label: "Carpintero" },
    { icon: "pi pi-palette", label: "Albañil" },
    { icon: "pi pi-code", label: "Cerrajero" },
    { icon: "pi pi-book", label: "Pintor" },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    category: null,
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aquí puedes agregar la lógica para enviar los datos del formulario
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">¿Tenes un trabajador que recomendar?</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre y Apellido
            </label>
            <InputText id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Celular
            </label>
            <InputText id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              Categoría
            </label>
            <Dropdown
              id="category"
              name="category"
              value={formData.category}
              options={categories}
              onChange={handleInputChange}
              optionLabel="label"
              placeholder="Selecciona una categoría"
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
              Comentario
            </label>
            <InputTextarea id="comment" name="comment" value={formData.comment} onChange={handleInputChange} rows={3} className="w-full" />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" label="Enviar" className="p-button-primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
