
# Medical Store Solution

## Overview

The **Medical Store Solution** is a software system designed to streamline and manage various aspects of running a medical store or pharmacy. It aims to provide an efficient and user-friendly platform for managing inventory, tracking sales, and simplifying the day-to-day operations of a medical store.

This README serves as an introduction to the project, its features, installation instructions, and usage guidelines.
## Home Page
- **URL**: `/`
- Key Features:
  - **Search Products**: Users can search for products available on the platform.
  - **Cart**: View and manage items added to the cart.
  - **Sign In**: Option to log into the user account.

## Login Page
- **URL**: `/login`
- User Types:
  - **Admin**: Access to admin-specific features.
  - **Customer**: Access to customer-specific features.

## Register Page (Customer)
- **URL**: `/register`
- Allows customers to register for an account on the platform.

## Admin Features
### 1. Manage Section:
  - **Manage Products**: Admins can add, edit, and remove products.
  - **Manage Orders**: Admins can view, edit, and manage customer orders.
  - **Manage Users**: Admins can manage customer accounts.

### 2. Service Section:
  - **Consult with Doctor**: Customers can book an appointment for consultation.
  - **Lab Test**: Book lab tests for users.
  - **Compounding Medication**: Request compounded medication through the platform.

### 3. Profile Section:
  - **Profile Details**: Includes:
    - Profile picture
    - Full Name
    - Total Points
    - City
    - Email
    - Qualifications

## Customer Features
### 1. Profile Section:
  - **Profile Details**: Includes:
    - Profile picture
    - Full Name
    - Total Points
    - City
    - Email
    - Qualifications

### 2. Order Management:
  - **Place Orders**: Customers can add products to their cart and place orders.
  - **Manage Orders**: View and manage past and active orders.

## Admin Commands

- **Install**: install locally.
  ```bash
  npm install && cd frontend && npm install
  
- **Run**: run locally concurrently.
  ```bash
  npm run dev

- **Data Import**: Import default data into the application.
  ```bash
  npm run data:import

#### admin User',
email: 'alshifa@admin.com',
password : 123456
#### customer test
name: 'kashif Siddique',
email: 'kashif@example.com',
password : 123456

Thank you for Reaching me! 
