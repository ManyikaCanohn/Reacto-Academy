import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaIdBadge, FaChalkboardTeacher, FaUserEdit, FaTimes, FaCheck, FaGraduationCap } from 'react-icons/fa';

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'student'
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/students', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(response.data);
        } catch (error) {
        console.error('Error fetching students:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setFormData({
            name: student.name,
            email: student.email,
            role: student.role
        });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/api/auth/users/${selectedStudent._id}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setShowModal(false);
        fetchStudents(); // Refresh the list
        } catch (error) {
        console.error('Error updating student:', error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedStudent(null);
    };

    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-header bg-primary text-white rounded-top-4">
                    <h4 className="card-title mb-0 fw-bold">
                        <i className="bi bi-people-fill me-2"></i>
                        Student Management
                    </h4>
                    </div>
                    <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                            <th className="fw-semibold">Student Name</th>
                            <th className="fw-semibold">Email</th>
                            <th className="fw-semibold">Student Number</th>
                            <th className="fw-semibold">Role</th>
                            <th className="fw-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                            <tr key={student._id}>
                                <td className="fw-medium">{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                <span className="badge bg-info">{student.studentNumber}</span>
                                </td>
                                <td>
                                <span className={`badge ${student.role === 'lecture' ? 'bg-success' : 'bg-primary'}`}>
                                    {student.role}
                                </span>
                                </td>
                                <td className="text-center">
                                <button
                                    className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                    onClick={() => handleEdit(student)}
                                >
                                    <i className="bi bi-pencil-square me-1"></i>
                                    Edit
                                </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>

        {/* Edit Student Modal */}
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-xl rounded-4" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
              <div className="modal-header bg-gradient-primary text-white rounded-top-4 position-relative overflow-hidden">
                <div className="d-flex align-items-center">
                  <div className="bg-white bg-opacity-20 rounded-circle p-2 me-3">
                    <FaUserEdit className="text-white" size={20} />
                  </div>
                  <div>
                    <h5 className="modal-title fw-bold mb-0">Edit Student Details</h5>
                    <small className="text-white-50">Update student information</small>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white position-absolute top-50 end-0 translate-middle-y me-3"
                  onClick={handleClose}
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                ></button>
                <div className="position-absolute top-0 end-0 w-100 h-100 bg-gradient-primary opacity-25 rounded-top-4"></div>
              </div>
  
              <div className="modal-body p-5 bg-light">
                <form className="row g-4">
                  <div className="col-12">
                    <label htmlFor="name" className="form-label fw-bold text-dark mb-2">
                      <FaUser className="me-2 text-primary" />
                      Full Name
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-white border-end-0">
                        <FaUser className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-0 shadow-sm rounded-end-3"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        required
                        style={{
                          borderLeft: 'none',
                          transition: 'all 0.3s ease',
                          fontSize: '1.1rem'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.15)'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                      />
                    </div>
                  </div>
  
                  <div className="col-12">
                    <label htmlFor="email" className="form-label fw-bold text-dark mb-2">
                      <FaEnvelope className="me-2 text-primary" />
                      Email Address
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-white border-end-0">
                        <FaEnvelope className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0 ps-0 shadow-sm rounded-end-3"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="student@example.com"
                        required
                        style={{
                          borderLeft: 'none',
                          transition: 'all 0.3s ease',
                          fontSize: '1.1rem'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.15)'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                      />
                    </div>
                  </div>
  
                  <div className="col-12">
                    <label htmlFor="studentNumber" className="form-label fw-bold text-dark mb-2">
                      <FaIdBadge className="me-2 text-primary" />
                      Student Number
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light border-end-0">
                        <FaIdBadge className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-0 rounded-end-3"
                        id="studentNumber"
                        value={selectedStudent?.studentNumber || ''}
                        readOnly
                        style={{
                          backgroundColor: '#f8f9fa',
                          borderLeft: 'none',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#495057'
                        }}
                      />
                    </div>
                    <div className="form-text text-muted mt-1">
                      <small>Student number cannot be modified</small>
                    </div>
                  </div>
  
                  <div className="col-12">
                    <label htmlFor="role" className="form-label fw-bold text-dark mb-2">
                      <FaChalkboardTeacher className="me-2 text-primary" />
                      Role
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-white border-end-0">
                        <FaChalkboardTeacher className="text-muted" />
                      </span>
                      <select
                        className="form-select border-start-0 ps-0 shadow-sm rounded-end-3"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        style={{
                          borderLeft: 'none',
                          transition: 'all 0.3s ease',
                          fontSize: '1.1rem',
                          cursor: 'pointer'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.15)'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                      >
                        <option value="student">🎓 Student</option>
                        <option value="lecture">👨‍🏫 Lecture</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
  
              <div className="modal-footer border-0 p-4 bg-white rounded-bottom-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg rounded-pill px-4 me-3 position-relative overflow-hidden"
                  onClick={handleClose}
                  style={{
                    transition: 'all 0.3s ease',
                    border: '2px solid #6c757d'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#6c757d';
                    e.target.style.color = 'white';
                    e.target.style.borderColor = '#6c757d';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(108, 117, 125, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#6c757d';
                    e.target.style.borderColor = '#6c757d';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <FaTimes className="me-2" />
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-lg rounded-pill px-4 position-relative overflow-hidden"
                  onClick={handleSave}
                  style={{
                    transition: 'all 0.3s ease',
                    background: 'linear-gradient(45deg, #0d6efd, #0056b3)',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.4)';
                    e.target.style.background = 'linear-gradient(45deg, #0056b3, #004085)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(13, 110, 253, 0.2)';
                    e.target.style.background = 'linear-gradient(45deg, #0d6efd, #0056b3)';
                  }}
                >
                  <FaCheck className="me-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Backdrop */}
            {showModal && <div className="modal-backdrop fade show" onClick={handleClose}></div>}
        </div>
    );
};

export default StudentManagement;