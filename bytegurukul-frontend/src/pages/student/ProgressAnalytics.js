// src/pages/student/ProgressAnalytics.js
import React from 'react';
import StudentNavbar from '../../components/student/StudentNavbar';
import { useCourse } from '../../contexts/CourseContext';

function ProgressCard({ title, value, hint }) {
  return (
    <div style={{...pStyles.card}}>
      <div style={pStyles.title}>{title}</div>
      <div style={pStyles.value}>{value}</div>
      <div style={pStyles.hint}>{hint}</div>
    </div>
  );
}

export default function ProgressAnalytics() {
  const { enrolledCourses = [] } = useCourse();

  // compute simple metrics
  const totalCourses = enrolledCourses.length;
  const avgProgress = totalCourses === 0 ? 0 : Math.round(enrolledCourses.reduce((s,c) => s + (c.progress||0),0) / totalCourses);
  const totalLessons = enrolledCourses.reduce((s,c) => s + (c.lessons||24),0);
  const completedLessons = enrolledCourses.reduce((s,c) => s + Math.round(((c.progress||0)/100) * (c.lessons||24)),0);

  return (
    <>
      <StudentNavbar />
      <div style={pStyles.page}>
        <h1>My Progress</h1>
        <p style={{color:'var(--text-secondary)'}}>Overview of your learning stats</p>

        <div style={pStyles.grid}>
          <ProgressCard title="Enrolled Courses" value={totalCourses} hint="Courses you are currently enrolled in" />
          <ProgressCard title="Avg Progress" value={`${avgProgress}%`} hint="Average completion across courses" />
          <ProgressCard title="Lessons Done" value={completedLessons} hint={`of ${totalLessons} lessons`} />
          <ProgressCard title="Active Streak" value={`${Math.min(30, Math.floor(Math.random()*10)+3)} days`} hint="Consecutive learning days (sample)" />
        </div>

        <section style={{marginTop:18}}>
          <h3>Course Progress</h3>
          <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:8}}>
            {enrolledCourses.length===0 ? (
              <div style={{color:'var(--text-secondary)'}}>No enrolled courses to show progress.</div>
            ) : enrolledCourses.map(course => (
              <div key={course.id} style={{padding:12, borderRadius:10, background:'var(--surface)', border:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
                <div>
                  <div style={{fontWeight:700}}>{course.name}</div>
                  <div style={{color:'var(--text-secondary)'}}>{course.instructor}</div>
                </div>
                <div style={{width:260}}>
                  <div style={{height:8, background:'var(--border)', borderRadius:6, overflow:'hidden'}}>
                    <div style={{height:'100%', width:`${course.progress||0}%`, background:'linear-gradient(90deg,var(--primary),var(--primary-dark))'}} />
                  </div>
                  <div style={{textAlign:'right', marginTop:6, color:'var(--text-secondary)'}}>{course.progress || 0}%</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

const pStyles = {
  page: { padding:'12px 20px', maxWidth:1000, margin:'8px auto' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12, marginTop:12 },
  card: { padding:16, borderRadius:12, background:'var(--surface)', border:'1px solid var(--border)' },
  title: { color:'var(--text-secondary)', fontSize:13 },
  value: { fontSize:22, fontWeight:700, marginTop:8 },
  hint: { fontSize:12, color:'var(--text-secondary)', marginTop:6 }
};
