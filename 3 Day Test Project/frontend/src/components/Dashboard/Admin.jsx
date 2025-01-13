import React from "react";

const Admin = ({ onNavigate }) => {
  return (
    <div className="navcontainer">
      <nav className="nav">
        <div className="nav-upper-options">
          <div
            className="nav-option option1"
            onClick={() => onNavigate("createRecipe")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2729/2729063.png"
              className="nav-img"
              alt="dashboard"
            />
            <h3>Create Recipes</h3>
          </div>

          <div
            className="option2 nav-option"
            onClick={() => onNavigate("editRecipe")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/16202/16202123.png"
              className="nav-img"
              alt="articles"
            />
            <h3>Edit Recipes and Categories</h3>
          </div>
          <div
            className="nav-option option3"
            onClick={() => onNavigate("deleteRecipe")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
              className="nav-img"
              alt="report"
            />
            <h3>Delete Recipes and Categories</h3>
          </div>
          <div
            className="nav-option option4"
            onClick={() => onNavigate("updateOrderStatus")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1721/1721936.png"
              className="nav-img"
              alt="institution"
            />
            <h3>Update Order Status</h3>
          </div>
          <div
            className="nav-option option5"
            onClick={() => onNavigate("viewOrder")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/686/686887.png"
              className="nav-img"
              alt="blog"
            />
            <h3>View Orders</h3>
          </div>
          <div className="nav-option logout">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
              className="nav-img"
              alt="logout"
            />
            <h3>Logout</h3>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Admin;
