document.addEventListener("DOMContentLoaded", function () {
    fetch("recipeData.json")
        .then(response => response.json())
        .then(data => {
            // Set recipe image
            const imgElement = document.querySelector(".img");
            imgElement.innerHTML = `<img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; border-radius:10px; object-fit:cover;">`;

            // Set dish title
            document.querySelector(".title").innerHTML = `<h2>${data.title}</h2>`;

            // Set ingredients
            const ingredientsList = data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("");
            document.querySelector(".ing").innerHTML = `<div style="max-height:200px; overflow-y:auto;"><ul>${ingredientsList}</ul></div>`;

            // Set recipe instructions
            document.querySelector(".recipe").innerHTML = `<div style="max-height:200px; overflow-y:auto;"><p>${data.instructions || "No instructions provided."}</p></div>`;

            // Set nutrition info
            const mainNutrients = data.nutrition.nutrients.slice(0, 5).map(nutrient =>
                `<tr><td>${nutrient.name}</td><td>${nutrient.amount} ${nutrient.unit}</td></tr>`
            ).join("");
            document.querySelector(".nutr").innerHTML = `<div style="max-height:150px; overflow-y:auto;"><table border="1" style="width:100%;"><tr><th>Nutrition</th><th>Amount</th></tr>${mainNutrients}</table></div>`;

            // Set additional nutrients in recomBOX
            const additionalNutrients = data.nutrition.nutrients.slice(5).map(nutrient =>
                `<tr><td>${nutrient.name}</td><td>${nutrient.amount} ${nutrient.unit}</td></tr>`
            ).join("");
            document.querySelector(".recomBOX").innerHTML = `<div style="max-height:400px; overflow-y:auto;"><table border="1" style="width:100%;"><tr><th>Additional Nutrients</th><th>Amount</th></tr>${additionalNutrients}</table></div>`;

            // Set reference URL
            document.querySelector(".ref").innerHTML = `<a href="${data.sourceUrl}" target="_blank">View Full Recipe</a>`;
        })
        .catch(error => console.error("Error loading recipe data:", error));
});