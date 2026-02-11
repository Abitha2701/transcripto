# Transcripto - Complete Setup Guide

## Overview
Transcripto is a full-stack audio/video transcription application with a React frontend and Express.js backend.

## Project Structure
```
transcripto/
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── pages/     # Welcome, Login, Signup, Dashboard pages
│   │   ├── styles/    # CSS styling for each page
│   │   ├── App.jsx    # Main app with routing
│   │   └── main.jsx   # Entry point
│   └── package.json
│
└── backend/           # Express.js API server
    ├── controllers/   # Route controllers
    ├── model/        # MongoDB models
    ├── routes/       # API routes
    ├── server.js     # Main server file
    ├── .env          # Environment variables
    └── package.json
```

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB connection (already configured)
- npm or yarn

### 1. Backend Setup

Navigate to backend folder:
```bash
cd backend
npm install
npm start
```

The backend will start on `http://localhost:5000`

**Backend includes:**
- User registration endpoint: `POST /auth/register`
- User login endpoint: `POST /auth/login`
- MongoDB integration
- JWT authentication
- Password hashing with bcryptjs

### 2. Frontend Setup

Navigate to frontend folder:
```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5174`

## Frontend Pages

### 1. **Welcome Page** (`/`)
- Landing page with app features
- "Login" and "Sign Up Free" buttons
- Gradient background with smooth animations

### 2. **Login Page** (`/login`)
- User login with email and password
- Form validation
- JWT token storage in localStorage
- Auto-redirect to dashboard on success
- Link to signup page

### 3. **Signup Page** (`/signup`)
- User registration form
- Username, email, password fields
- Password confirmation validation
- Auto-login after registration
- Link to login page

### 4. **Dashboard** (`/dashboard`)
- Protected route (requires authentication)
- Displays user email
- Logout functionality
- Placeholder for future features (file upload, transcripts, settings)

## Authentication Flow

1. User visits `/login` or `/signup`
2. Submits credentials to backend
3. Backend validates and returns JWT token
4. Frontend stores token in `localStorage`
5. User redirected to protected `/dashboard`
6. Logout clears token and redirects to home

## Technologies Used

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP requests
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with gradients and animations

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## File Structure

### Frontend Components

**Welcome.jsx** - Landing page
- Features showcase
- Call-to-action buttons
- Responsive grid layout

**Login.jsx** - User authentication
- Email/password form
- Validation and error handling
- localStorage token management

**Signup.jsx** - User registration
- Form with 4 fields
- Password confirmation
- Auto-login after registration

**Dashboard.jsx** - Protected user area
- User profile display
- Logout button
- Feature cards

### Styling
- `Welcome.css` - Gradient backgrounds, animations
- `Auth.css` - Form styling, error messages
- `Dashboard.css` - Navigation bar, cards
- `App.css` - Global styles
- `index.css` - Base CSS reset

## API Endpoints

### Register User
```
POST /auth/register
Headers: Content-Type: application/json
Body: {
  "username": "string",
  "email": "string",
  "password": "string"
}
Response: { "message": "User registered successfully" }
```

### Login User
```
POST /auth/login
Headers: Content-Type: application/json
Body: {
  "email": "string",
  "password": "string"
}
Response: { "token": "jwt_token_string" }
```

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://...
PORT=5000
JWT_SECRET=your_secret_key
```

The backend is already configured with MongoDB and JWT settings.

## Running Both Servers

### Terminal 1 - Backend
```bash
cd backend
npm start
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Both servers run simultaneously:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5174`

## Testing the Application

1. **Visit Welcome Page**
   - Open `http://localhost:5174`
   - See landing page with features

2. **Test Signup**
   - Click "Sign Up Free"
   - Fill in form (username, email, password)
   - Should redirect to dashboard

3. **Test Login**
   - Click "Login"
   - Use registered email and password
   - Should redirect to dashboard

4. **Test Dashboard**
   - See user email displayed
   - Click "Logout" to return to welcome page

## Future Enhancements

- [ ] File upload functionality
- [ ] Transcription processing
- [ ] Download transcripts
- [ ] User profile settings
- [ ] Email verification
- [ ] Password reset
- [ ] Real-time status updates
- [ ] Admin dashboard

## Troubleshooting

### Backend won't connect
- Check MongoDB URI in .env
- Ensure MongoDB is accessible
- Check JWT_SECRET is set

### Frontend won't load
- Ensure backend is running on port 5000
- Check CORS is enabled
- Clear browser cache

### Login/Signup errors
- Check browser console for errors
- Verify backend logs for validation errors
- Ensure email is unique for registration

## Production Deployment

Before deploying to production:

1. Change `JWT_SECRET` to a strong random string
2. Update MongoDB URI to production database
3. Change API URL in frontend from localhost to production domain
4. Build frontend: `npm run build`
5. Set appropriate CORS origins
6. Enable HTTPS
7. Use environment-specific configuration

---

**Ready to use!** The complete authentication system with welcome, login, signup, and dashboard pages is now set up and running.
