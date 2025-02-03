
# Transaction Detail App - Company Test

## Overview

This web application was built as part of a technical test for a company. The app displays detailed transaction information fetched from local storage and features a dark mode/light mode toggle for enhanced user experience. 

The app was developed using **React** with **Next.js** and incorporates simple styling using **CSS**.

## Features

- **Dark Mode/Light Mode Toggle**: Allows users to switch between dark and light themes for better accessibility and user preference.
- **Transaction Details**: Displays detailed information about a transaction, including ID, sender, receiver, amount, status, and timestamp.
- **Responsive Design**: The app is designed to be responsive on both desktop and mobile devices.
- **Navigation**: A button that navigates the user back to the dashboard.
  
## Technologies Used

- **React (Next.js)**: Framework used to build the frontend of the application.
- **CSS**: For styling and layout.
- **LocalStorage**: Used to fetch transaction data for display.

## Setup

To run this project locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   ```

2. **Install dependencies**:
   Make sure you have either `npm` or `yarn` installed. Then install the required dependencies by running:
   ```bash
   npm install
   ```
   or with Yarn:
   ```bash
   yarn install
   ```

3. **Run the app**:
   After installation, start the development server:
   ```bash
   npm run dev
   ```
   or with Yarn:
   ```bash
   yarn dev
   ```

4. Open the app in your browser:
   Visit `http://localhost:3000` to see the app running.

## Usage

### Viewing Transaction Details

- Transaction data is fetched from the browser's local storage where a list of transactions is stored as JSON.
- Each transaction includes:
  - **Transaction ID**
  - **Sender**
  - **Receiver**
  - **Amount**
  - **Status**
  - **Timestamp**

### Dark/Light Mode Toggle

- You can toggle between dark and light modes by clicking the button in the top-right corner of the screen.

## Project Structure

The project has a simple folder structure:

```
/transaction-app
  /components
    - TransactionDetail.tsx
  /pages
    - index.tsx
    - dashboard.tsx
  /public
  /styles
    - globals.css
  package.json
  README.md
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Akerele David Damilola** – [Your GitHub Profile](https://github.com/your-profile)

---

You can now copy and paste this straight into your `README.md`. If you need any adjustments or have additional sections to add, feel free to let me know!
