const apiKey = "beea382ab9344ed2a8171cd359ed3255";  // Replace with your API key



//Constants
const inputField = document.getElementById("ingredientInput");
const suggestionsBox = document.getElementById("suggestions");
// const resultsContainer = document.getElementById("results");
// const searchButton = document.getElementById("searchButton");


// Data
const existingIngredients = [];  // Array to store entered ingredients


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
//
// // Function to add ingredient to the array
// function addIngredient(ingredient) {
//     if (ingredient && !existingIngredients.includes(ingredient)) {
//         existingIngredients.push(ingredient);
//         console.log("Existing Ingredients:", existingIngredients); // Log the updated array
//         // displayMealBoxes();  // Display meal boxes based on updated array
//     }
//     inputField.value = "";  // Clear input field
//     suggestionsBox.innerHTML = "";  // Hide suggestions
// }
//
// // Listen for Enter key press
// inputField.addEventListener("keydown", (event) => {
//     if (event.key === "Enter") {
//         event.preventDefault();  // Prevent form submission
//         let ingredient = inputField.value.trim();
//         if (ingredient) {
//             addIngredient(ingredient);
//         }
//     }
// });
//
// // Hide suggestions when clicking outside
// document.addEventListener("click", (event) => {
//     if (!inputField.contains(event.target) && !suggestionsBox.contains(event.target)) {
//         suggestionsBox.innerHTML = "";
//     }
// });
// //----------------------Auto-Complete Feature End----------------------------------------------------
//
//
//
//
//
//
//
//
// //----------------------Display number of meal boxes start----------------------------------------------------
//
// // function displayMealBoxes() {
// //     // Clear the previous meal boxes
// //     resultsContainer.innerHTML = "";
// //
// //     // Create a new mealBox for each ingredient in the array
// //     existingIngredients.forEach(() => {
// //         let mealBox = document.createElement("div");
// //         mealBox.classList.add("mealBox");
// //         mealBox.style.border = "1px solid black";
// //         mealBox.style.height = "200px";
// //         mealBox.style.margin = "5px";
// //
// //         // Add content inside the mealBox (you can customize this part)
// //         mealBox.innerHTML = "<p>Meal Box</p>";
// //
// //         resultsContainer.appendChild(mealBox);
// //     });
// // }
//
//
// //----------------------Display number of meal boxes end----------------------------------------------------
//
//
//
// // Search meals using ingredients
// // function displayMealBoxes() {
// //     // Clear the previous meal boxes
// //     resultsContainer.innerHTML = "";
// //
// //     // Create a new mealBox for each ingredient in the array
// //     existingIngredients.forEach(() => {
// //         let mealBox = document.createElement("div");
// //         mealBox.classList.add("mealBox");
// //         mealBox.style.border = "1px solid black";
// //         mealBox.style.height = "200px";
// //         mealBox.style.margin = "5px";
// //
// //         // Add content inside the mealBox (you can customize this part)
// //         mealBox.innerHTML = "<p>Meal Box</p>";
// //
// //         resultsContainer.appendChild(mealBox);
// //     });
// // }
//
// // Search meals using ingredients
// searchButton.addEventListener("click", async () => {
//     if (existingIngredients.length === 0) {
//         alert("Please add some ingredients first!");
//         return;
//     }
//
//     // Convert array to a comma-separated string
//     const ingredients = existingIngredients.join(", ");
//
//     try {
//         const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${apiKey}`);
//         const meals = await response.json();
//
//         // Clear the previous meal boxes
//         resultsContainer.innerHTML = "";
//
//         if (meals.length === 0) {
//             resultsContainer.innerHTML = "<p>No meals found with the given ingredients.</p>";
//             return;
//         }
//
//         for (const meal of meals) {
//             // Fetch detailed recipe information
//             const recipeResponse = await fetch(`https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${apiKey}`);
//             const recipeData = await recipeResponse.json();
//
//             // Log recipe, description, and nutrition information with checks
//             console.log("Recipe:", recipeData.title);
//             console.log("Description:", recipeData.summary);
//
//             // Check if nutrition and nutrients exist
//             if (recipeData.nutrition && recipeData.nutrition.nutrients) {
//                 console.log("Nutrition Info:");
//                 const nutrition = recipeData.nutrition.nutrients;
//
//                 const calories = nutrition.find(n => n.title === "Calories")?.amount || "N/A";
//                 const fat = nutrition.find(n => n.title === "Fat")?.amount || "N/A";
//                 const carbs = nutrition.find(n => n.title === "Carbohydrates")?.amount || "N/A";
//                 const protein = nutrition.find(n => n.title === "Protein")?.amount || "N/A";
//
//                 console.log(`Calories: ${calories} kcal`);
//                 console.log(`Fat: ${fat} g`);
//                 console.log(`Carbs: ${carbs} g`);
//                 console.log(`Protein: ${protein} g`);
//             } else {
//                 console.log("No nutrition info available.");
//             }
//
//             // Create a meal box and add it to the results container
//             let mealBox = document.createElement("div");
//             mealBox.classList.add("mealBox");
//             mealBox.style.border = "1px solid black";
//             mealBox.style.height = "300px";
//             mealBox.style.margin = "5px";
//             mealBox.style.display = "flex";
//             mealBox.style.flexDirection = "row";
//
//             // Create div for image
//             let imageDiv = document.createElement("div");
//             imageDiv.style.width = "150px";
//             imageDiv.style.height = "100%";
//             imageDiv.style.overflow = "hidden";
//
//             // Create the image
//             let mealImage = document.createElement("img");
//             mealImage.src = recipeData.image;
//             mealImage.alt = recipeData.title;
//             mealImage.style.width = "100%";
//             mealImage.style.height = "100%";
//             mealImage.style.objectFit = "cover";
//             imageDiv.appendChild(mealImage);
//
//             // Create div for description and nutrition
//             let descriptionDiv = document.createElement("div");
//             descriptionDiv.style.flex = "1";
//             descriptionDiv.style.padding = "10px";
//             descriptionDiv.style.overflowY = "scroll";
//             descriptionDiv.style.height = "100%";
//
//             descriptionDiv.innerHTML = `
//                 <h3>${recipeData.title}</h3>
//                 <p>${recipeData.summary}</p>
//                 <p><strong>Nutrition:</strong></p>
//                 <ul>
//                     <li>Calories: ${recipeData.nutrition ? recipeData.nutrition.nutrients.find(n => n.title === "Calories")?.amount : "N/A"} kcal</li>
//                     <li>Fat: ${recipeData.nutrition ? recipeData.nutrition.nutrients.find(n => n.title === "Fat")?.amount : "N/A"} g</li>
//                     <li>Carbs: ${recipeData.nutrition ? recipeData.nutrition.nutrients.find(n => n.title === "Carbohydrates")?.amount : "N/A"} g</li>
//                     <li>Protein: ${recipeData.nutrition ? recipeData.nutrition.nutrients.find(n => n.title === "Protein")?.amount : "N/A"} g</li>
//                 </ul>
//             `;
//
//             mealBox.appendChild(imageDiv);
//             mealBox.appendChild(descriptionDiv);
//             resultsContainer.appendChild(mealBox);
//         }
//     } catch (error) {
//         console.error("Error fetching meals:", error);
//     }
// });
//
//
//












// const Spoonacular = require('spoonacular');
// let defaultClient = Spoonacular.ApiClient.instance;
// // Configure API key authorization: apiKeyScheme
// let apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
// apiKeyScheme.apiKey = 'beea382ab9344ed2a8171cd359ed3255';
// // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
// // apiKeyScheme.apiKeyPrefix = 'Token';
// //
// // let apiInstance = new Spoonacular.RecipesApi();
// // let ingredients = "onions, tomatoes"; // String | A comma-separated list of ingredients that the recipes should contain.
// // let opts = {
// //     'number': 10, // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
// //     'ranking': 1, // Number | Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
// //     'ignorePantry': false // Boolean | Whether to ignore typical pantry items, such as water, salt, flour, etc.
// // };
// // apiInstance.searchRecipesByIngredients(ingredients, opts, (error, data, response) => {
// //     if (error) {
// //         console.error(error);
// //     } else {
// //         console.log('API called successfully. Returned data:');
// //
// //         // Pretty-print the entire response
// //         //console.log(JSON.stringify(data, null, 2));
// //
// //         // Iterate through each recipe and log specific details
// //         data.forEach((recipe, index) => {
// //             console.log(`Recipe ${index + 1}: ${recipe.title} (ID: ${recipe.id})`);
// //         });
// //     }
// // });
//
//
// let apiInstance = new Spoonacular.DefaultApi();
// let opts = {
//     'query': "", // String | The search query.
//     'lat': 49.8954, // Number | The latitude of the user's location.
//     'lng': -97.1385, // Number | The longitude of the user's location.\".
//     'distance': 2, // Number | The distance around the location in miles.
//     'budget': 20, // Number | The user's budget for a meal in USD.
//     'cuisine': "indian", // String | The cuisine of the restaurant.
//     'minRating': 3, // Number | The minimum rating of the restaurant between 0 and 5.
//     'isOpen': true, // Boolean | Whether the restaurant must be open at the time of search.
//     'sort': "distance", // String | How to sort the results, one of the following 'cheapest', 'fastest', 'rating', 'distance' or the default 'relevance'.
//     'page': 0 // Number | The page number of results.
// };
// apiInstance.searchRestaurants(opts, (error, data, response) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log('API called successfully. Returned data:');
//
//         // Pretty-print the entire response
//         console.log(JSON.stringify(data, null, 2));
//
//         // Iterate through each recipe and log specific details
//         data.restaurants.forEach((recipe, index) => {
//             console.log(`Recipe ${index + 1}: ${recipe.title} (ID: ${recipe.id})`);
//         });
//     }
// });
