import { useEffect, useState } from "react";
import axios from "axios";


//making custom hook to fetch api data
const useFetch = (url) => {
    
    // when initiating api request
    const [loading, setLoading] = useState(false)
    // for setting the response data
    const [data, setData] = useState([])
    // for setting error
    const [error, setError] = useState(false)


  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url, {
        credentials: 'include'
    });
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [url]);

   // if refetching of data is needed
  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url, {
        credentials: 'include'
    });
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;


