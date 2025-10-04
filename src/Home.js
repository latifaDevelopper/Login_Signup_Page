import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Create from './Create'; 
import Update from './Update'; 
import './App.css'; 

const Home = () => {
  const [data, setData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setData(response.data);
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete the user. Please try again.');
    }
  };

  const confirmDelete = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const openUpdateModal = (user) => {
    setCurrentUser(user);
    setShowUpdateModal(true);
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-dark' style={{ minHeight: '100vh' }}>
      <div className='bg-light rounded shadow w-75 p-4'>
        <h2 className='text-center mb-4'>My Modern CRUD App</h2>
        <button className='btn btn-add' onClick={() => setShowCreateModal(true)}>Add User</button>

        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">No users found</td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id} className='align-middle'>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>
                        <button onClick={() => openUpdateModal(item)} className="btn btn-outline-primary me-2">Edit</button>
                        <button onClick={() => confirmDelete(item)} className="btn btn-outline-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay fade-in">
          <div className="modal-content slide-in">
            <div className="modal-header">
              <h5>Create User</h5>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <Create setShowModal={setShowCreateModal} />
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && currentUser && (
        <div className="modal-overlay fade-in">
          <div className="modal-content slide-in">
            <div className="modal-header">
              <h5>Update User</h5>
              <button className="close-btn" onClick={() => setShowUpdateModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <Update user={currentUser} setShowModal={setShowUpdateModal} />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentUser && (
        <div className="modal-overlay fade-in">
          <div className="modal-content slide-in">
            <div className="modal-header">
              <h5>Delete User</h5>
              <button className="close-btn" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete {currentUser.username}?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => {
                handleDelete(currentUser.id);
                setShowDeleteModal(false);
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
