import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Carousel } from "primereact/carousel";
import { Chip } from "primereact/chip";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import workerImage from "../assets/worker.webp";

export default function Main() {
  const [workers, setWorkers] = useState([]);

  const menuItems = [
    { label: "Inicio", icon: "pi pi-fw pi-home" },
    { label: "¿Queres agregar un nuevo trabajador?", icon: "pi pi-fw pi-list" },
    { label: "Contacto", icon: "pi pi-fw pi-envelope" },
  ];

  const menubarStart = <span className="text-2xl font-bold text-primary">yaoficios</span>;

  useEffect(() => {
    const fetchWorkers = async () => {
      const workersCollection = collection(db, "workers");
      const workerSnapshot = await getDocs(workersCollection);
      const workerList = workerSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Workers data from Firestore:", workerList);
      setWorkers(workerList);
    };

    fetchWorkers();
  }, []);

  const workerTemplate = (worker) => (
    <div className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer h-40 w-40 mr-4">
      <i className="pi pi-user text-4xl text-blue-500 mb-2"></i>
      <span className="text-sm text-center font-bold">{worker.name}</span>
      <br />
      <span>
        <Chip
          label={worker.tag}
          style={{
            fontSize: "9px",
            padding: "1px 4px",
            backgroundColor: getTagColor(worker.tag),
            color: "white",
          }}
          className="mt-2"
        />
      </span>
    </div>
  );

  const getTagColor = (tag) => {
    switch (tag) {
      case "Plomero":
        return "#3498db"; // Azul
      case "Gasista":
        return "#e67e22"; // Naranja
      case "Electricista":
        return "#f1c40f"; // Amarillo
      case "Carpintero":
        return "#8e44ad"; // Púrpura
      case "Albañil":
        return "#2ecc71"; // Verde
      case "Cerrajero":
        return "#e74c3c"; // Rojo
      case "Pintor":
        return "#1abc9c"; // Turquesa
      default:
        return "#bdc3c7"; // Gris para otros casos
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Menubar model={menuItems} start={menubarStart} className="bg-white" />

      <div className="container mx-auto pt-6 px-4">
        <span className="p-input-icon-left w-full">
          <i className="pi pi-search" />
          <InputText placeholder="¿Qué servicio estás buscando?" className="w-full" />
        </span>
      </div>

      <div className="relative mt-8 container mx-auto px-4">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 -z-10" />

        <div className="relative flex justify-center items-center mb-12">
          <div className="relative w-full max-w-md" style={{ height: "35vh" }}>
            <img
              src={workerImage}
              alt="Solicita tu turno en San Juan"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundSize: "contain",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>

        <div className="mt-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Trabajadores</h2>
            <Button label="Ver todos" className="p-button-text p-button-info" />
          </div>

          <Carousel
            value={workers}
            numVisible={4}
            numScroll={1}
            responsiveOptions={[
              { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
              { breakpoint: "768px", numVisible: 2, numScroll: 1 },
              { breakpoint: "560px", numVisible: 1, numScroll: 1 },
            ]}
            itemTemplate={workerTemplate}
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
