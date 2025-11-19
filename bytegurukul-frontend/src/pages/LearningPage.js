import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourse } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';

function LearningPage() {
  const { courseId } = useParams();
  const { enrolledCourses, getEnrolledCourse, updateCourseProgress, getCourseProgress } = useCourse();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock course content
  const courseContent = {
    'ds-101': {
      id: 'ds-101',
      name: 'Data Structures',
      modules: [
        {
          id: 'module-1',
          title: 'Introduction to Data Structures',
          description: 'Learn the fundamentals of data structures and algorithms',
          lessons: [
            {
              id: 'lesson-1-1',
              title: 'What are Data Structures?',
              type: 'video',
              duration: '15:30',
              content: 'In this lesson, we will understand what data structures are and why they are important in computer science.',
              videoUrl: '#',
              resources: [
                { name: 'Lecture Slides', type: 'pdf', url: '#' },
                { name: 'Code Examples', type: 'zip', url: '#' }
              ]
            },
            {
              id: 'lesson-1-2',
              title: 'Time and Space Complexity',
              type: 'video',
              duration: '20:15',
              content: 'Learn how to analyze the efficiency of algorithms using Big O notation.',
              videoUrl: '#',
              resources: [
                { name: 'Complexity Cheat Sheet', type: 'pdf', url: '#' }
              ]
            },
            {
              id: 'lesson-1-3',
              title: 'Big O Notation Deep Dive',
              type: 'video',
              duration: '18:45',
              content: 'Detailed understanding of Big O, Omega, and Theta notations.',
              videoUrl: '#',
              resources: []
            },
            {
              id: 'lesson-1-4',
              title: 'Quiz: Complexity Analysis',
              type: 'quiz',
              duration: '10:00',
              content: 'Test your understanding of time and space complexity.',
              questions: [
                {
                  question: 'What is the time complexity of accessing an element in an array?',
                  options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                  correctAnswer: 0
                },
                {
                  question: 'Which notation describes the worst-case scenario?',
                  options: ['Big O', 'Big Omega', 'Big Theta', 'All of the above'],
                  correctAnswer: 0
                }
              ]
            }
          ]
        },
        {
          id: 'module-2',
          title: 'Arrays and Linked Lists',
          description: 'Master linear data structures and their applications',
          lessons: [
            {
              id: 'lesson-2-1',
              title: 'Arrays: Fundamentals',
              type: 'video',
              duration: '22:10',
              content: 'Understanding arrays, their properties, and common operations.',
              videoUrl: '#',
              resources: [
                { name: 'Array Implementation', type: 'code', url: '#' }
              ]
            },
            {
              id: 'lesson-2-2',
              title: 'Linked Lists Introduction',
              type: 'video',
              duration: '25:30',
              content: 'Learn about singly and doubly linked lists.',
              videoUrl: '#',
              resources: []
            }
          ]
        }
      ]
    }
  };

  const course = courseContent[courseId];
  const enrolledCourse = getEnrolledCourse(courseId);

  // Redirect if not enrolled
  useEffect(() => {
    if (!enrolledCourse) {
      alert('You are not enrolled in this course');
      navigate('/courses');
      return;
    }

    // Load progress
    const progress = getCourseProgress(courseId);
    setCurrentModule(progress.currentModule || 0);
    setCurrentLesson(progress.currentLesson || 0);
  }, [courseId, enrolledCourse, navigate, getCourseProgress]);

  if (!course || !enrolledCourse) {
    return (
      <div style={styles.loading}>
        <h2>Loading course...</h2>
      </div>
    );
  }

  const currentModuleData = course.modules[currentModule];
  const currentLessonData = currentModuleData?.lessons[currentLesson];

  const handleNextLesson = () => {
    if (currentLesson < currentModuleData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentModule < course.modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentLesson(0);
    } else {
      // Course completed
      setIsCompleted(true);
      updateCourseProgress(courseId, 100, currentModule, currentLesson);
    }

    // Update progress
    const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completedLessons = course.modules.slice(0, currentModule).reduce((sum, module) => sum + module.lessons.length, 0) + currentLesson + 1;
    const progress = Math.round((completedLessons / totalLessons) * 100);
    
    updateCourseProgress(courseId, progress, currentModule, currentLesson);
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentLesson(course.modules[currentModule - 1].lessons.length - 1);
    }
  };

  const handleModuleSelect = (moduleIndex) => {
    setCurrentModule(moduleIndex);
    setCurrentLesson(0);
  };

  const handleLessonSelect = (lessonIndex) => {
    setCurrentLesson(lessonIndex);
  };

  const calculateProgress = () => {
    const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completedLessons = course.modules.slice(0, currentModule).reduce((sum, module) => sum + module.lessons.length, 0) + currentLesson;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <Link to="/courses" style={styles.backLink}>
            ← Back to Courses
          </Link>
          <h1 style={styles.courseTitle}>{course.name}</h1>
          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${calculateProgress()}%`
              }}
            />
            <span style={styles.progressText}>
              {calculateProgress()}% Complete
            </span>
          </div>
        </div>
      </div>

      <div style={styles.learningLayout}>
        {/* Sidebar - Course Navigation */}
        <div style={styles.sidebar}>
          <div style={styles.modulesList}>
            <h3 style={styles.sidebarTitle}>Course Content</h3>
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id} style={styles.moduleItem}>
                <div 
                  style={{
                    ...styles.moduleHeader,
                    ...(moduleIndex === currentModule ? styles.activeModule : {})
                  }}
                  onClick={() => handleModuleSelect(moduleIndex)}
                >
                  <span style={styles.moduleNumber}>Module {moduleIndex + 1}</span>
                  <h4 style={styles.moduleTitle}>{module.title}</h4>
                  <span style={styles.lessonCount}>
                    {module.lessons.length} lessons
                  </span>
                </div>
                
                <div style={styles.lessonsList}>
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      style={{
                        ...styles.lessonItem,
                        ...(moduleIndex === currentModule && lessonIndex === currentLesson ? styles.activeLesson : {})
                      }}
                      onClick={() => {
                        setCurrentModule(moduleIndex);
                        setCurrentLesson(lessonIndex);
                      }}
                    >
                      <span style={styles.lessonIcon}>
                        {lesson.type === 'video' ? '🎥' : '📝'}
                      </span>
                      <div style={styles.lessonInfo}>
                        <span style={styles.lessonTitle}>{lesson.title}</span>
                        <span style={styles.lessonDuration}>{lesson.duration}</span>
                      </div>
                      {moduleIndex < currentModule || (moduleIndex === currentModule && lessonIndex <= currentLesson) ? (
                        <span style={styles.completedIcon}>✓</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Lesson Player */}
        <div style={styles.mainContent}>
          {isCompleted ? (
            <div style={styles.completionScreen}>
              <div style={styles.completionIcon}>🏆</div>
              <h2 style={styles.completionTitle}>Course Completed!</h2>
              <p style={styles.completionMessage}>
                Congratulations! You have successfully completed {course.name}.
              </p>
              <div style={styles.completionActions}>
                <button style={styles.certificateButton}>
                  Download Certificate
                </button>
                <Link to="/dashboard">
                  <button style={styles.dashboardButton}>
                    Go to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Lesson Header */}
              <div style={styles.lessonHeader}>
                <div>
                  <h2 style={styles.lessonTitle}>
                    {currentModuleData.title} - {currentLessonData.title}
                  </h2>
                  <p style={styles.lessonDescription}>
                    {currentLessonData.content}
                  </p>
                </div>
                <div style={styles.lessonMeta}>
                  <span style={styles.lessonType}>
                    {currentLessonData.type === 'video' ? '🎥 Video Lesson' : '📝 Quiz'}
                  </span>
                  <span style={styles.lessonDuration}>
                    {currentLessonData.duration}
                  </span>
                </div>
              </div>

              {/* Lesson Content */}
              <div style={styles.lessonContent}>
                {currentLessonData.type === 'video' ? (
                  <div style={styles.videoPlayer}>
                    <div style={styles.videoPlaceholder}>
                      <span style={styles.playIcon}>▶️</span>
                      <p>Video Player</p>
                      <small>In a real application, this would be an actual video player</small>
                    </div>
                  </div>
                ) : (
                  <div style={styles.quizContainer}>
                    <h3 style={styles.quizTitle}>Quiz Time!</h3>
                    {currentLessonData.questions?.map((question, index) => (
                      <div key={index} style={styles.question}>
                        <h4 style={styles.questionText}>
                          {index + 1}. {question.question}
                        </h4>
                        <div style={styles.options}>
                          {question.options.map((option, optIndex) => (
                            <label key={optIndex} style={styles.option}>
                              <input type="radio" name={`question-${index}`} />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button style={styles.submitQuiz}>
                      Submit Answers
                    </button>
                  </div>
                )}

                {/* Resources */}
                {currentLessonData.resources && currentLessonData.resources.length > 0 && (
                  <div style={styles.resources}>
                    <h4 style={styles.resourcesTitle}>Resources</h4>
                    <div style={styles.resourcesList}>
                      {currentLessonData.resources.map((resource, index) => (
                        <a key={index} href={resource.url} style={styles.resource}>
                          <span style={styles.resourceIcon}>
                            {resource.type === 'pdf' ? '📄' : 
                             resource.type === 'code' ? '💻' : '📦'}
                          </span>
                          {resource.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div style={styles.navigation}>
                <button 
                  onClick={handlePreviousLesson}
                  disabled={currentModule === 0 && currentLesson === 0}
                  style={{
                    ...styles.navButton,
                    ...styles.prevButton,
                    ...((currentModule === 0 && currentLesson === 0) ? styles.disabledButton : {})
                  }}
                >
                  ← Previous
                </button>
                
                <button 
                  onClick={handleNextLesson}
                  style={{
                    ...styles.navButton,
                    ...styles.nextButton
                  }}
                >
                  {currentModule === course.modules.length - 1 && 
                   currentLesson === currentModuleData.lessons.length - 1 
                    ? 'Complete Course' 
                    : 'Next →'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    minHeight: '100vh'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)'
  },
  header: {
    backgroundColor: 'var(--surface)',
    padding: '20px 0',
    boxShadow: 'var(--shadow)',
    borderBottom: '1px solid var(--border)'
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  },
  backLink: {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '10px',
    display: 'inline-block'
  },
  courseTitle: {
    color: 'var(--text-primary)',
    fontSize: '24px',
    margin: '0 0 15px 0',
    fontWeight: 'bold'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'var(--border)',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--success)',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    position: 'absolute',
    right: '0',
    top: '10px',
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  learningLayout: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    maxWidth: '1400px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 120px)'
  },
  sidebar: {
    backgroundColor: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    overflowY: 'auto',
    height: 'calc(100vh - 120px)',
    position: 'sticky',
    top: '0'
  },
  modulesList: {
    padding: '20px'
  },
  sidebarTitle: {
    color: 'var(--text-primary)',
    fontSize: '18px',
    marginBottom: '20px',
    fontWeight: '600'
  },
  moduleItem: {
    marginBottom: '15px'
  },
  moduleHeader: {
    padding: '15px',
    backgroundColor: 'var(--hover-bg)',
    borderRadius: '8px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 0.3s ease'
  },
  activeModule: {
    borderColor: 'var(--primary)',
    backgroundColor: 'var(--primary-bg, #f0f9ff)'
  },
  moduleNumber: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginBottom: '5px'
  },
  moduleTitle: {
    color: 'var(--text-primary)',
    fontSize: '14px',
    margin: '0 0 5px 0',
    fontWeight: '600'
  },
  lessonCount: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  lessonsList: {
    marginTop: '10px',
    paddingLeft: '10px'
  },
  lessonItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '5px',
    color: 'var(--text-primary)'
  },
  activeLesson: {
    backgroundColor: 'var(--primary)',
    color: 'white'
  },
  lessonIcon: {
    fontSize: '16px',
    flexShrink: 0
  },
  lessonInfo: {
    flex: 1
  },
  lessonTitle: {
    fontSize: '14px',
    margin: '0 0 2px 0',
    fontWeight: '500'
  },
  lessonDuration: {
    fontSize: '12px',
    opacity: '0.7'
  },
  completedIcon: {
    color: 'var(--success)',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  mainContent: {
    padding: '30px',
    backgroundColor: 'var(--background)',
    overflowY: 'auto'
  },
  completionScreen: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'var(--surface)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  completionIcon: {
    fontSize: '80px',
    marginBottom: '20px'
  },
  completionTitle: {
    color: 'var(--success)',
    fontSize: '32px',
    marginBottom: '15px',
    fontWeight: 'bold'
  },
  completionMessage: {
    color: 'var(--text-secondary)',
    fontSize: '16px',
    marginBottom: '30px'
  },
  completionActions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  certificateButton: {
    padding: '12px 24px',
    backgroundColor: 'var(--success)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  dashboardButton: {
    padding: '12px 24px',
    border: '2px solid var(--primary)',
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  lessonHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    gap: '20px',
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  lessonTitle: {
    color: 'var(--text-primary)',
    fontSize: '24px',
    margin: '0 0 10px 0',
    fontWeight: '600'
  },
  lessonDescription: {
    color: 'var(--text-secondary)',
    fontSize: '16px',
    lineHeight: '1.5',
    margin: 0
  },
  lessonMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'flex-end'
  },
  lessonType: {
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  lessonDuration: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    backgroundColor: 'var(--hover-bg)',
    padding: '4px 8px',
    borderRadius: '12px'
  },
  lessonContent: {
    marginBottom: '30px'
  },
  videoPlayer: {
    backgroundColor: 'var(--surface)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '20px',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)'
  },
  videoPlaceholder: {
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--background)'
  },
  playIcon: {
    fontSize: '60px',
    marginBottom: '20px'
  },
  quizContainer: {
    backgroundColor: 'var(--surface)',
    padding: '30px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)'
  },
  quizTitle: {
    color: 'var(--text-primary)',
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: '600'
  },
  question: {
    marginBottom: '25px',
    padding: '20px',
    backgroundColor: 'var(--hover-bg)',
    borderRadius: '8px',
    border: '1px solid var(--border)'
  },
  questionText: {
    color: 'var(--text-primary)',
    fontSize: '16px',
    marginBottom: '15px',
    fontWeight: '500'
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    backgroundColor: 'var(--surface)',
    borderRadius: '6px',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: 'var(--text-primary)'
  },
  submitQuiz: {
    padding: '12px 24px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  resources: {
    marginTop: '30px',
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  resourcesTitle: {
    color: 'var(--text-primary)',
    fontSize: '18px',
    marginBottom: '15px',
    fontWeight: '600'
  },
  resourcesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  resource: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 15px',
    backgroundColor: 'var(--hover-bg)',
    borderRadius: '6px',
    textDecoration: 'none',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
    transition: 'all 0.3s ease'
  },
  resourceIcon: {
    fontSize: '16px'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid var(--border)'
  },
  navButton: {
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  prevButton: {
    border: '2px solid var(--border)',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)'
  },
  nextButton: {
    backgroundColor: 'var(--success)',
    color: 'white',
    border: 'none'
  },
  disabledButton: {
    opacity: '0.5',
    cursor: 'not-allowed'
  }
};

// Add hover effects
const hoverStyle = `
  @media (hover: hover) {
    .module-header:hover {
      border-color: var(--primary);
    }
    
    .lesson-item:hover {
      background-color: var(--hover-bg);
    }
    
    .active-lesson:hover {
      background-color: var(--primary-dark);
    }
    
    .resource:hover {
      background-color: var(--border);
    }
    
    .prev-button:hover:not(.disabled) {
      background-color: var(--hover-bg);
    }
    
    .next-button:hover {
      background-color: var(--success-dark, #047857);
    }
    
    .option:hover {
      border-color: var(--primary);
    }
    
    .certificate-button:hover {
      background-color: var(--success-dark, #047857);
    }
    
    .dashboard-button:hover {
      background-color: var(--primary);
      color: white;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default LearningPage;