// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPosts from './components/posts/List';
import Sidebar from './components/layouts/Sidebar';
import Header from './components/layouts/Header';
import Create from './components/posts/Create';
import EditPost from './components/posts/Edit';




function App() {
  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <Header />
          <Sidebar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/posts" element={<ListPosts />} />
              <Route path="/post/create" element={<Create/>} /> 
              <Route path="/post/:id/edit" element={<EditPost/>} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
