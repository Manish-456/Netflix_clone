import { useEffect, useState } from "react";
import Featured from "../../components/Featured/Featured";
import Lists from "../../components/Lists/Lists";
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios'
import "./Home.scss";
const Home = ({ type }) => {
  const [genre , setGenre] = useState(null)
   const [lists , setLists] = useState([])
  useEffect(() => {
    const getMovieLists = async () => {
    try {
      const res = await axios.get(`lists${type ? "?type=" + type : "" }${genre ? "&&genre=" + genre : ""}`, {
        headers: {
          token : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWFjMWU4YzkxODY0YTMyNTNkMTM5YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTExNDU5NX0.acRuoMxnXVYhB5CAjR4mDSoUv6mYGewS9j-BsMN18l8`,
        }
      });
      setLists(res.data)
    } catch (err) {
      console.log(err)
    }
    };
    getMovieLists();
  }, [type , genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre}/>
      {lists && lists.map((list) => {
        return <Lists key={list._id} list={list} />
      })}
    
    </div>
  );
};

export default Home;
