import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TransactionDetail = () => {
  const { query } = useRouter();
  const [transaction, setTransaction] = useState<any | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // General style variables based on dark mode
  const darkModeStyles = {
    backgroundColor: isDarkMode ? "#2c3e50" : "#f8f9fa",
    color: isDarkMode ? "#ffffff" : "#000000",
    buttonBackgroundColor: isDarkMode ? "#333333" : "#5a67d8",
    footerColor: isDarkMode ? "#a0aec0" : "#4a5568",
    headingColor: isDarkMode ? "#ffffff" : "#2d3748",
    cardBackgroundColor: isDarkMode ? "#34495e" : "#ffffff",
  };

  const darkModeStyle: React.CSSProperties = {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: darkModeStyles.buttonBackgroundColor,
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  useEffect(() => {
    if (query.id) {
      const storedTransactions = localStorage.getItem("transactions");

      if (storedTransactions) {
        const transactions = JSON.parse(storedTransactions);
        const tx = transactions.find(
          (tx: any) => tx.id.toString() === query.id
        );
        setTransaction(tx);
      }
    }
  }, [query.id]);

  if (!transaction) return <p>Please wait while the transaction loads...</p>;

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: darkModeStyles.backgroundColor,
        color: darkModeStyles.color,
      }}
    >
      <button style={darkModeStyle} onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div
        style={{
          ...styles.card,
          backgroundColor: darkModeStyles.cardBackgroundColor,
        }}
      >
        <h1 style={{ ...styles.heading, color: darkModeStyles.headingColor }}>
          Transaction Details
        </h1>

        <div style={styles.detail}>
          <p>
            <strong>ID:</strong> {transaction.id}
          </p>
          <p>
            <strong>Sender:</strong> {transaction.sender}
          </p>
          <p>
            <strong>Receiver:</strong> {transaction.receiver}
          </p>
          <p>
            <strong>Amount:</strong> {transaction.amount}
          </p>
          <p>
            <strong>Status:</strong> {transaction.status}
          </p>
          <p>
            <strong>Timestamp:</strong>{" "}
            {new Date(transaction.timestamp).toLocaleString()}
          </p>
        </div>

        <a href="/dashboard">
          <button
            style={{
              ...styles.button,
              backgroundColor: darkModeStyles.buttonBackgroundColor,
            }}
          >
            Back to Dashboard
          </button>
        </a>
      </div>

      {/* Footer */}
      <footer
        style={{
          ...styles.footer,
          color: darkModeStyles.footerColor,
        }}
      >
        <p>&copy; 2025 Akerele David Damilola</p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "40px",
    maxWidth: "500px",
    width: "100%",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  detail: {
    fontSize: "1.25rem",
    marginBottom: "30px",
    textAlign: "left",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s ease",
    color:"white",
  },
  footer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    textAlign: "center",
    padding: "10px",
    fontSize: "0.875rem",
  },
};

export default TransactionDetail;
