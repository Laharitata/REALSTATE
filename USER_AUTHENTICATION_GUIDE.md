A# User Authentication System Guide

## ✅ Current Implementation

Your real estate application **already supports** individual user accounts with unique usernames and passwords. Here's how it works:

---

## 🔐 User Account Features

### 1. **Unique Username & Email**
Each user must have:
- ✅ **Unique username** - No two users can have the same username
- ✅ **Unique email** - No two users can have the same email address
- ✅ **Secure password** - Passwords are hashed using bcrypt (cannot be reversed)

### 2. **User Registration (Signup)**
When a user signs up, the system:
1. Checks if username or email already exists
2. If exists → Returns error: "User already exists"
3. If new → Hashes the password with bcrypt
4. Saves user to database with all details

**Required Fields:**
- Username (unique)
- Password (will be hashed)
- Email (unique)
- Name
- Phone (optional)

### 3. **User Login**
When a user logs in:
1. System finds user by username
2. Compares entered password with hashed password using bcrypt
3. If match → Generates JWT token (valid for 1 hour)
4. Returns token + user information
5. Token is stored in browser localStorage

### 4. **Protected Routes**
Each user has their own:
- ✅ **Profile** - Personal information
- ✅ **Wishlist** - Properties they're interested in
- ✅ **Purchase History** - Properties they've shown interest in
- ✅ **Listed Properties** - Properties they've listed for sale/rent

---

## 🧪 Testing Individual User Accounts

### Test Scenario 1: Create Multiple Users

**User 1:**
```json
{
  "username": "john_doe",
  "password": "john123",
  "email": "john@example.com",
  "name": "John Doe",
  "phone": "1234567890"
}
```

**User 2:**
```json
{
  "username": "jane_smith",
  "password": "jane456",
  "email": "jane@example.com",
  "name": "Jane Smith",
  "phone": "9876543210"
}
```

**User 3:**
```json
{
  "username": "bob_wilson",
  "password": "bob789",
  "email": "bob@example.com",
  "name": "Bob Wilson",
  "phone": "5551234567"
}
```

### Test Scenario 2: Verify Uniqueness

Try to create a user with existing username:
```json
{
  "username": "john_doe",  // Already exists!
  "password": "different123",
  "email": "newemail@example.com",
  "name": "Another John"
}
```
**Result:** ❌ Error - "User already exists"

Try to create a user with existing email:
```json
{
  "username": "new_user",
  "password": "pass123",
  "email": "john@example.com",  // Already exists!
  "name": "New User"
}
```
**Result:** ❌ Error - "User already exists"

### Test Scenario 3: Login with Different Users

Each user logs in with their own credentials:

**John's Login:**
- Username: `john_doe`
- Password: `john123`
- Gets unique JWT token for John

**Jane's Login:**
- Username: `jane_smith`
- Password: `jane456`
- Gets unique JWT token for Jane

**Bob's Login:**
- Username: `bob_wilson`
- Password: `bob789`
- Gets unique JWT token for Bob

---

## 🔒 Security Features

### 1. **Password Hashing**
```javascript
// Original password: "john123"
// Stored in database: "$2a$10$pvf5uVSeowYgangdTuVOge/0KrOt7anuY6sROS..."
// Cannot be reversed to get original password
```

### 2. **JWT Token Authentication**
- Each user gets a unique token when they log in
- Token contains user ID and username
- Token expires after 1 hour
- Token required to access protected routes

### 3. **User Isolation**
- Each user can only see/modify their own:
  - Wishlist
  - Purchase history
  - Profile information
- Users cannot access other users' private data

---

## 📱 User Flow Example

### John's Journey:
1. **Signs up** → Creates account with username "john_doe"
2. **Logs in** → Gets JWT token
3. **Browses properties** → Sees all available properties
4. **Adds to wishlist** → Saves to John's wishlist only
5. **Lists property** → Property shows John's name as owner
6. **Views profile** → Sees John's information only
7. **Logs out** → Token removed

### Jane's Journey (Separate):
1. **Signs up** → Creates account with username "jane_smith"
2. **Logs in** → Gets different JWT token
3. **Browses properties** → Sees all properties (including John's)
4. **Adds to wishlist** → Saves to Jane's wishlist only (separate from John's)
5. **Views profile** → Sees Jane's information only
6. **Cannot see** → John's wishlist or purchase history

---

## 🎯 Key Points

✅ **Each user is completely separate**
- Different username
- Different password (hashed)
- Different email
- Different wishlist
- Different purchase history
- Different profile

✅ **Database enforces uniqueness**
- MongoDB unique constraint on username
- MongoDB unique constraint on email
- Prevents duplicate accounts

✅ **Secure authentication**
- Passwords never stored in plain text
- bcrypt hashing (industry standard)
- JWT tokens for session management
- Token expiration for security

---

## 🚀 How to Use

### For Users:
1. Go to signup page
2. Enter unique username and email
3. Create password
4. Fill in name and phone
5. Click "Sign Up"
6. Login with your credentials
7. Access your personal dashboard

### For Testing:
1. Create multiple test accounts with different usernames
2. Login with each account separately
3. Verify each user has their own wishlist
4. Verify each user has their own profile
5. Verify users cannot access each other's data

---

## 📊 Database Structure

### Users Collection:
```javascript
{
  _id: ObjectId("..."),
  username: "john_doe",           // Unique
  password: "$2a$10$...",          // Hashed
  email: "john@example.com",      // Unique
  name: "John Doe",
  phone: "1234567890",
  joined: ISODate("2024-01-01")
}
```

### Wishlist Collection (User-Specific):
```javascript
{
  _id: ObjectId("..."),
  user: ObjectId("john's_user_id"),    // Links to specific user
  property: ObjectId("property_id")
}
```

### Purchase Collection (User-Specific):
```javascript
{
  _id: ObjectId("..."),
  user: ObjectId("john's_user_id"),    // Links to specific user
  property: ObjectId("property_id"),
  date: ISODate("2024-01-01")
}
```

---

## ✅ Conclusion

Your application **already has a complete user authentication system** where:
- ✅ Each user has their own unique username
- ✅ Each user has their own secure password
- ✅ Each user has their own profile
- ✅ Each user has their own wishlist
- ✅ Each user has their own purchase history
- ✅ Users are completely isolated from each other
- ✅ All data is secure and properly authenticated

**No additional changes needed** - the system is working correctly!
