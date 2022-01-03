import React, {useState, useEffect} from 'react';
import axios from 'axios';
import List from '../components/List';

const Home = ({navigation}) => {
  const [data, setData] = useState({books: [], error: 0, page: 0});
  const fetchData = async () => {
    try {
      let result = await axios.get('https://api.itbook.store/1.0/new');
      if (result.status === 200) setData(result.data);
      else throw new Error(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <List data={data} navigation={navigation} />;
};

export default Home;
