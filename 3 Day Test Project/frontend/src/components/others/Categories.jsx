import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/recipes/fetch-recipe-category"
        );
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <Link key={category._id} to={`/users/recipes/${category._id}`}>
          <div className="category-card">
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
