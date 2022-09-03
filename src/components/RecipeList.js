import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './RecipeList.css';
import trash from '../assets/delete-icon.svg'
import { projectFirestore } from '../firebase/config';

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  if(recipes.length === 0){
    return <div className='error'>No Recipes to Load...</div>
  }

  const handleClick = (id) => {
    projectFirestore.collection('recipes').doc(id).delete()
  }
  
  return (
    <div className='recipe-list'>{recipes.map((recipe) => {
        return (
          <div key={recipe.id} className={`card ${mode}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make</p>
            <div>{recipe.method.substring(0,100)}...</div>
            <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
            <img alt='trash'
            src={trash}
            className='delete'
            onClick={() => handleClick(recipe.id)}
            />
          </div>
          );
      })}</div>
  )
}
