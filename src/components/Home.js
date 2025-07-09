import { useState } from 'react';
import './Home.css';

const Home = () => {
  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
  ]);

  const [newRow, setNewRow] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleInputChange = (field, value) => {
    setNewRow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addNewRow = () => {
    if (newRow.name && newRow.email && newRow.role) {
      setTableData((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...newRow,
        },
      ]);
      setNewRow({ name: '', email: '', role: '' });
    }
  };

  return (
    <div className="table-container">
      <h2>Dynamic Table Using Lists</h2>

      <ul className="table-header">
        <li>ID | Name | Email | Role</li>
      </ul>

      <ol className="table-body">
        {tableData.map((row) => (
          <li key={row.id}>
            {row.id} | {row.name} | {row.email} | {row.role}
          </li>
        ))}
      </ol>

      <div className="form-section">
        <h3>Add New Row</h3>
        <ul className="form-list">
          <li>
            <input
              type="text"
              placeholder="Name"
              value={newRow.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </li>
          <li>
            <input
              type="email"
              placeholder="Email"
              value={newRow.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Role"
              value={newRow.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
            />
          </li>
          <li>
            <button className="add-button" onClick={addNewRow}>
              Add Row
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
