import React, { useEffect, useState } from 'react';
import './index.scss';
import { Collection } from './Collection';
function App() {
  const [categoryID, setCategoryID] = useState(0)
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    fetch(`https://66af9104b05db47acc5a329d.mockapi.io/Photo-collections?${categoryID ? `category=${categoryID}` : "" }`)
    .then((res) => res.json())
    .then((json) => {
      setCollections(json)
    })
    .catch((err) => {
      console.warn(err);
      alert("Ошибка при получении данных")
    }).finally(() => setIsLoading(false))
  },[categoryID])
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
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
