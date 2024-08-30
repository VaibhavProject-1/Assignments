How to Download and Use
1. Clone the Repository

To get started, you need to clone the repository containing the project files. Use the following command to clone the repository:
gh repo clone VaibhavProject-1/Assignments

2. Navigate to the Project Directory

After cloning the repository, navigate to the Alemeno directory where the project files are located:

cd Assignments/Alemeno

Setting Up the Backend

Navigate to the backend directory to set up the backend:

cd backend

Install dependencies

npm install or npm i express

Environment setup

Create a .env file in the backend directory with the following variables:

MONGO_URI=your-mongodb-uri
PORT=5000

Run the server

npm run start

Seed the courses data to database

npm run seed

Seed the students to database


npm run seedStudents


4. Setting Up the Frontend

Navigate to the frontend directory to set up the frontend:

cd ../frontend

Install dependencies

bash

npm install or npm i react

Run the development server

npm run start

Access the application:

    Open your browser and navigate to http://localhost:3000 to view the frontend.
    The backend should be running on http://localhost:5000.
Video Demonstration

You can find a video demonstration of the project in the file Assignment318.mp4 located inside the Alemeno directory

And for a hosted version of the app check link(Please bear in mind that due to free hosting the server is very slow):

https://coursefrontend.onrender.com
