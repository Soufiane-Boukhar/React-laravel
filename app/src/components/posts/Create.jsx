import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/posts/store",
        formValues
      );
      setSuccessMessage("Post successfully added!");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/posts");
      }, 3000);
    } catch (error) {
      setErrorMessage("Error creating post. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <div className="p-2">
        <h1 className="text-dark-50">New Post</h1>
      </div>
      <div className="mt-5">
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              value={formValues.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              value={formValues.description}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <Link to={`/posts`} className="btn btn-dark">
              Back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
