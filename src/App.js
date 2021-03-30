import './App.css';

import {useEffect, useState} from "react";
import Recipe from "./components/Recipe";


const APP_ID = process.env.REACT_APP_APP_ID;
const APP_KEY = process.env.REACT_APP_APP_KEY;
const proxyurl = "https://cors-anywhere.herokuapp.com/";


const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');
  useEffect(() => {
    getRecipes();
  }, [query]);
  const getRecipes = async () => {
    const response = await fetch(`${proxyurl}https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  };
  const updateSearch = e => {
    setSearch(e.target.value);
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch(" ");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-btn" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories}
                  image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
        ))}
      </div>
    </div>
  );
};

export default App;
