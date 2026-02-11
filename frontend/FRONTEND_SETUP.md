# Transcripto Frontend

A modern React frontend for the Transcripto audio/video transcription application.

## Features

- **Welcome Page**: Landing page with app overview and call-to-action buttons
- **Login Page**: User authentication with email and password
- **Signup Page**: New user registration with validation
- **Dashboard**: Protected user dashboard showing transcription features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Backend Integration**: Connected to the Express.js backend API

## Pages

### Welcome Page (`/`)
- Landing page showcasing the app features
- Links to login and signup pages
- Modern gradient design with smooth animations

### Login Page (`/login`)
- User login with email and password
- Form validation
- Error handling
- Auto-redirect to dashboard on successful login

### Signup Page (`/signup`)
- New user registration
- Username, email, and password validation
- Password confirmation check
- Auto-login after successful registration

### Dashboard (`/dashboard`)
- Protected route (requires authentication token)
- User email display
- Logout functionality
- Feature cards for future functionality

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. The frontend expects the backend to be running on `http://localhost:5000`
   - Make sure your backend server is running before testing the app

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite default)

### Building for Production

```bash
npm run build
```

### Environment Configuration

The backend API URL is currently hardcoded to `http://localhost:5000`. For production, consider moving this to an environment variable.

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Welcome.jsx       # Landing page
│   │   ├── Login.jsx         # Login page
│   │   ├── Signup.jsx        # Registration page
│   │   └── Dashboard.jsx     # User dashboard
│   ├── styles/
│   │   ├── Welcome.css       # Welcome page styles
│   │   ├── Auth.css          # Login/Signup styles
│   │   └── Dashboard.css     # Dashboard styles
│   ├── App.jsx               # Main app with routing
│   ├── App.css               # Global styles
│   ├── main.jsx              # Entry point
│   └── index.css             # Base styles
├── package.json
└── vite.config.js
```

## Dependencies

- **react**: UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client for API requests

## API Integration

The frontend connects to the backend API endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Authentication Flow

1. User submits login/signup form
2. Frontend sends request to backend
3. Backend validates and returns JWT token
4. Token is stored in localStorage
5. User is redirected to dashboard
6. Token is required for protected routes

### Token Storage

Authentication tokens are stored in localStorage with the key `authToken`. The user's email is also stored as `userEmail`.

## Features to Implement

- [ ] File upload functionality
- [ ] Transcript display and management
- [ ] User settings/profile page
- [ ] Real-time transcription status
- [ ] Download transcripts in various formats
- [ ] Share transcripts with others

## Styling

The app uses custom CSS with:
- Gradient backgrounds
- Smooth animations and transitions
- Responsive grid layouts
- Modern card-based design
- Mobile-first approach

## Troubleshooting

### Backend Connection Error
- Ensure the backend server is running on port 5000
- Check CORS is enabled in the backend
- Verify the API endpoints match the frontend URLs

### Login/Signup Not Working
- Check browser console for error messages
- Verify the backend is responding (check backend logs)
- Ensure valid email and password formats

### Styling Issues
- Clear browser cache
- Ensure all CSS files are imported correctly
- Check for CSS conflicts

## Future Enhancements

- Add email verification
- Implement password reset functionality
- Add user profile customization
- Implement file upload and processing
- Add real-time notifications
- Create admin dashboard

---

For backend setup and configuration, see the backend README.
