#  Full Stack CRUD application built with Node.js, Express, MongoDB, and React (Vite).

#### This project demonstrates how backend APIs connect to a frontend application and how data flows from the database to the browser.

## 🚀 Tech Stack
#### Backend

#### Node.js

 #### Express.js

#### MongoDB

#### Mongoose

#### CORS

#### dotenv

#### Frontend

#### React (Vite)

#### Axios

#### API Testing

#### Postman


### 🔥 Features

Create a note using POST method using  api/notes

Fetch all notes form GET using api/notes

Update a note  (full or partial)

Delete a note

Store data in MongoDB

Display notes dynamically in the browser

### 📡 REST API Endpoints

#### Base URL:

http://localhost:3000/api/notes
Method	Endpoint	Description
GET	/api/notes	Get all notes
POST	/api/notes	Create a new note
PUT	/api/notes/:id	Update entire note
PATCH	/api/notes/:id	Update specific fields
DELETE	/api/notes/:id	Delete a note

### 🔗 Backend to Frontend Flow

#### MongoDB → Express API → Axios → React State → Browser UI

#### Backend runs on: http://localhost:3000

#### Frontend runs on: http://localhost:5173

CORS enabled for cross-origin communication

### 🛠 How to Run the Project
### 1️⃣ Run Backend
cd backend
npm install
npm start
### 2️⃣ Run Frontend
cd frontend
npm install
npm run dev

Open in browser:

http://localhost:5173
#### 💡 Key Learnings

Understanding REST APIs

Difference between PUT and PATCH

Connecting MongoDB with Express

Handling CORS issues

Fetching backend data in React

Debugging network errors
