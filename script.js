const apiKey = '3b8dd16f5a834967864951a3e2bf134d';
const submitBtn = document.getElementById('submit-btn');
const recipesContainer = document.getElementById('recipes-container');

submitBtn.addEventListener('click', () => {
  const cuisine = document.getElementById('cuisine').value;
  const diet = document.getElementById('diet').value;
  const intolerance = document.getElementById('intolerance').value;
  const include=document.getElementById('include').value;

  // Add cooking animation class while fetching data
  submitBtn.classList.add('cooking-animation');

  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerance}&includeIngredients=${include}&number=5`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      recipesContainer.innerHTML = ''; // Clear previous recipes

      // Check if data.results exists and is not empty
      if (data.results && data.results.length > 0) {
        data.results.forEach(recipe => {
          const recipeCard = createRecipeCard(recipe);
          recipesContainer.appendChild(recipeCard);
        });
      } else {
        const noRecipesMessage = document.createElement('p');
        noRecipesMessage.textContent = 'No recipes found for the selected criteria.';
        recipesContainer.appendChild(noRecipesMessage);
      }

      // Remove cooking animation class after data is fetched
      submitBtn.classList.remove('cooking-animation');
    })
    .catch(error => {
      console.error(error);

      // Remove cooking animation class on error
      submitBtn.classList.remove('cooking-animation');
    });
});


function createRecipeCard(recipe) {
  const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipe-card');

  const image = document.createElement('img');
  image.classList.add('recipe-image');
  image.src = recipe.image;
  recipeCard.appendChild(image);

  const name = document.createElement('p');
  name.classList.add('recipe-name');
  name.textContent = recipe.title;
  recipeCard.appendChild(name);

  if (recipe.extendedIngredients) {
    const ingredients = document.createElement('ul');
    ingredients.classList.add('recipe-ingredients');
    recipe.extendedIngredients.forEach(ingredient => {
      const listItem = document.createElement('li');
      listItem.textContent = ingredient.original;
      ingredients.appendChild(listItem);
    });
    recipeCard.appendChild(ingredients);
  }

  const instructions = document.createElement('p');
  instructions.classList.add('recipe-instructions');
  instructions.textContent = recipe.instructions || 'Instructions not available';
  recipeCard.appendChild(instructions);

  return recipeCard;
}

