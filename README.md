# Rick & Morty Character Management System

A complete REST API for managing Rick & Morty characters with authentication, JWT, protected routes, and image upload functionality.

## Features

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Image Upload (Cloudinary)
- ✅ Full CRUD Operations for Characters
- ✅ User-based Authorization

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure Cloudinary:
   - Open `config/cloudinary.js`
   - Replace with your Cloudinary credentials:
     - `YOUR_CLOUD_NAME`
     - `YOUR_API_KEY`
     - `YOUR_API_SECRET`
   - Get free credentials at: https://cloudinary.com

3. Start the server:
```bash
npm start
```

Or use nodemon for development:
```bash
npm run dev
```

## API Endpoints

### Authentication (Public)

#### Register
- **POST** `/api/auth/register`
- Body:
```json
{
    "name": "Rick Sanchez",
    "email": "rick@example.com",
    "password": "password123"
}
```

#### Login
- **POST** `/api/auth/login`
- Body:
```json
{
    "email": "rick@example.com",
    "password": "password123"
}
```
- Returns: JWT token

#### Get Current User (Protected)
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer YOUR_JWT_TOKEN`

### Characters

#### Get All Characters (Public)
- **GET** `/api/characters`

#### Get Character by ID (Public)
- **GET** `/api/characters/:id`

#### Get Characters by Status (Public)
- **GET** `/api/characters/status/:status`
- Status options: `Alive`, `Dead`, `Unknown`

#### Create Character (Protected)
- **POST** `/api/characters`
- Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
- Body: `form-data`
  - `name`: "Rick Sanchez"
  - `status`: "Alive"
  - `species`: "Human"
  - `type`: ""
  - `gender`: "Male"
  - `origin`: "Earth (C-137)"
  - `location`: "Earth (Replacement Dimension)"
  - `image`: [Upload file]

#### Update Character (Protected)
- **PUT** `/api/characters/:id`
- Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
- Body: `form-data` (same as create, optional image)

#### Delete Character (Protected)
- **DELETE** `/api/characters/:id`
- Headers: `Authorization: Bearer YOUR_JWT_TOKEN`

## Usage with Postman/Thunder Client

### Step 1: Register a User
1. Method: POST
2. URL: `http://localhost:3003/api/auth/register`
3. Body (JSON):
```json
{
    "name": "Your Name",
    "email": "your@email.com",
    "password": "yourpassword"
}
```

### Step 2: Login
1. Method: POST
2. URL: `http://localhost:3003/api/auth/login`
3. Body (JSON):
```json
{
    "email": "your@email.com",
    "password": "yourpassword"
}
```
4. Copy the `token` from response

### Step 3: Create a Character (Protected)
1. Method: POST
2. URL: `http://localhost:3003/api/characters`
3. Headers:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN_HERE`
4. Body (form-data):
   - `name`: Rick Sanchez
   - `status`: Alive
   - `species`: Human
   - `type`: (leave empty or add type)
   - `gender`: Male
   - `origin`: Earth (C-137)
   - `location`: Earth (Replacement Dimension)
   - `image`: [Select file to upload]

### Step 4: Get All Characters
1. Method: GET
2. URL: `http://localhost:3003/api/characters`

## Character Schema

```javascript
{
    name: String (required),
    status: String (Alive/Dead/Unknown),
    species: String (required),
    type: String,
    gender: String (Female/Male/Genderless/Unknown),
    origin: String (required),
    location: String (required),
    image: String (Cloudinary URL),
    createdBy: User ID (auto-filled)
}
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes require valid token
- Users can only update/delete their own characters
- Token expires in 7 days

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image storage
- Multer for file uploads
- Bcryptjs for password hashing

## Notes

- Server runs on port 3003
- MongoDB connection string is configured in `config/db.js`
- Update Cloudinary credentials before using image upload
- All protected routes require JWT token in Authorization header
