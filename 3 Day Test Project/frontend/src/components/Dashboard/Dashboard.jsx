import React, { useState } from "react";
import Admin from "./Admin";
import CreateRecipe from "./CreateRecipe";
import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";
import Orders from "../others/Orders";
import EditOrderStatus from "./OrderStatus";

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState("dashboard");

  const renderContent = () => {
    switch (selectedView) {
      case "createRecipe":
        return <CreateRecipe />;
      case "editRecipe":
        return <EditRecipe />;
      case "deleteRecipe":
        return <DeleteRecipe />;
      case "viewOrder":
        return <Orders />;
      case "updateOrderStatus":
        return <EditOrderStatus />;
      default:
        return <h1 id="dashboard-heading">Welcome to the Admin Dashboard!</h1>;
    }
  };

  return (
    <>
      <div className="main-container">
        <Admin onNavigate={setSelectedView} />
        <div>{renderContent()}</div>
      </div>
    </>
  );
};

export default Dashboard;
