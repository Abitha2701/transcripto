# Transcripto - User Navigation Flow

## Application Routing Map

```
┌─────────────────────────────────────────────────────────────┐
│                      Welcome Page (/)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🎯 Transcripto - Transform Audio Into Text         │   │
│  │                                                     │   │
│  │  Features:  ⚡ Fast Processing                     │   │
│  │             🎯 Accurate                            │   │
│  │             🔒 Secure                              │   │
│  │                                                     │   │
│  │  [Login Button]    [Sign Up Free Button]          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
        │                                    │
        │ Login                              │ Sign Up
        ▼                                    ▼
┌──────────────────────┐      ┌──────────────────────┐
│  Login Page (/login) │      │ Signup Page (/signup)│
├──────────────────────┤      ├──────────────────────┤
│ Welcome Back         │      │ Create Account       │
│ Login to Transcripto │      │ Join Transcripto     │
│                      │      │                      │
│ Email: [_________]   │      │ Username: [____]     │
│ Password: [_______]  │      │ Email: [_________]   │
│                      │      │ Password: [____]     │
│ [Login Button]       │      │ Confirm: [____]      │
│                      │      │                      │
│ Sign Up Link ──┐     │      │ [Sign Up Button]     │
│                │     │      │                      │
└────────────────┼─────┘      │ Login Link ───┐      │
        │        │            │               │      │
        │        └────────────┼───────────────┘      │
        │         Send to API │                      │
        └─────────────────────┼──────────────────────┘
                              │
                 ┌────────────▼────────────┐
                 │   Backend API Server    │
                 │ /auth/login             │
                 │ /auth/register          │
                 │   Validate Credentials  │
                 │   Generate JWT Token    │
                 │   Return Token          │
                 └────────────┬────────────┘
                              │
                              │ Token + Store in localStorage
                              │
        ┌─────────────────────▼──────────────────────┐
        │                                            │
        │   Dashboard Page (/dashboard)             │
        │  ┌──────────────────────────────────────┐ │
        │  │ Transcripto        [user@email.com]  │ │
        │  │                            [Logout]  │ │
        │  └──────────────────────────────────────┘ │
        │                                            │
        │  Welcome to Dashboard                     │
        │  You are logged in as user@email.com      │
        │                                            │
        │  ┌──────────────┐  ┌──────────────┐       │
        │  │📁 Upload     │  │📝 View       │       │
        │  │Files         │  │Transcripts   │       │
        │  └──────────────┘  └──────────────┘       │
        │  ┌──────────────┐                          │
        │  │⚙️ Settings   │                          │
        │  └──────────────┘                          │
        │                                            │
        │  [Logout Button] ─────────┐               │
        └────────────────────────────┼───────────────┘
                                     │
                    ┌────────────────▼──────────────┐
                    │   Clear Token                │
                    │   Clear User Data           │
                    │   Redirect to Welcome Page  │
                    └────────────────┬─────────────┘
                                     │
                                     ▼
                        Back to Welcome Page (/)
```

## Authentication State Machine

```
┌─────────────────┐
│  Unauthenticated│  (No Token in localStorage)
│  Can access:   │
│  - Welcome (/) │
│  - Login       │
│  - Signup      │
└────────┬────────┘
         │
         │ Successful Login/Signup
         │ (Store token in localStorage)
         │
         ▼
┌─────────────────────┐
│  Authenticated      │  (Token in localStorage)
│  Can access:       │
│  - Welcome (/)     │
│  - Login           │
│  - Signup          │
│  - Dashboard ✓✓✓  │  (Protected Route)
└────────┬────────────┘
         │
         │ Logout Action
         │ (Remove token from localStorage)
         │
         ▼
┌─────────────────┐
│  Unauthenticated│  (Back to start)
└─────────────────┘
```

## Page Details

### 1️⃣ Welcome Page (/)
**Purpose**: Landing page for new visitors
**Features**:
- App logo and tagline
- Feature highlights
- Call-to-action buttons
- No login required

**Navigation**:
- Login button → `/login`
- Sign Up button → `/signup`

---

### 2️⃣ Login Page (/login)
**Purpose**: Authenticate existing users
**Required Fields**:
- Email address
- Password

**Validation**:
- ✓ Email must be valid format
- ✓ Password must not be empty
- ✓ Check backend credentials

**On Success**:
- Store JWT token in localStorage
- Store user email in localStorage
- Redirect to `/dashboard`

**On Error**:
- Display error message
- Clear password field
- Allow retry

**Navigation**:
- "Don't have an account?" → `/signup`

---

### 3️⃣ Signup Page (/signup)
**Purpose**: Register new users
**Required Fields**:
- Username (min 3 characters)
- Email address
- Password (min 6 characters)
- Confirm password

**Validation**:
- ✓ Username must be 3+ characters
- ✓ Email must be valid
- ✓ Password must be 6+ characters
- ✓ Passwords must match
- ✓ Email must not already exist (backend check)

**On Success**:
- Create account
- Auto-login with JWT token
- Store credentials in localStorage
- Redirect to `/dashboard`

**On Error**:
- Display error message
- Keep form data (except password)
- Allow retry

**Navigation**:
- "Already have an account?" → `/login`

---

### 4️⃣ Dashboard Page (/dashboard)
**Purpose**: Main user area (Protected)
**Access**: Only with valid JWT token
**Features**:
- User email display
- Navigation header
- Logout button
- Feature cards (placeholders)

**Navigation**:
- Logout button → `/` (clears localStorage)
- Auto-redirect if no token → `/login`

---

## Data Flow

### Registration Flow
```
User enters details
    ↓
Frontend validates
    ↓
POST /auth/register to backend
    ↓
Backend validates email uniqueness
    ↓
Backend hashes password
    ↓
Backend saves to MongoDB
    ↓
Response: "User registered successfully"
    ↓
Auto-login with POST /auth/login
    ↓
Backend validates & generates JWT
    ↓
Response: { token: "jwt_string" }
    ↓
Store token in localStorage
    ↓
Redirect to /dashboard
```

### Login Flow
```
User enters email & password
    ↓
Frontend validates
    ↓
POST /auth/login to backend
    ↓
Backend finds user by email
    ↓
Backend compares password hash
    ↓
Backend generates JWT token
    ↓
Response: { token: "jwt_string" }
    ↓
Store token in localStorage
    ↓
Redirect to /dashboard
```

### Logout Flow
```
User clicks Logout
    ↓
Remove token from localStorage
    ↓
Remove email from localStorage
    ↓
Redirect to /
    ↓
User is back on Welcome page
```

---

## Token Management

**Storage**: `localStorage`

**Key**: `authToken`
**Value**: JWT token string
**Lifespan**: Until logout or browser close

**Key**: `userEmail`
**Value**: User's email address
**Lifespan**: Until logout or browser close

---

## Error Handling

### Login/Signup Errors
```
Invalid email format
    → "Please enter a valid email"

Password too short
    → "Password must be at least 6 characters"

Passwords don't match
    → "Passwords do not match"

Email already exists
    → "User already exists"

Invalid credentials (login)
    → "Invalid credentials"

Missing fields
    → "Please fill in all fields"

Server error
    → "Server error" or "Login failed. Please try again."
```

---

## Browser Compatibility

- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

---

## Security Features

1. **Password**: Hashed with bcryptjs (12 rounds)
2. **Token**: JWT with 1-hour expiration
3. **CORS**: Enabled for frontend origin
4. **Validation**: Both frontend and backend
5. **localStorage**: Secure token storage

---

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1024px
- **Mobile**: Below 768px

All pages are fully responsive!
