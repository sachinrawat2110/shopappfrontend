import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useFetchcategory = () => 
{
  const [allcat, setAllCat] = useState([]); // Initialize as an empty array

  const fetchAllCat = async () => 
  {
    try {
      const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getallcat`);
      if (apiresp.status === 200)
       {
        if (apiresp.data.code === 1)
         {
          setAllCat(apiresp.data.catdata);
        }
         else 
        {
          setAllCat([]);
        }
      } else
      {
        toast.error("Some error occurred, try again");
      }
    } catch (e)
    {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchAllCat(); // Automatically fetch categories on mount
  }, []);

  return { allcat, fetchAllCat };
};

export default useFetchcategory;
