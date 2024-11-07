import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";

function Dashboard() {
  // Datos de prueba para las tarjetas
  const cardData = [
    { title: "Card 1", content: "Contenido de la tarjeta 1" },
    { title: "Card 2", content: "Contenido de la tarjeta 2" },
    { title: "Card 3", content: "Contenido de la tarjeta 3" },
  ];

  // Función para renderizar las tarjetas en cuadrícula
  const renderCards = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <Card key={index} className="p-4">
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p>{card.content}</p>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <TabView>
        <TabPanel header="Todos">{renderCards()}</TabPanel>
        <TabPanel header="Aceptados">{renderCards()}</TabPanel>
        <TabPanel header="Rechazados">{renderCards()}</TabPanel>
      </TabView>
    </div>
  );
}

export default Dashboard;
