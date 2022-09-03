import { useParams } from 'react-router-dom';
import './Recipe.css';
import { useTheme } from '../../hooks/useTheme';
import { useEffect, useState } from 'react';
import { projectFirestore } from '../../firebase/config';

export default function Recipe() {

  const { mode } = useTheme();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
      if(doc.exists){
        setIsPending(false);
        setRecipe(doc.data());
      }
      else{
        setIsPending(false);
        setError("Could Not Find Recipe")
      }
    })

    return () => unsub();
    
  },[id])

  const handleClick = (id) => {
    projectFirestore.collection('recipes').doc(id).update({

    })
  };

  return(
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} time to cook</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className='method'>{recipe.method}</p>
          <button onClick={handleClick}>Update Me</button>
        </>
      )}
    </div>
  );
 
}
