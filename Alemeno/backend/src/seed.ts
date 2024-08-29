import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/courseModel';
import Student from './models/studentModel'

dotenv.config();

mongoose.connect(process.env.MONGO_URI as string, {
})
.then(() => {
    console.log('MongoDB connected');
    seedCourses();
})
.catch((err) => console.log(err));




const seedCourses = async () => {

    const students = [
        { id: 101, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 102, name: 'Bob Smith', email: 'bob@example.com' },
        { id: 103, name: 'Charlie Brown', email: 'charlie@example.com' },
        { id: 104, name: 'David Lee', email: 'david@example.com' },
        { id: 105, name: 'Emily Davis', email: 'emily@example.com' },
        { id: 106, name: 'Frank Thomas', email: 'frank@example.com' },
        { id: 107, name: 'Grace Hall', email: 'grace@example.com' },
        { id: 108, name: 'Henry Young', email: 'henry@example.com' },
        { id: 109, name: 'Ivy Wilson', email: 'ivy@example.com' },
        { id: 110, name: 'Jack Brown', email: 'jack@example.com' },
        { id: 111, name: 'Kimberly Evans', email: 'kimberly@example.com' },
        { id: 112, name: 'Laura Wilson', email: 'laura@example.com' },
        { id: 113, name: 'Mark Thompson', email: 'mark@example.com' },
        { id: 114, name: 'Nancy Robinson', email: 'nancy@example.com' },
        { id: 115, name: 'Oscar Lee', email: 'oscar@example.com' },
        { id: 116, name: 'Peter Martinez', email: 'peter@example.com' },
        { id: 117, name: 'Rachel White', email: 'rachel@example.com' },
        { id: 118, name: 'Steve Harris', email: 'steve@example.com' },
        { id: 119, name: 'Tracy King', email: 'tracy@example.com' },
        { id: 120, name: 'Uma Patel', email: 'uma@example.com' },
        { id: 121, name: 'Vicky Brown', email: 'vicky@example.com' },
        { id: 122, name: 'Will Green', email: 'will@example.com' },
        { id: 123, name: 'Xavier Harris', email: 'xavier@example.com' },
        { id: 124, name: 'Yvonne Black', email: 'yvonne@example.com' },
        { id: 125, name: 'Zoe Anderson', email: 'zoe@example.com' },
        { id: 126, name: 'Aaron Lee', email: 'aaron@example.com' },
        { id: 127, name: 'Brian Green', email: 'brian@example.com' },
        { id: 128, name: 'Christina Hall', email: 'christina@example.com' },
    ];


    const courses = [
        {
            name: 'Introduction to React Native',
            instructor: 'John Doe',
            description: 'Learn the basics of React Native development and build your first mobile app.',
            enrollmentStatus: 'Open',
            duration: '8 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
            location: 'Online',
            prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
            syllabus: [
                { week: 1, topic: 'Introduction to React Native', content: 'Overview of React Native, setting up your development environment.' },
                { week: 2, topic: 'Building Your First App', content: 'Creating a simple mobile app using React Native components.' },
            ],
            students: [
                { id: 101, name: 'Alice Johnson', email: 'alice@example.com' },
                { id: 102, name: 'Bob Smith', email: 'bob@example.com' },
            ],
        },
        {
            name: 'Advanced React Patterns',
            instructor: 'Jane Smith',
            description: 'Dive deep into advanced patterns and techniques in React development.',
            enrollmentStatus: 'Open',
            duration: '6 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Mondays and Wednesdays, 7:00 PM - 9:00 PM',
            location: 'Online',
            prerequisites: ['React Basics', 'JavaScript ES6+'],
            syllabus: [
                { week: 1, topic: 'Higher Order Components', content: 'Understanding and implementing HOCs in React.' },
                { week: 2, topic: 'Render Props', content: 'Using render props for more flexible component composition.' },
            ],
            students: [
                { id: 103, name: 'Charlie Brown', email: 'charlie@example.com' },
            ],
        },
        {
            name: 'JavaScript Essentials',
            instructor: 'Paul Adams',
            description: 'Master the essentials of JavaScript, the language of the web.',
            enrollmentStatus: 'In Progress',
            duration: '10 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Fridays, 5:00 PM - 7:00 PM',
            location: 'In-person, Room 203',
            prerequisites: ['None'],
            syllabus: [
                { week: 1, topic: 'Introduction to JavaScript', content: 'Understanding the basics of JavaScript and how it works.' },
                { week: 2, topic: 'Control Structures', content: 'Learn about if statements, loops, and more.' },
            ],
            students: [
                { id: 104, name: 'David Lee', email: 'david@example.com' },
            ],
        },
        {
            name: 'Full-Stack Web Development',
            instructor: 'Susan Green',
            description: 'Become a full-stack developer by learning both front-end and back-end technologies.',
            enrollmentStatus: 'Open',
            duration: '12 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Weekends, 9:00 AM - 1:00 PM',
            location: 'Online',
            prerequisites: ['Basic HTML, CSS, JavaScript'],
            syllabus: [
                { week: 1, topic: 'HTML & CSS Basics', content: 'Introduction to HTML and CSS.' },
                { week: 2, topic: 'JavaScript for Web', content: 'Enhancing web pages with JavaScript.' },
            ],
            students: [
                { id: 105, name: 'Emily Davis', email: 'emily@example.com' },
                { id: 106, name: 'Frank Thomas', email: 'frank@example.com' },
            ],
        },
        {
            name: 'Machine Learning with Python',
            instructor: 'James White',
            description: 'Learn the fundamentals of machine learning and how to implement ML models in Python.',
            enrollmentStatus: 'Closed',
            duration: '10 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Tuesdays, 7:00 PM - 9:00 PM',
            location: 'In-person, Room 404',
            prerequisites: ['Python Basics', 'Statistics'],
            syllabus: [
                { week: 1, topic: 'Introduction to Machine Learning', content: 'Overview of machine learning concepts and types.' },
                { week: 2, topic: 'Data Preprocessing', content: 'Techniques for cleaning and preparing data for ML.' },
            ],
            students: [
                { id: 107, name: 'Grace Hall', email: 'grace@example.com' },
                { id: 108, name: 'Henry Young', email: 'henry@example.com' },
            ],
        },
        {
            name: 'Data Structures and Algorithms',
            instructor: 'Michael Brown',
            description: 'Master data structures and algorithms to ace your coding interviews.',
            enrollmentStatus: 'In Progress',
            duration: '8 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Wednesdays and Fridays, 5:00 PM - 7:00 PM',
            location: 'Online',
            prerequisites: ['Basic Programming Knowledge'],
            syllabus: [
                { week: 1, topic: 'Arrays and Strings', content: 'Understanding and manipulating arrays and strings.' },
                { week: 2, topic: 'Linked Lists', content: 'Working with linked lists and their variations.' },
            ],
            students: [
                { id: 109, name: 'Ivy Wilson', email: 'ivy@example.com' },
                { id: 110, name: 'Jack Brown', email: 'jack@example.com' },
            ],
        },
        {
            name: 'Cloud Computing with AWS',
            instructor: 'Chris Johnson',
            description: 'Learn the fundamentals of cloud computing using AWS services.',
            enrollmentStatus: 'Open',
            duration: '6 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Thursdays, 4:00 PM - 6:00 PM',
            location: 'Online',
            prerequisites: ['Networking Basics', 'Linux Basics'],
            syllabus: [
                { week: 1, topic: 'Introduction to Cloud Computing', content: 'Understanding the basics of cloud computing and AWS.' },
                { week: 2, topic: 'AWS Core Services', content: 'Introduction to core AWS services such as EC2, S3, and RDS.' },
            ],
            students: [
                { id: 111, name: 'Kimberly Evans', email: 'kimberly@example.com' },
            ],
        },
        {
            name: 'Python for Data Science',
            instructor: 'Jessica Taylor',
            description: 'Learn how to use Python for data analysis and visualization.',
            enrollmentStatus: 'Open',
            duration: '8 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Saturdays, 10:00 AM - 12:00 PM',
            location: 'Online',
            prerequisites: ['Python Basics', 'Statistics'],
            syllabus: [
                { week: 1, topic: 'Introduction to Data Science', content: 'Understanding data science workflows and tools.' },
                { week: 2, topic: 'Data Analysis with Pandas', content: 'Using Pandas for data manipulation and analysis.' },
            ],
            students: [
                { id: 112, name: 'Laura Wilson', email: 'laura@example.com' },
                { id: 113, name: 'Mark Thompson', email: 'mark@example.com' },
            ],
        },
        {
            name: 'Introduction to DevOps',
            instructor: 'David Clark',
            description: 'Learn the basics of DevOps and how to implement CI/CD pipelines.',
            enrollmentStatus: 'Closed',
            duration: '8 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Mondays, 6:00 PM - 8:00 PM',
            location: 'In-person, Room 501',
            prerequisites: ['Basic Software Development Knowledge'],
            syllabus: [
                { week: 1, topic: 'Introduction to DevOps', content: 'Understanding the DevOps culture and practices.' },
                { week: 2, topic: 'Version Control with Git', content: 'Using Git for version control in DevOps workflows.' },
            ],
            students: [
                { id: 114, name: 'Nancy Robinson', email: 'nancy@example.com' },
                { id: 115, name: 'Oscar Lee', email: 'oscar@example.com' },
            ],
        },
        {
            name: 'Cybersecurity Fundamentals',
            instructor: 'Emma Scott',
            description: 'Learn the basics of cybersecurity and how to protect systems from threats.',
            enrollmentStatus: 'Open',
            duration: '6 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Fridays, 3:00 PM - 5:00 PM',
            location: 'Online',
            prerequisites: ['Networking Basics', 'Linux Basics'],
            syllabus: [
                { week: 1, topic: 'Introduction to Cybersecurity', content: 'Overview of cybersecurity principles and threats.' },
                { week: 2, topic: 'Network Security', content: 'Understanding how to secure networks and prevent attacks.' },
            ],
            students: [
                { id: 116, name: 'Peter Martinez', email: 'peter@example.com' },
            ],
        },
        {
            name: 'Artificial Intelligence with Python',
            instructor: 'Andrew Johnson',
            description: 'Explore the world of AI and machine learning using Python.',
            enrollmentStatus: 'In Progress',
            duration: '10 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Wednesdays, 7:00 PM - 9:00 PM',
            location: 'In-person, Room 602',
            prerequisites: ['Python Basics', 'Math for Machine Learning'],
            syllabus: [
                { week: 1, topic: 'Introduction to AI', content: 'Understanding AI and its applications.' },
                { week: 2, topic: 'Supervised Learning', content: 'Implementing supervised learning algorithms in Python.' },
            ],
            students: [
                { id: 117, name: 'Rachel White', email: 'rachel@example.com' },
            ],
        },
        {
            name: 'Web Development with Django',
            instructor: 'Tom Walker',
            description: 'Learn how to build web applications using the Django framework.',
            enrollmentStatus: 'Open',
            duration: '8 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
            location: 'Online',
            prerequisites: ['Python Basics', 'HTML/CSS Basics'],
            syllabus: [
                { week: 1, topic: 'Introduction to Django', content: 'Understanding the Django framework and its components.' },
                { week: 2, topic: 'Models and Databases', content: 'Working with models and databases in Django.' },
            ],
            students: [
                { id: 118, name: 'Steve Harris', email: 'steve@example.com' },
                { id: 119, name: 'Tracy King', email: 'tracy@example.com' },
            ],
        },
        {
            name: 'Introduction to Blockchain',
            instructor: 'Jennifer Young',
            description: 'Learn the basics of blockchain technology and its applications.',
            enrollmentStatus: 'Closed',
            duration: '8 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Mondays, 5:00 PM - 7:00 PM',
            location: 'Online',
            prerequisites: ['Cryptography Basics'],
            syllabus: [
                { week: 1, topic: 'Introduction to Blockchain', content: 'Understanding the fundamentals of blockchain technology.' },
                { week: 2, topic: 'Cryptocurrencies', content: 'Exploring the world of cryptocurrencies and how they work.' },
            ],
            students: [
                { id: 120, name: 'Uma Patel', email: 'uma@example.com' },
            ],
        },
        {
            name: 'Mobile App Development with Flutter',
            instructor: 'Robert King',
            description: 'Learn how to develop cross-platform mobile apps using Flutter.',
            enrollmentStatus: 'Open',
            duration: '10 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Saturdays, 11:00 AM - 1:00 PM',
            location: 'Online',
            prerequisites: ['Basic Programming Knowledge'],
            syllabus: [
                { week: 1, topic: 'Introduction to Flutter', content: 'Understanding the Flutter framework and setting up your environment.' },
                { week: 2, topic: 'Building UIs with Flutter', content: 'Creating user interfaces using Flutter widgets.' },
            ],
            students: [
                { id: 121, name: 'Vicky Brown', email: 'vicky@example.com' },
                { id: 122, name: 'Will Green', email: 'will@example.com' },
            ],
        },
        {
            name: 'Big Data Analytics with Hadoop',
            instructor: 'Karen Wright',
            description: 'Learn how to analyze large datasets using Hadoop and other big data technologies.',
            enrollmentStatus: 'Open',
            duration: '12 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Weekends, 9:00 AM - 12:00 PM',
            location: 'In-person, Room 303',
            prerequisites: ['Java Basics', 'Linux Basics'],
            syllabus: [
                { week: 1, topic: 'Introduction to Big Data', content: 'Understanding big data concepts and challenges.' },
                { week: 2, topic: 'Hadoop Architecture', content: 'Exploring the architecture of Hadoop and its components.' },
            ],
            students: [
                { id: 123, name: 'Xavier Harris', email: 'xavier@example.com' },
            ],
        },
        {
            name: 'Introduction to Kubernetes',
            instructor: 'Lisa Moore',
            description: 'Learn the basics of container orchestration using Kubernetes.',
            enrollmentStatus: 'Closed',
            duration: '6 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Thursdays, 6:00 PM - 8:00 PM',
            location: 'Online',
            prerequisites: ['Docker Basics', 'Linux Basics'],
            syllabus: [
                { week: 1, topic: 'Introduction to Containers', content: 'Understanding containers and their role in modern development.' },
                { week: 2, topic: 'Kubernetes Architecture', content: 'Exploring the architecture of Kubernetes and its components.' },
            ],
            students: [
                { id: 124, name: 'Yvonne Black', email: 'yvonne@example.com' },
            ],
        },
        {
            name: 'Data Visualization with D3.js',
            instructor: 'Laura Scott',
            description: 'Learn how to create interactive data visualizations using D3.js.',
            enrollmentStatus: 'Open',
            duration: '8 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Fridays, 7:00 PM - 9:00 PM',
            location: 'Online',
            prerequisites: ['JavaScript Basics', 'HTML/CSS Basics'],
            syllabus: [
                { week: 1, topic: 'Introduction to D3.js', content: 'Understanding the basics of D3.js and how it works.' },
                { week: 2, topic: 'Creating Visualizations', content: 'Building your first visualization using D3.js.' },
            ],
            students: [
                { id: 125, name: 'Zoe Anderson', email: 'zoe@example.com' },
            ],
        },
        {
            name: 'Introduction to Deep Learning',
            instructor: 'Kevin Taylor',
            description: 'Explore the fundamentals of deep learning and neural networks.',
            enrollmentStatus: 'In Progress',
            duration: '10 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Tuesdays, 7:00 PM - 9:00 PM',
            location: 'In-person, Room 702',
            prerequisites: ['Python Basics', 'Math for Machine Learning'],
            syllabus: [
                { week: 1, topic: 'Introduction to Deep Learning', content: 'Understanding deep learning and its applications.' },
                { week: 2, topic: 'Neural Networks', content: 'Building and training neural networks using Python.' },
            ],
            students: [
                { id: 126, name: 'Aaron Lee', email: 'aaron@example.com' },
            ],
        },
        {
            name: 'Digital Marketing Basics',
            instructor: 'Monica Harris',
            description: 'Learn the basics of digital marketing and how to promote products online.',
            enrollmentStatus: 'Open',
            duration: '6 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Mondays and Wednesdays, 5:00 PM - 7:00 PM',
            location: 'Online',
            prerequisites: ['None'],
            syllabus: [
                { week: 1, topic: 'Introduction to Digital Marketing', content: 'Understanding the digital marketing landscape.' },
                { week: 2, topic: 'Social Media Marketing', content: 'Using social media to promote products and engage customers.' },
            ],
            students: [
                { id: 127, name: 'Brian Green', email: 'brian@example.com' },
            ],
        },
        {
            name: 'Introduction to SQL',
            instructor: 'Patricia Collins',
            description: 'Learn how to manage and query databases using SQL.',
            enrollmentStatus: 'Closed',
            duration: '4 weeks',
            thumbnail: 'your.image.here',
            schedule: 'Saturdays, 10:00 AM - 12:00 PM',
            location: 'In-person, Room 204',
            prerequisites: ['None'],
            syllabus: [
                { week: 1, topic: 'Introduction to Databases', content: 'Understanding the basics of databases and SQL.' },
                { week: 2, topic: 'Writing SQL Queries', content: 'Learning how to write basic SQL queries to manage data.' },
            ],
            students: [
                { id: 128, name: 'Christina Hall', email: 'christina@example.com' },
            ],
        },
    ];

    
    

    try {
        // Insert courses
        await Course.insertMany(courses);
        console.log('Courses seeded!');
    
        // // Insert students
        // await Student.insertMany(students);
        // console.log('Students seeded!');
      } catch (error) {
        console.error('Error seeding data:', error);
      } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
      }

};
