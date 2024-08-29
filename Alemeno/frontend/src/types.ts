// src/types.ts

export interface SyllabusItem {
    week: number;
    topic: string;
    content: string;
  }
  
  export interface Student {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Course {
    _id: string; // MongoDB ID is a string
    name: string;
    instructor: string;
    description: string;
    enrollmentStatus: string;
    thumbnail: string;
    duration: string;
    schedule: string;
    location: string;
    prerequisites: string[];
    syllabus: Array<{
      week: number;
      topic: string;
      content: string;
    }>;
    students: Array<{
      id: string; // Assuming student ID is also a string
      name: string;
      email: string;
    }>;
    dueDate?: string;
    completed?: boolean; 
  }