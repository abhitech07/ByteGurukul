import React, { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    search: ''
  });

  useEffect(() => {
    loadCourses();
  }, [filters]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await courseService.getAllCourses(filters);
      
      if (response.success) {
        setCourses(response.data);
      } else {
        setError('Failed to load courses');
      }
    } catch (err) {
      setError(err.error || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="course-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Search courses..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
        
        <select 
          value={filters.category} 
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="web-development">Web Development</option>
          <option value="data-science">Data Science</option>
          <option value="mobile-development">Mobile Development</option>
        </select>
      </div>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} />
            <div className="course-info">
              <h3>{course.title}</h3>
              <p className="description">{course.description}</p>
              <p className="instructor">By: {course.instructor?.name}</p>
              <p className="price">₹{course.price}</p>
              <div className="course-meta">
                <span className="rating">⭐ {course.averageRating}</span>
                <span className="students">👥 {course.studentsEnrolled}</span>
              </div>
              <button className="enroll-btn">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;