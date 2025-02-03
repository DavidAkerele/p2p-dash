# Transaction Detail App - Web Developer Test

## Overview

This web application was created as part of a practical test for the Web Developer role at **intelliSight**. The task involved building a simple **P2P Transaction Dashboard** using **Next.js**, to demonstrate skills in dynamic routing, API handling, and creating a clean user interface. 

The app allows users to view transaction details, toggle between light and dark mode, and navigate through transaction information.

## Features

- **Transaction Dashboard**: Displays a list of transactions with key details such as ID, sender, receiver, amount, and status.
- **Transaction Detail Page**: Clicking on a transaction navigates to its detailed view with more information, including the timestamp.
- **Dark Mode/Light Mode Toggle**: Users can toggle between dark and light modes.
- **Transaction Status Filter**: A dropdown filter allows users to view transactions based on their status (Pending, Completed, Failed).
- **Responsive Design**: The application is responsive and works well on both desktop and mobile.
  
## Technologies Used

- **Next.js**: Framework for building the app and handling dynamic routing.
- **CSS**: For styling the UI.
- **LocalStorage**: Simulates API calls to fetch transaction data stored in the local storage.
  
## Task Requirements

- **Homepage** (`/dashboard`):
  - Displays a table of transactions with the following fields: ID, Sender Name, Receiver Name, Amount, and Status.
  - A dropdown to filter transactions by status (Pending, Completed, Failed).
  
- **Transaction Details Page** (`/transaction/[id]`):
  - Clicking on a transaction should navigate to its details page.
  - The transaction details page displays all information, including the timestamp.
  
- **Bonus (Optional)**:
  - Added dark mode support for a better user experience.
  
## Setup

To run this project locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DavidAkerele/transaction-detail-app.git
   ```

2. **Install dependencies**:
   Ensure you have either `npm` or `yarn` installed, then install the required dependencies:
   ```bash
   npm install
   ```
   or with Yarn:
   ```bash
   yarn install
   ```

3. **Run the app**:
   Start the development server:
   ```bash
   npm run dev
   ```
   or with Yarn:
   ```bash
   yarn dev
   ```

4. **View the app**:
   Open your browser and visit `http://localhost:3000` to see the app in action.

## Usage

- **Dashboard**: View a list of transactions with the option to filter by status.
- **Transaction Details**: Click on a transaction to see its details, including the timestamp.
- **Dark Mode**: Use the toggle button in the top right to switch between light and dark themes.

## Project Structure

```
/transaction-detail-app
  /components
    - TransactionDetail.tsx
  /pages
    - index.tsx
    - dashboard.tsx
    - transaction
      - [id].tsx
  /public
  /styles
    - globals.css
  package.json
  README.md
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Akerele David Damilola** – [GitHub Profile](https://github.com/DavidAkerele)
