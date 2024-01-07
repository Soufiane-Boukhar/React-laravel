import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/posts/${id}/edit`
        );
        const { title, description } = response.data.post;
        setPostData({
          title,
          description,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/posts/${id}/update`,
        postData
      );
      setSuccessMessage("Post updated successfully!");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
        setErrorMessage("Error updating post. Please try again.");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        setSuccessMessage(""); 
    }
  };
  
  return (
    <>
      <div className="p-2">
        <h1 className="text-dark-50">Edit Post {postData.title}</h1>
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
              value={postData.title}
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
              value={postData.description}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <Link to={`/posts`} className="btn btn-dark">
              Back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPost;
