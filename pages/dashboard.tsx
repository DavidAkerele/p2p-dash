"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface Transaction {
  id: number;
  sender: string;
  receiver: string;
  amount: number;
  status: string;
  timestamp: string;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<string>("All");
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    sender: "",
    receiver: "",
    amount: 0,
    status: "Pending",
    timestamp: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(
    null
  );

  const router = useRouter();

  // Fetch transactions from localStorage

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      fetch("/transactions.json")
        .then((response) => response.json())
        .then((data: Transaction[]) => {
          setTransactions(data);
          localStorage.setItem("transactions", JSON.stringify(data));
        });
    }
    setIsLoading(false);
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  // Fetch transactions
  useEffect(() => {
    fetch("/transactions.json")
      .then((response) => response.json())
      .then((data: Transaction[]) => {
        setTransactions(data);
        setIsLoading(false);
      });
  }, []);

  // Filter and search transactions
  const filteredTransactions =
    filteredStatus === "All"
      ? transactions
      : transactions.filter((tx) => tx.status === filteredStatus);

  const searchedTransactions = filteredTransactions.filter(
    (tx) =>
      tx.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.toString().includes(searchQuery)
  );

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  // Add new transaction
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTx: Transaction = {
      ...newTransaction,
      id: Date.now(), // Unique ID
      timestamp: new Date().toISOString(),
    };
    setTransactions([...transactions, newTx]);
    setNewTransaction({
      id: 0,
      sender: "",
      receiver: "",
      amount: 0,
      status: "Pending",
      timestamp: "",
    });
  };

  // Delete transaction
  const confirmDelete = () => {
    if (transactionToDelete !== null) {
      setTransactions((prev) =>
        prev.filter((tx) => tx.id !== transactionToDelete)
      );
      setTransactionToDelete(null);
    }
  };

  // Chart data
  const chartData = [
    {
      name: "Pending",
      value: transactions.filter((tx) => tx.status === "Pending").length,
    },
    {
      name: "Completed",
      value: transactions.filter((tx) => tx.status === "Completed").length,
    },
    {
      name: "Failed",
      value: transactions.filter((tx) => tx.status === "Failed").length,
    },
  ];

  const COLORS = ["#FFBB28", "#00C49F", "#FF8042"];

  return (
    <div className={`dashboard-container ${isDarkMode ? "dark" : ""}`}>
      {/* Dark Mode Toggle */}
      <button
        className="dark-mode-toggle"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Back Button */}
      <button className="back-button" onClick={() => router.push("/")}>
        ⬅ Back to Home
      </button>

      {/* Title */}
      <h1 className="title">P2P Transactions Dashboard</h1>

      {/* Filter and Search */}
      <div className="filter-container">
        <label>Filter by Status:</label>
        <select
          onChange={(e) => setFilteredStatus(e.target.value)}
          value={filteredStatus}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {/* Transactions Table */}
          <div className="table-container">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sender Name</th>
                  <th>Receiver Name</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchedTransactions.map((transaction) => (
                  <tr
                    className="transaction-row"
                    key={transaction.id}
                    onClick={() =>
                      router.push(`/transaction/${transaction.id}`)
                    }
                  >
                    <td>{transaction.id}</td>
                    <td>{transaction.sender}</td>
                    <td>{transaction.receiver}</td>
                    <td>${transaction.amount}</td>
                    <td>
                      <span
                        className={`status-badge ${transaction.status.toLowerCase()}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTransactionToDelete(transaction.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bottom-container">
            {/* Chart */}
            <div className="chart-container">
              <h2>Transaction Status Distribution</h2>
              <PieChart width={335} height={300} className="chart">
                <Pie
                  data={chartData}
                  cx={180}
                  cy={130}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            {/* Add New Transaction Form */}
            <div className="new-transaction-container">
              <h2>Add a New Transaction</h2>
              <form onSubmit={handleSubmit} className="transaction-form">
                <input
                  type="text"
                  name="sender"
                  placeholder="Sender Name"
                  value={newTransaction.sender}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="receiver"
                  placeholder="Receiver Name"
                  value={newTransaction.receiver}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="status"
                  value={newTransaction.status}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
                <button type="submit">Add Transaction</button>
              </form>
            </div>
          </div>

          {/* Confirmation Modal */}
          {transactionToDelete !== null && (
            <div className="confirmation-modal">
              <p>Are you sure you want to delete this transaction?</p>
              <button onClick={confirmDelete}>Yes, Delete</button>
              <button onClick={() => setTransactionToDelete(null)}>
                Cancel
              </button>
            </div>
          )}
        </>
      )}

      {/* Styles */}
      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
          background-color: ${isDarkMode ? "#1a1a1a" : "#f8f9fa"};
          min-height: 100vh;
          font-family: "Inter", sans-serif;
          color: ${isDarkMode ? "#ffffff" : "#000000"};
          transition:
            background-color 0.3s ease,
            color 0.3s ease;
        }

        .dark-mode-toggle {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 10px 20px;
          background-color: ${isDarkMode ? "#333333" : "#007bff"};
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s ease;
        }

        .dark-mode-toggle:hover {
          background-color: ${isDarkMode ? "#444444" : "#0056b3"};
        }

        .back-button {
          align-self: flex-start;
          margin-bottom: 20px;
          padding: 12px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }

        .back-button:hover {
          background-color: #0056b3;
        }

        .title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 30px;
          color: ${isDarkMode ? "#ffffff" : "#2c3e50"};
        }

        .filter-container {
          margin-bottom: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        select,
        input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid ${isDarkMode ? "#555555" : "#ddd"};
          background-color: ${isDarkMode ? "#333333" : "#ffffff"};
          color: ${isDarkMode ? "#ffffff" : "#000000"};
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        select:focus,
        input:focus {
          border-color: #007bff;
          outline: none;
        }

        .table-container {
          width: 100%;
          overflow-x: auto;
          margin-bottom: 40px;
          background-color: ${isDarkMode ? "#2c3e50" : "#ffffff"};
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          padding: 20px;
        }

        .bottom-container{
          display: flex;
          flex-direction: row-reverse;
          width: 70%;
          justify-content: space-between;
          align-items:center;
          margin:auto;
        }

        .transaction-table {
          width: 100%;
          border-collapse: collapse;
        }

        .transaction-table th,
        .transaction-table td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid ${isDarkMode ? "#444444" : "#eee"};
        }

        .transaction-table th {
          background-color: ${isDarkMode ? "#2c3e50" : "#343a40"};
          color: white;
          font-weight: 600;
        }

        .transaction-row:hover {
          background-color: ${isDarkMode ? "#333333" : "#f9f9f9"};
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.pending {
          background-color: #fff3cd;
          color: #856404;
        }

        .status-badge.completed {
          background-color: #d4edda;
          color: #155724;
        }

        .status-badge.failed {
          background-color: #f8d7da;
          color: #721c24;
        }

        .delete-button {
          padding: 6px 12px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s ease;
        }

        .delete-button:hover {
          background-color: #c82333;
        }

        .chart-container {
          background-color: ${isDarkMode ? "#2c3e50" : "#ffffff"};
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          height: 100%;
          max-width: 500px;
          {/* margin-bottom: 40px; */}
          
        }

        .new-transaction-container {
          background-color: ${isDarkMode ? "#2c3e50" : "#ffffff"};
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
        }

        .transaction-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        input,
        select {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid ${isDarkMode ? "#555555" : "#ddd"};
          background-color: ${isDarkMode ? "#333333" : "#ffffff"};
          color: ${isDarkMode ? "#ffffff" : "#000000"};
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        input:focus,
        select:focus {
          border-color: #007bff;
          outline: none;
        }

        button {
          padding: 14px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #218838;
        }

        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #007bff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .confirmation-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: ${isDarkMode ? "#2c3e50" : "#ffffff"};
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          color: ${isDarkMode ? "#ffffff" : "#000000"};
        }

        .confirmation-modal button {
          margin: 0 10px;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .confirmation-modal button:first-child {
          background-color: #dc3545;
          color: white;
        }

        .confirmation-modal button:last-child {
          background-color: #6c757d;
          color: white;
        }

        .confirmation-modal button:hover {
          opacity: 0.9;
        }

        

/* Tablet screens (max-width: 1024px) */
@media (max-width: 1024px) {
  .bottom-container {
    width: 90%; /* Increase width to allow for more space */
  }
}

/* Mobile screens (max-width: 768px) */
@media (max-width: 768px) {
  .bottom-container {
    flex-direction: column; /* Stack items vertically */
    width: 100%; /* Use full width */
    align-items: center; /* Center items */
    text-align: center; /* Align text centrally if applicable */
    gap:50px;
  }

  .chart{
    width: 80%;
  }

  {/* .chart-container {
    border-radius:0;
  } */}
}

      `}</style>
    </div>
  );
};

export default Dashboard;
