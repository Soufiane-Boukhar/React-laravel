import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function ListPosts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deletePostId, setDeletePostId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/posts?page=${currentPage}`);
      setPosts(response.data.posts.data);
      setTotalPages(response.data.posts.last_page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const refreshData = setInterval(fetchData, 2000);
    return () => clearInterval(refreshData);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    const handleDelete = async () => {
      try {
        if (deletePostId !== null) {
          await axios.delete(`http://127.0.0.1:8000/api/posts/${deletePostId}/delete`);
          fetchData();
          setDeletePostId(null);
        } 
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };

    handleDelete(); 
  }, [deletePostId]);

  const confirmDelete = (postId) => {
    if (postId !== null) {
      const isConfirmed = window.confirm("Are you sure you want to delete this post?");
      if (isConfirmed) {
        setDeletePostId(postId);
      }
    } else {
      console.error("Invalid post ID for deletion.");
    }
  };
  
  
  
  return (
    <>
      <div className="container d-flex justify-content-between align-items-center">
        <h1>Posts</h1>
        <Link to="/post/create" className="btn btn-info" style={{ height: '40px' }}>Add New</Link>
      </div>

      <div className="card mt-3">
        <div className="card-header d-flex justify-content-end">
          <div className="mb-3 input-group">
            <input type="text" className="form-control form-control-sm" placeholder="Search..." />
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-search"></i></span>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <p>Loading...</p>
          ) : posts && posts.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th style={{ width: "40px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>
                      <div className="d-flex">
                        <Link to={`/post/${post.id}/edit`} className="btn btn-info">
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger ml-2"
                          onClick={() => confirmDelete(post.id)}
                         >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No posts found.</p>
          )}
        </div>

        <div className="card-footer">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {[...Array(totalPages).keys()].map((page) => (
                <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                    {page + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default ListPosts;
