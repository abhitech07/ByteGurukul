import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';

function InternshipTasks() {
  const { showToast } = useToast();

  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    file: null
  });

  // Fetch tasks and submissions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasksRes, submissionsRes] = await Promise.all([
          api.get('/tasks'),
          api.get('/submissions/my-submissions')
        ]);

        if (tasksRes.data.success) {
          setTasks(tasksRes.data.data);
        }
        if (submissionsRes.data.success) {
          setSubmissions(submissionsRes.data.data);
        }
      } catch (err) {
        console.error('Failed to load tasks:', err);
        showToast('Failed to load tasks', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if task is already submitted
  const getSubmissionStatus = (taskId) => {
    return submissions.find(s => s.taskId === taskId);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, file }));
  };

  // Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTask) {
      showToast('Please select a task', 'error');
      return;
    }

    if (!formData.content && !formData.file) {
      showToast('Please provide content or upload a file', 'error');
      return;
    }

    try {
      setSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append('taskId', selectedTask.id);
      formDataToSend.append('content', formData.content);
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await api.post('/submissions', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        showToast('Task submitted successfully!', 'success');
        setFormData({ content: '', file: null });
        setSelectedTask(null);
        
        // Refetch submissions
        const submissionsRes = await api.get('/submissions/my-submissions');
        if (submissionsRes.data.success) {
          setSubmissions(submissionsRes.data.data);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Submission failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={styles.container}><p>Loading tasks...</p></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Internship Tasks</h1>
        <p style={styles.subtitle}>Complete tasks and submit solutions</p>
      </div>

      <div style={styles.layout}>
        {/* Tasks List */}
        <div style={styles.tasksList}>
          <h2 style={styles.sectionTitle}>Available Tasks</h2>
          {tasks.length === 0 ? (
            <p style={styles.emptyMessage}>No tasks available</p>
          ) : (
            tasks.map(task => {
              const submission = getSubmissionStatus(task.id);
              return (
                <button 
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  style={{
                    ...styles.taskCard,
                    ...(selectedTask?.id === task.id && styles.taskCardActive),
                    ...( submission && styles.taskCardSubmitted)
                  }}
                  type="button"
                >
                  <div style={styles.taskHeader}>
                    <h3 style={styles.taskTitle}>{task.title}</h3>
                    {submission && (
                      <span style={styles.statusBadge}>
                        {submission.status === 'graded' ? `✓ Graded: ${submission.grade}/${task.maxGrade}` : `✓ Submitted`}
                      </span>
                    )}
                  </div>
                  <p style={styles.taskDifficulty}>Difficulty: {task.difficulty}</p>
                  {task.dueDate && (
                    <p style={styles.dueDate}>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Submission Form */}
        <div style={styles.submissionPanel}>
          {selectedTask ? (
            <>
              <h2 style={styles.sectionTitle}>{selectedTask.title}</h2>
              <div style={styles.taskDescription}>
                <p>{selectedTask.description}</p>
                <div style={styles.taskMeta}>
                  <span>Max Grade: {selectedTask.maxGrade}</span>
                  {selectedTask.dueDate && (
                    <span>Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</span>
                  )}
                </div>
              </div>

              {getSubmissionStatus(selectedTask.id) ? (
                <div style={styles.submittedMessage}>
                  <h3>✓ Already Submitted</h3>
                  {getSubmissionStatus(selectedTask.id).status === 'graded' && (
                    <div>
                      <p>Grade: {getSubmissionStatus(selectedTask.id).grade}/{selectedTask.maxGrade}</p>
                      {getSubmissionStatus(selectedTask.id).feedback && (
                        <div style={styles.feedback}>
                          <strong>Feedback:</strong>
                          <p>{getSubmissionStatus(selectedTask.id).feedback}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label htmlFor="solution" style={styles.label}>Solution</label>
                    <textarea
                      id="solution"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Describe your solution or paste code here..."
                      style={styles.textarea}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="file-input" style={styles.label}>Upload File (Optional)</label>
                    <input
                      id="file-input"
                      type="file"
                      onChange={handleFileChange}
                      style={styles.fileInput}
                      accept=".pdf,.doc,.docx,.txt,.zip,.jpg,.png"
                    />
                    {formData.file && (
                      <p style={styles.fileName}>Selected: {formData.file.name}</p>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    style={{
                      ...styles.submitBtn,
                      ...(submitting && styles.submitBtnDisabled)
                    }}
                  >
                    {submitting ? 'Submitting...' : 'Submit Solution'}
                  </button>
                </form>
              )}
            </>
          ) : (
            <div style={styles.selectPrompt}>
              <p>Select a task to view details and submit your solution</p>
            </div>
          )}
        </div>
      </div>

      {/* Submissions History */}
      {submissions.length > 0 && (
        <div style={styles.historySection}>
          <h2 style={styles.sectionTitle}>Your Submissions</h2>
          <div style={styles.submissionsTable}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(sub => (
                  <tr key={sub.id}>
                    <td>{sub.Task?.title || 'Task'}</td>
                    <td style={styles.statusCell}>
                      <span style={{
                        ...styles.statusTag,
                        ...(sub.status === 'graded' && styles.statusGraded),
                        ...(sub.status === 'submitted' && styles.statusSubmitted)
                      }}>
                        {sub.status}
                      </span>
                    </td>
                    <td>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                    <td>{sub.grade ? `${sub.grade}/${sub.Task?.maxGrade}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '40px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '20px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 0 10px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    margin: '0'
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '30px',
    marginBottom: '40px'
  },
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 15px 0'
  },
  taskCard: {
    padding: '15px',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'var(--surface)'
  },
  taskCardActive: {
    borderColor: 'var(--primary)',
    backgroundColor: 'var(--primary)',
    color: 'white'
  },
  taskCardSubmitted: {
    opacity: 0.7
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  taskTitle: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '600'
  },
  statusBadge: {
    fontSize: '12px',
    padding: '4px 8px',
    backgroundColor: 'var(--success)',
    borderRadius: '4px',
    color: 'white'
  },
  taskDifficulty: {
    margin: '0',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  dueDate: {
    margin: '5px 0 0 0',
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  emptyMessage: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    padding: '20px'
  },
  submissionPanel: {
    padding: '20px',
    backgroundColor: 'var(--surface)',
    borderRadius: '8px',
    border: '1px solid var(--border)'
  },
  taskDescription: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: 'var(--background)',
    borderRadius: '8px'
  },
  taskMeta: {
    display: 'flex',
    gap: '20px',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginTop: '10px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontWeight: '600',
    fontSize: '14px'
  },
  textarea: {
    padding: '12px',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '14px',
    minHeight: '150px',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    resize: 'vertical'
  },
  fileInput: {
    padding: '10px',
    border: '1px solid var(--border)',
    borderRadius: '8px'
  },
  fileName: {
    fontSize: '12px',
    color: 'var(--success)',
    margin: '0'
  },
  submitBtn: {
    padding: '12px 24px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  submitBtnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  selectPrompt: {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'var(--text-secondary)'
  },
  submittedMessage: {
    padding: '20px',
    backgroundColor: 'var(--success)',
    color: 'white',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  feedback: {
    marginTop: '15px',
    padding: '15px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '8px'
  },
  historySection: {
    marginTop: '40px'
  },
  submissionsTable: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'var(--surface)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  statusCell: {
    textAlign: 'center'
  },
  statusTag: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: 'var(--border)',
    color: 'var(--text-primary)'
  },
  statusSubmitted: {
    backgroundColor: '#3498db',
    color: 'white'
  },
  statusGraded: {
    backgroundColor: 'var(--success)',
    color: 'white'
  }
};

export default InternshipTasks;
