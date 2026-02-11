# Transcripto - Quick Testing Guide

## ✅ Pre-Flight Checklist

Before testing, ensure:
- [ ] Backend server running on `http://localhost:5000`
- [ ] Frontend server running on `http://localhost:5174`
- [ ] Both show "Connected" in terminals
- [ ] MongoDB connection confirmed

---

## 🧪 Test Case 1: Welcome Page Display

**Steps:**
1. Open browser to `http://localhost:5174`
2. Should see purple gradient background
3. Should see "Transcripto" title
4. Should see feature cards (3 items)
5. Should see two buttons: "Login" and "Sign Up Free"

**Expected Result:** ✅ All elements visible with no errors

---

## 🧪 Test Case 2: Navigation from Welcome Page

**Test 2a: Navigate to Login**
1. On welcome page
2. Click "Login" button
3. Should navigate to `/login`
4. Should see login form with email and password fields

**Test 2b: Navigate to Signup**
1. On welcome page
2. Click "Sign Up Free" button
3. Should navigate to `/signup`
4. Should see signup form with username, email, password fields

**Expected Result:** ✅ Both navigation paths work correctly

---

## 🧪 Test Case 3: Signup with Valid Data

**Steps:**
1. Go to `/signup`
2. Fill in form:
   - Username: `testuser123`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `password123`
3. Click "Sign Up" button
4. Wait for processing (loading state should show "Creating Account...")
5. Should redirect to `/dashboard`
6. Should see `test@example.com` displayed on dashboard

**Expected Result:** ✅ Account created, auto-logged in, dashboard displayed

---

## 🧪 Test Case 4: Signup Form Validation

**Test 4a: Invalid Username (too short)**
1. Go to `/signup`
2. Username: `ab` (only 2 characters)
3. Email: `test@example.com`
4. Password: `password123`
5. Confirm: `password123`
6. Click "Sign Up"
7. Should see error: "Username must be at least 3 characters"

**Test 4b: Invalid Email**
1. Go to `/signup`
2. Username: `testuser`
3. Email: `notanemail`
4. Password: `password123`
5. Confirm: `password123`
6. Click "Sign Up"
7. Should see error: "Please enter a valid email"

**Test 4c: Short Password**
1. Go to `/signup`
2. Username: `testuser`
3. Email: `test2@example.com`
4. Password: `pass` (less than 6 chars)
5. Confirm: `pass`
6. Click "Sign Up"
7. Should see error: "Password must be at least 6 characters"

**Test 4d: Passwords Don't Match**
1. Go to `/signup`
2. Username: `testuser`
3. Email: `test2@example.com`
4. Password: `password123`
5. Confirm: `different123`
6. Click "Sign Up"
7. Should see error: "Passwords do not match"

**Test 4e: Missing Fields**
1. Go to `/signup`
2. Leave fields empty
3. Click "Sign Up"
4. Should see error: "Please fill in all fields"

**Expected Result:** ✅ All validation errors display correctly

---

## 🧪 Test Case 5: Signup with Duplicate Email

**Steps:**
1. Go to `/signup`
2. Use email from previous test: `test@example.com`
3. Fill other fields with new data
4. Click "Sign Up"
5. Should see error: "User already exists"

**Expected Result:** ✅ Backend prevents duplicate emails

---

## 🧪 Test Case 6: Login with Valid Credentials

**Steps:**
1. Go to `/login`
2. Email: `test@example.com`
3. Password: `password123`
4. Click "Login"
5. Should show loading state "Logging in..."
6. Should redirect to `/dashboard`
7. Should display email: `test@example.com`

**Expected Result:** ✅ Login successful, dashboard displayed

---

## 🧪 Test Case 7: Login Form Validation

**Test 7a: Invalid Email Format**
1. Go to `/login`
2. Email: `notanemail`
3. Password: `password123`
4. Click "Login"
5. Should see error: "Please enter a valid email"

**Test 7b: Empty Password**
1. Go to `/login`
2. Email: `test@example.com`
3. Password: (empty)
4. Click "Login"
5. Should see error: "Please fill in all fields"

**Test 7c: Wrong Password**
1. Go to `/login`
2. Email: `test@example.com`
3. Password: `wrongpassword`
4. Click "Login"
5. Should see error: "Invalid credentials"

**Test 7d: Non-existent Email**
1. Go to `/login`
2. Email: `nonexistent@example.com`
3. Password: `password123`
4. Click "Login"
5. Should see error: "Invalid credentials"

**Expected Result:** ✅ All validation errors display correctly

---

## 🧪 Test Case 8: Dashboard Features

**Steps:**
1. Login to dashboard (from Test Case 6)
2. Verify elements:
   - [ ] "Transcripto" logo visible (top left)
   - [ ] User email displayed (top right)
   - [ ] "Logout" button visible (top right)
   - [ ] Welcome message displays email
   - [ ] Three feature cards visible

**Expected Result:** ✅ All dashboard elements present and correct

---

## 🧪 Test Case 9: Logout

**Steps:**
1. On dashboard page
2. Click "Logout" button
3. localStorage should be cleared
4. Should redirect to `/` (welcome page)
5. Try to manually navigate to `/dashboard`
6. Should redirect to `/login` (no token)

**Expected Result:** ✅ Logout clears data and redirects properly

---

## 🧪 Test Case 10: Protected Routes

**Steps:**
1. Go to `/dashboard` directly without logging in
2. Should redirect to `/login` automatically
3. Try accessing unknown route like `/invalid`
4. Should redirect to `/`

**Expected Result:** ✅ Routes are properly protected

---

## 🧪 Test Case 11: Browser Storage Verification

**Steps:**
1. Login successfully
2. Open Browser DevTools (F12)
3. Go to Application → Storage → localStorage
4. Should see:
   - Key: `authToken` with JWT value
   - Key: `userEmail` with email value
5. Logout
6. localStorage should be cleared

**Expected Result:** ✅ Token and email properly stored and cleared

---

## 🧪 Test Case 12: Form Responsiveness

**Steps:**
1. Open browser DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test on different sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px)
4. Verify all pages are readable and functional

**Expected Result:** ✅ All pages are responsive and mobile-friendly

---

## 🧪 Test Case 13: Loading States

**Steps:**
1. Go to login or signup
2. Fill form
3. Click submit
4. Watch button change to loading state
5. Button should show "Logging in..." or "Creating Account..."
6. Wait for response

**Expected Result:** ✅ Loading states display correctly

---

## 🧪 Test Case 14: Error Message Display

**Steps:**
1. Trigger any validation error
2. Error should appear in red box
3. Error text should be clear and helpful
4. Correct field and retry

**Expected Result:** ✅ Errors display clearly and allow retry

---

## 📊 Summary Table

| Test | Status | Notes |
|------|--------|-------|
| Welcome page display | | |
| Navigation works | | |
| Signup with valid data | | |
| Signup validation | | |
| Duplicate email prevention | | |
| Login with valid data | | |
| Login validation | | |
| Dashboard display | | |
| Logout functionality | | |
| Protected routes | | |
| localStorage management | | |
| Responsive design | | |
| Loading states | | |
| Error displays | | |

---

## 🐛 Debugging Tips

### Frontend Console (F12 → Console)
- Check for JavaScript errors
- Look for CORS errors
- Verify API responses

### Network Tab (F12 → Network)
- Check API requests to backend
- Verify response status codes
- Inspect request/response bodies

### Backend Console
- Check for MongoDB connection issues
- Look for validation errors
- Verify JWT token generation

### Common Issues

**"Cannot POST /auth/register"**
- Backend not running
- Wrong API URL in frontend

**CORS Error**
- Backend CORS not enabled
- Wrong frontend origin

**"Cannot read property 'token'"**
- Backend not returning token
- Response format incorrect

**"localStorage is not defined"**
- Running in non-browser environment
- SSR configuration issue

---

## ✅ All Tests Passed?

If all tests pass, your Transcripto application is **fully functional and ready to use!** 🎉

Next steps:
- Add file upload functionality
- Implement transcription processing
- Create transcript management interface
- Add user profile settings

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the backend console for API errors
3. Verify both servers are running
4. Check MongoDB connection
5. Review the USER_FLOW.md for expected behavior
