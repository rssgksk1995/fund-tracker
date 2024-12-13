import React, { useState, useEffect } from 'react'
import './Home.css'
import AGDataTable from './component/AGDataTable'
import { fundURL } from './constant/urls'

function Home() {
  const [data, setData] = useState([]);  // State to hold the fetched data
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to track any errors

  useEffect(() => {
    // The AJAX request (using fetch here)
    fetch(fundURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const ddd = data.map((item) => {
          return {
            'sNo': item['s.no'],
            'percentagefunded': item['percentage.funded'],
            'amtPledged': item['amt.pledged']
          }
        })
        setData(ddd); 
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section>Loading...</section>;
  }

  if (error) {
    return <section>Error: {error.message}</section>;
  }

  return (
    <>
      <section className='parent-container'>
        <section className='company-name'>SaaS Labs</section>
        <AGDataTable data={data} />
      </section>
    </>
  )
}

export default Home
