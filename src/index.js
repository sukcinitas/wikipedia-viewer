import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Card from './components/Card';

function App() {
  const [input, setInput] = useState('');
  const [wikipediaEntries, setWikipediaEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let phrase = encodeURI(input);
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${phrase}&format=json&origin=*`
    )
      .then((response) => response.json())
      .then((data) => {
        setWikipediaEntries([...data.query.search]);
        setInput('');
      });
  };

  const wikipediaEntriesList = wikipediaEntries.map((entry) => (
    <Card key={entry.pageid} info={entry} />
  ));
  return (
    <div className="d-flex flex-column align-items-center mb-5">
      <h1 className="display-3 text-center my-5">Wikipedia Viewer</h1>
      <form className="mt-5 mb-2">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-dark"
              type="submit"
              onClick={handleSubmit}
              disabled={!input}
            >
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
      <a
        className="btn btn-dark"
        rel="noopener noreferrer"
        target="_blank"
        href="https://en.wikipedia.org/wiki/Special:Random"
      >
        Get a random article
      </a>
      <div className="mt-5 w-75">{wikipediaEntriesList}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
