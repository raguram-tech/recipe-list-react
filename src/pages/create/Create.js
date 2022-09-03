import './Create.css';
import { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

export default function Create() {

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {title, ingredients, method, cookingTime: cookingTime + ' mins'};

    try{
      await projectFirestore.collection('recipes').add(doc);
      navigate('/');
    }
    catch(err){
      console.log(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)){
      setIngredients(prevIngredients => [...prevIngredients, ing]);
    }
    setNewIngredient('');
    ingredientInput.current.focus();
  };

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input type="text" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title} required />
        </label>

        <label>
          <span>Recipe Ingredients List</span>
          <div className='ingredients'>
            <input type="text"
              onChange={(e) => { setNewIngredient(e.target.value) }}
              value={newIngredient}
              ref={ingredientInput} />
            <button onClick={handleAdd} className='btn'>Add</button>
          </div>
        </label>
        <p>Current Ingredients: {ingredients.map(ing => <em key={ing}>{ing}, </em>)}</p>

        <label>
          <span>Recipe Method:</span>
          <textarea 
            onChange={(e) => setMethod(e.target.value)} 
            value={method} required />
        </label>

        <label>
          <span>Cooking Time (in mins):</span>
          <input type="number" 
            onChange={(e) => setCookingTime(e.target.value)} 
            value={cookingTime} required />
        </label>

        <button onClick={handleSubmit} className='btn'>Submit</button>
      </form>
    </div>
  )
}
