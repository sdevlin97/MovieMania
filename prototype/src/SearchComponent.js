
import React, { useState } from 'react';
import elasticClient from './elasticClient'; // Import the Elasticsearch client

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  async function handleSearch() {
    try {
      const response = await elasticClient.search({
        index: '_index_name', // Replace with Elasticsearch index name
        body: {
          query: {
            match: { field_name: query }, // Replace with field and query
          },
        },
      });

      // Extract and set the search results
      setSearchResults(response.body.hits.hits);
    } catch (error) {
      console.error('Elasticsearch error:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display search results */}
      <ul>
        {searchResults.map((result) => (
          <li key={result._id}>{result._source.field_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;
