import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [fetchStatus, setFetchStatus] = useState('idle');
  const isLoading = fetchStatus === 'loading';
  const isError = fetchStatus === 'error';

  useEffect(() => {
    const url = "https://hn.algolia.com/api/v1/search?query=apple";

    async function fetchData() {
      try {
        setFetchStatus('loading');
        const resp = await fetch(url);
        const data = await resp.json();
        setArticles(data.hits);
        setFetchStatus('idle');
      } catch (e) {
        setFetchStatus('error');
        console.log(e.message);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>Search Results</h1>
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching data.</p>}
        {articles.map((article, index) => (
          <p key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
