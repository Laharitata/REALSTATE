b# Testing Checklist for Real Estate Webapp

## Backend API Tests
- [x] Auth endpoints: Signup (POST /signup) - success and error cases
- [x] Auth endpoints: Login (POST /login) - success and error cases
- [x] Properties: POST /api/properties - add property with JWT auth
- [x] Properties: GET /api/properties - retrieve all properties
- [x] Profile: GET /profile - fetch user data with JWT (token issue)
- [x] Wishlist: GET /api/wishlist - retrieve user's wishlist
- [x] Wishlist: POST /api/wishlist - add to wishlist
- [x] Wishlist: DELETE /api/wishlist/:id - remove from wishlist
- [x] Error handling: Invalid tokens, missing fields, unauthorized access

## Frontend UI Tests
- [x] Login page: Form submission, success redirect, error display
- [x] Signup page: Form submission, success redirect, error display
- [x] Sell page: Form submission with auth, property addition
- [x] Buy page: Display properties grouped by type, interaction
- [x] Profile page: Display user data
- [x] Wishlist page: Display and remove items
- [x] Protected routes: Redirect to login if no token
- [x] Navbar: Navigation links, logout functionality

## End-to-End Flow Tests
- [ ] Register new user, login, add property, view on buy page, add to wishlist, view profile, logout

## Post-Test Actions
- [ ] Fix any bugs found during testing
- [ ] Rebuild frontend if changes made
- [ ] Confirm all tests pass
- [ ] Complete task with deployment instructions
