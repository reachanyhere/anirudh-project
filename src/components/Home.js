import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import './Home.css';

const fetchStarWarsPeople = async () => {
  const res = await fetch('https://swapi.py4e.com/api/people/');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['starWarsPeople'],
    queryFn: fetchStarWarsPeople,
  });

  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({
    name: '',
    height: '',
    mass: '',
    hair_color: '',
  });

  useEffect(() => {
    if (data?.results) {
      setTableData(data.results);
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    setNewRow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addNewRow = () => {
    if (newRow.name && newRow.height && newRow.mass && newRow.hair_color) {
      setTableData((prev) => [...prev, newRow]);
      setNewRow({ name: '', height: '', mass: '', hair_color: '' });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="table-container">
      <h2>Star Wars Characters</h2>

      <ul className="table-header">
        <li>Name | Height | Mass | Hair Color</li>
      </ul>

      <ol className="table-body">
        {tableData.map((person, index) => (
          <li key={person.name + index}>
            {person.name} | {person.height} | {person.mass} |{' '}
            {person.hair_color}
          </li>
        ))}
      </ol>

      <div className="form-section">
        <h3>Add New Character</h3>
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
              type="text"
              placeholder="Height"
              value={newRow.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Mass"
              value={newRow.mass}
              onChange={(e) => handleInputChange('mass', e.target.value)}
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Hair Color"
              value={newRow.hair_color}
              onChange={(e) => handleInputChange('hair_color', e.target.value)}
            />
          </li>
          <li>
            <button className="add-button" onClick={addNewRow}>
              Add Character
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
