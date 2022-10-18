import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    myData();
  }, []);

  const myData = async () => {
    return await axios.get("http://localhost:5000/user")
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));
  };
  console.log("data", data);

  const handleReset = () => {
    myData();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios.get(`http://localhost:5000/user?q=${value}`)
    .then((res) => {
      setData(res.data);
      setValue("");
    })
    .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" className='input' placeholder='Search' value={value} onChange={(e) => setValue(e.target.value)}/>
        <div className='button'>
          <button type='submit' className='search'>Search</button>
          <button onClick={() => handleReset()} className='reset'>Reset</button>
        </div>
      </form>
      <div>
        
        {data.length === 0 ? (
          <div className='align'>
            
              <h4 className="found">No Data Found</h4>
            
          </div>
        ) : (
          data.map((item, index) => (
            <div key={index} className='main'>
              <div className='inner'>
                <div className='img'>
                  <img src={item.img} />
                </div>
                <div className='second'>
                  <h4 className='title'>{item.title}</h4>
                  <p className='des'>${item.price}</p>
                  <span className='date'>{item.date}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
