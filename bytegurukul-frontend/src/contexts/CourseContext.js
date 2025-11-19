import React, { createContext, useState, useContext, useEffect } from 'react';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [completedCourses, setCompletedCourses] = useState([]);

  // Load from localStorage on app start
  useEffect(() => {
    const savedEnrollments = localStorage.getItem('bytegurukul_enrollments');
    const savedProgress = localStorage.getItem('bytegurukul_course_progress');
    const savedCompleted = localStorage.getItem('bytegurukul_completed_courses');
    
    if (savedEnrollments) setEnrolledCourses(JSON.parse(savedEnrollments));
    if (savedProgress) setCourseProgress(JSON.parse(savedProgress));
    if (savedCompleted) setCompletedCourses(JSON.parse(savedCompleted));
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('bytegurukul_enrollments', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('bytegurukul_course_progress', JSON.stringify(courseProgress));
  }, [courseProgress]);

  useEffect(() => {
    localStorage.setItem('bytegurukul_completed_courses', JSON.stringify(completedCourses));
  }, [completedCourses]);

  // Enroll in a course
  const enrollInCourse = (course) => {
    setEnrolledCourses(prev => {
      const alreadyEnrolled = prev.find(c => c.id === course.id);
      if (alreadyEnrolled) return prev;
      
      const newEnrollment = {
        ...course,
        enrolledDate: new Date().toISOString(),
        progress: 0,
        currentModule: 0,
        currentLesson: 0
      };
      
      return [...prev, newEnrollment];
    });
  };

  // Update course progress
  const updateCourseProgress = (courseId, progress, currentModule = 0, currentLesson = 0) => {
    setCourseProgress(prev => ({
      ...prev,
      [courseId]: { progress, currentModule, currentLesson, lastUpdated: new Date().toISOString() }
    }));

    // Update enrolled courses progress
    setEnrolledCourses(prev => 
      prev.map(course => 
        course.id === courseId 
          ? { ...course, progress, currentModule, currentLesson }
          : course
      )
    );

    // Mark as completed if progress is 100%
    if (progress === 100) {
      setCompletedCourses(prev => {
        if (!prev.includes(courseId)) {
          return [...prev, courseId];
        }
        return prev;
      });
    }
  };

  // Check if user is enrolled in a course
  const isEnrolled = (courseId) => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  // Get course progress
  const getCourseProgress = (courseId) => {
    return courseProgress[courseId] || { progress: 0, currentModule: 0, currentLesson: 0 };
  };

  // Get enrolled course by ID
  const getEnrolledCourse = (courseId) => {
    return enrolledCourses.find(course => course.id === courseId);
  };

  // Calculate overall learning progress
  const getOverallProgress = () => {
    if (enrolledCourses.length === 0) return 0;
    const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / enrolledCourses.length);
  };

  const value = {
    enrolledCourses,
    courseProgress,
    completedCourses,
    enrollInCourse,
    updateCourseProgress,
    isEnrolled,
    getCourseProgress,
    getEnrolledCourse,
    getOverallProgress
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

// Custom hook to use course context
export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}