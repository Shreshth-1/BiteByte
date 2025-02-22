const apiKey = "58ab769d6cb8459d957b5c6add7f16bb";  // Replace with your API key


//------------------------------------------Page 2------------------------------------------

function getExistingIngredients() {
    try {
        const storedIngredients = localStorage.getItem("ingredients");
        return storedIngredients ? JSON.parse(storedIngredients) : [];
    } catch (error) {
        console.error("Error parsing stored ingredients:", error);
        return [];
    }
}

// Data
const existingIngredients = getExistingIngredients();


async function fetchRecipes() {
    if (existingIngredients.length === 0) {
        console.log("No ingredients available.");
        return;
    }

    const ingredientList = existingIngredients.join(",");

    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientList}&number=12&apiKey=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

// Function to fetch recipes using Spoonacular API
async function fetchRecipeDetails(recipeId) {
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        return null;
    }
}

function displayRecipes(recipes) {
    const displayBox = document.getElementById("displayBox");
    displayBox.innerHTML = "";

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("menu-item");
        recipeCard.dataset.recipeId = recipe.id;

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <p class="recipe-title">${recipe.title}</p>
        `;

        recipeCard.addEventListener("click", async () => {
            const recipeDetails = await fetchRecipeDetails(recipe.id);
            if (recipeDetails) {
                saveRecipeLocally(recipeDetails);
                window.location.href = "homepage3.html";
            }
        });

        displayBox.appendChild(recipeCard);
    });
}

function saveRecipeLocally(recipeData) {
    try {
        const jsonData = JSON.stringify(recipeData, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `recipe_${recipeData.id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error("Error saving recipe locally:", error);
    }
}

fetchRecipes();

//------------------------------------------Page 2 Ends------------------------------------------
