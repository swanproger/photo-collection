import React, { useEffect, useState } from 'react';
import './index.scss';
import { Collection } from './Collection';
function App() {
  const [categoryID, setCategoryID] = useState(0);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1)
  useEffect(() => {
    setIsLoading(true)
    const category = categoryID ? `category=${categoryID}` : "";
    
    fetch(`https://66af9104b05db47acc5a329d.mockapi.io/Photo-collections?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then((json) => {
      setCollections(json)
    })
    .catch((err) => {
      console.warn(err);
      alert("Ошибка при получении данных")
    }).finally(() => setIsLoading(false))
  },[categoryID, page])
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
         {cats.map((obj, i) => <li onClick={() => setCategoryID(i)} className={categoryID === i ? "active" : ""} key={obj.name}>{obj.name}</li>)}
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? <h2>Идёт загрузка.....</h2> : collections.filter((obj) => {
          return obj.name.toLowerCase().includes(searchValue.toLowerCase())
        }).map((obj, index) => (
           <Collection
           key={index}
           name={obj.name}
           images={obj.photos}
         />
        ))}
       
      </div>
      <ul className="pagination">
      {[...Array(3)].map((_, i) => (
        <li onClick={() => setPage(i+1)} key={i} className={page === i+1 ? "active" : ""}>{i+1}</li>
      ))}
      </ul>
    </div>
  );
}

export default App;
