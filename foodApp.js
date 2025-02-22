const apiKey = "";  // Replace with your API key




//------------------------------------------Page 1------------------------------------------

//Constants
const inputField = document.getElementById("ingredientInput");
const suggestionsBox = document.getElementById("suggestions");
const ingredientInput = document.getElementById("ingredientInput");
const searchButton = document.getElementById("searchButton");
const selectedIngredientsBox = document.querySelector(".selected-Ingredients");
const suggestedMealsDiv = document.querySelector(".suggested-meals");




// Data
// Safe retrieval of existing ingredients from localStorage
let existingIngredients = [];
try {
    const storedIngredients = localStorage.getItem("ingredients");
    // If storedIngredients is not null and is a valid JSON string, parse it
    existingIngredients = storedIngredients ? JSON.parse(storedIngredients) : [];
} catch (error) {
    console.error("Error parsing stored ingredients:", error);
    existingIngredients = []; // In case of error, fall back to an empty array
}


function saveIngredientsToLocalStorage() {
    localStorage.setItem("ingredients", JSON.stringify(existingIngredients));
}


//----------------------Auto-Complete Feature Start----------------------------------------------------
inputField.addEventListener("input", async () => {
    let query = inputField.value.trim();

    if (query.length < 2) {
        suggestionsBox.innerHTML = "";
        return;
    }

    try {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=5&apiKey=${apiKey}`);
        const suggestions = await response.json();

        suggestionsBox.innerHTML = "";

        suggestions.forEach(suggestion => {
            let div = document.createElement("div");
            div.textContent = suggestion.name;
            div.classList.add("suggestion-item");

            div.addEventListener("click", () => {
                addIngredient(suggestion.name);
            });

            suggestionsBox.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
});

// Function to add ingredient to the array
function addIngredient(ingredient) {
    if (ingredient && !existingIngredients.includes(ingredient)) {
        existingIngredients.push(ingredient);
        console.log("Existing Ingredients:", existingIngredients); // Log the updated array

        // Save the updated array to localStorage
        localStorage.setItem("ingredients", JSON.stringify(existingIngredients));

        // Create a new div for the ingredient
        let ingredientDiv = document.createElement("div");
        ingredientDiv.textContent = ingredient;
        ingredientDiv.classList.add("ingredient-item");
        ingredientDiv.style.padding = "5px";
        ingredientDiv.style.borderBottom = "1px solid black";

        // Create a delete button for the ingredient
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");

        // Add event listener to the delete button
        deleteButton.addEventListener("click", () => {
            deleteIngredient(ingredient, ingredientDiv);
        });

        // Append the delete button to the ingredient div
        ingredientDiv.appendChild(deleteButton);

        // Append the ingredient to the selected-Ingredients box
        selectedIngredientsBox.appendChild(ingredientDiv);
    }

    inputField.value = "";  // Clear input field
    suggestionsBox.innerHTML = "";  // Hide suggestions
}

// Function to render ingredients from the existingIngredients array
function renderSelectedIngredients() {
    selectedIngredientsBox.innerHTML = ""; // Clear current ingredients list
    existingIngredients.forEach(ingredient => {
        let ingredientDiv = document.createElement("div");
        ingredientDiv.textContent = ingredient;
        ingredientDiv.classList.add("ingredient-item");
        ingredientDiv.style.padding = "5px";
        ingredientDiv.style.borderBottom = "1px solid black";

        // Create a delete button for the ingredient
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");

        // Add event listener to the delete button
        deleteButton.addEventListener("click", () => {
            deleteIngredient(ingredient, ingredientDiv);
        });

        // Append the delete button to the ingredient div
        ingredientDiv.appendChild(deleteButton);

        // Append the ingredient to the selected-Ingredients box
        selectedIngredientsBox.appendChild(ingredientDiv);
    });
}

// Function to delete an ingredient
function deleteIngredient(ingredient, ingredientDiv) {
    // Remove from the existingIngredients array
    existingIngredients = existingIngredients.filter(item => item !== ingredient);

    // Save the updated array to localStorage
    localStorage.setItem("ingredients", JSON.stringify(existingIngredients));

    // Remove the ingredient div from the UI
    selectedIngredientsBox.removeChild(ingredientDiv);
}


// Listen for Enter key press
inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent form submission
        let ingredient = inputField.value.trim();
        if (ingredient) {
            addIngredient(ingredient);
        }
    }
});

// Hide suggestions when clicking outside
document.addEventListener("click", (event) => {
    if (!inputField.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.innerHTML = "";
    }
});
//----------------------Auto-Complete Feature End----------------------------------------------------



const nextButton = document.querySelector(".next-button"); // Select div

nextButton.addEventListener("click", () => {
    saveIngredientsToLocalStorage();
    window.location.href = "thirdPage.html"; // Redirect to another page
});





// Function to fetch recipes
async function fetchRecipes() {
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`
        );
        const data = await response.json();
        displayRecipes(data.recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

// Function to display recipes in a grid
function displayRecipes(recipes) {
    suggestedMealsDiv.innerHTML = ""; // Clear previous content
    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        const imageDiv = document.createElement("div");
        const image = document.createElement("img");
        image.src = recipe.image;
        image.alt = recipe.title;
        image.classList.add("recipe-image");
        imageDiv.appendChild(image);

        const nameDiv = document.createElement("div");
        nameDiv.classList.add("recipe-name");
        nameDiv.textContent = recipe.title;

        recipeCard.appendChild(imageDiv);
        recipeCard.appendChild(nameDiv);
        suggestedMealsDiv.appendChild(recipeCard);
    });
}

// Fetch recipes when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchRecipes();
    renderSelectedIngredients(); // Render the ingredients on page load
});

//------------------------------------------Page 1 Ends------------------------------------------





