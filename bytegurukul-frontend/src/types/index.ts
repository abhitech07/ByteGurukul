// Add this at the very top
export {}; // This makes it a module

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ... rest of your existing types remain the same
export interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
  semester: number;
  branch: string;
  instructor: User;
  credits: number;
  createdAt: Date;
}

// ... keep all your other interfaces