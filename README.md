## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/inventory-management-system.git
    cd inventory-management-system
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Set up MongoDB
    - Make sure MongoDB is installed and running on your machine.

4. Start the server
    ```bash
    nodemon app.js
    ```

5. Access the application
    - The server will be running on http://localhost:3000

## API Endpoints

### User Routes
- `POST /users/signup` - Sign up a new user
- `POST /users/login` - Log in a user
- `POST /users/verify-code` - Verify email with the code sent


### Product Routes
- `POST /products/add` - Add a new product
- `GET /products` - Get all products for the logged-in user
- `PUT /products/:id` - Update a product by ID
- `DELETE /products/:id` - Delete a product by ID

### Location Routes
- `POST /locations/add` - Add a new location
- `GET /locations` - Get all locations for the logged-in user
- `DELETE /locations/:id` - Delete a location by ID

## Usage

1. **Sign up**
    - Send a POST request to `/users/signup` with `name`, `email`, `password`, and `confirmPassword` in the request body.
    - You will receive a verification code via email.

2. **Verify Email**
    - After signing up, you will be redirected to the email verification page.
    - Enter the verification code sent to your email in the provided form.
    - Send a POST request to `/users/verify-code` with `email` and `verificationCode` in the request body to verify your  email.

3. **Log in**
    - Send a POST request to `/users/login` with `name` and `password` in the request body.

4. **Add Location**
    - Send a POST request to `/locations/add` with `name` in the request body.

5. **Add Product**
    - Send a POST request to `/products/add` with `name`, `description`, `location`, `icon`, and `quantity` in the request body.

6. **Get Locations**
    - Send a GET request to `/locations`.

7. **Get Products**
    - Send a GET request to `/products`.

8. **Update Product**
    - Send a PUT request to `/products/:id` with the updated fields in the request body.

9. **Delete Product**
    - Send a DELETE request to `/products/:id`.

10. **Delete Location**
    - Send a DELETE request to `/locations/:id`.

## Contributing

Feel free to submit pull requests and report issues. For major changes, please open an issue first to discuss what you would like to change.
