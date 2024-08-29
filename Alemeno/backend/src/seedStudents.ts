import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {ICourse} from './models/courseModel';
import Course from './models/courseModel';
import Student from './models/studentModel';

dotenv.config();

mongoose.connect(process.env.MONGO_URI as string, {
})
.then(() => {
    console.log('MongoDB connected');
    seedStudents();
})
.catch((err) => console.log(err));

const seedStudents = async () => {
    try {
        // Step 1: Retrieve the existing courses from the database
        const coursesData = await Course.find();

        // Step 2: Map course names to their respective _id for easy reference
        const courseMap = new Map<string, mongoose.Types.ObjectId>();
        coursesData.forEach((course: ICourse) => {
            courseMap.set(course.name, course._id as mongoose.Types.ObjectId);
        });


        // Step 3: Seed the students using the retrieved course IDs
        const studentsData = [
            {
                name: 'Aaron Lee',
                email: 'aaron@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Introduction to Deep Learning')!, progress: 50, completed: false },
                ],
                likedCourses: [courseMap.get('Introduction to Deep Learning')!],
            },
            {
                name: 'Charlie Brown',
                email: 'charlie@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Advanced React Patterns')!, progress: 70, completed: false },
                ],
                likedCourses: [courseMap.get('Advanced React Patterns')!],
            },
            {
                name: 'David Lee',
                email: 'david@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('JavaScript Essentials')!, progress: 20, completed: false },
                ],
                likedCourses: [courseMap.get('JavaScript Essentials')!],
            },
            {
                name: 'Emily Davis',
                email: 'emily@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Full-Stack Web Development')!, progress: 80, completed: true },
                ],
                likedCourses: [courseMap.get('Full-Stack Web Development')!],
            },
            {
                name: 'Frank Thomas',
                email: 'frank@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Full-Stack Web Development')!, progress: 60, completed: false },
                ],
                likedCourses: [courseMap.get('Full-Stack Web Development')!],
            },
            {
                name: 'Grace Hall',
                email: 'grace@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Machine Learning with Python')!, progress: 90, completed: true },
                ],
                likedCourses: [courseMap.get('Machine Learning with Python')!],
            },
            {
                name: 'Henry Young',
                email: 'henry@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Machine Learning with Python')!, progress: 75, completed: false },
                ],
                likedCourses: [courseMap.get('Machine Learning with Python')!],
            },
            {
                name: 'Ivy Wilson',
                email: 'ivy@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Data Structures and Algorithms')!, progress: 85, completed: true },
                ],
                likedCourses: [courseMap.get('Data Structures and Algorithms')!],
            },
            {
                name: 'Jack Brown',
                email: 'jack@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Data Structures and Algorithms')!, progress: 60, completed: false },
                ],
                likedCourses: [courseMap.get('Data Structures and Algorithms')!],
            },
            {
                name: 'Kimberly Evans',
                email: 'kimberly@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Cloud Computing with AWS')!, progress: 40, completed: false },
                ],
                likedCourses: [courseMap.get('Cloud Computing with AWS')!],
            },
            {
                name: 'Laura Wilson',
                email: 'laura@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Python for Data Science')!, progress: 90, completed: true },
                ],
                likedCourses: [courseMap.get('Python for Data Science')!],
            },
            {
                name: 'Mark Thompson',
                email: 'mark@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Python for Data Science')!, progress: 85, completed: true },
                ],
                likedCourses: [courseMap.get('Python for Data Science')!],
            },
            {
                name: 'Nancy Robinson',
                email: 'nancy@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Introduction to DevOps')!, progress: 70, completed: false },
                ],
                likedCourses: [courseMap.get('Introduction to DevOps')!],
            },
            {
                name: 'Oscar Lee',
                email: 'oscar@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Introduction to DevOps')!, progress: 65, completed: false },
                ],
                likedCourses: [courseMap.get('Introduction to DevOps')!],
            },
            {
                name: 'Peter Martinez',
                email: 'peter@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Cybersecurity Fundamentals')!, progress: 50, completed: false },
                ],
                likedCourses: [courseMap.get('Cybersecurity Fundamentals')!],
            },
            {
                name: 'Rachel White',
                email: 'rachel@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Artificial Intelligence with Python')!, progress: 70, completed: false },
                ],
                likedCourses: [courseMap.get('Artificial Intelligence with Python')!],
            },
            {
                name: 'Steve Harris',
                email: 'steve@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Web Development with Django')!, progress: 80, completed: true },
                ],
                likedCourses: [courseMap.get('Web Development with Django')!],
            },
            {
                name: 'Tracy King',
                email: 'tracy@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Web Development with Django')!, progress: 60, completed: false },
                ],
                likedCourses: [courseMap.get('Web Development with Django')!],
            },
            {
                name: 'Uma Patel',
                email: 'uma@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Introduction to Blockchain')!, progress: 55, completed: false },
                ],
                likedCourses: [courseMap.get('Introduction to Blockchain')!],
            },
            {
                name: 'Vicky Brown',
                email: 'vicky@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Mobile App Development with Flutter')!, progress: 65, completed: false },
                ],
                likedCourses: [courseMap.get('Mobile App Development with Flutter')!],
            },
            {
                name: 'Will Green',
                email: 'will@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Mobile App Development with Flutter')!, progress: 80, completed: true },
                ],
                likedCourses: [courseMap.get('Mobile App Development with Flutter')!],
            },
            {
                name: 'Xavier Harris',
                email: 'xavier@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Big Data Analytics with Hadoop')!, progress: 45, completed: false },
                ],
                likedCourses: [courseMap.get('Big Data Analytics with Hadoop')!],
            },
            {
                name: 'Yvonne Black',
                email: 'yvonne@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Introduction to Kubernetes')!, progress: 55, completed: false },
                ],
                likedCourses: [courseMap.get('Introduction to Kubernetes')!],
            },
            {
                name: 'Zoe Anderson',
                email: 'zoe@example.com',
                enrolledCourses: [
                    { courseId: courseMap.get('Data Visualization with D3.js')!, progress: 60, completed: false },
                ],
                likedCourses: [courseMap.get('Data Visualization with D3.js')!],
            },
        ];

        const insertedStudents = await Student.insertMany(studentsData);
        console.log('Students seeded!');
        
        // Update courses with student references
        for (const course of coursesData) {
            const courseStudents = insertedStudents.filter(student =>
                student.enrolledCourses.some(ec => (ec.courseId as mongoose.Types.ObjectId).equals(course._id as mongoose.Types.ObjectId))
            ).map(student => student._id);

            await Course.findByIdAndUpdate(course._id, { $push: { students: { $each: courseStudents } } });
        }

        console.log('Courses updated with student references!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
    }
};
