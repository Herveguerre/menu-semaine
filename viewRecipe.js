// // viewRecipe.js
// function loadRecipeDetails() {
//     const recipe = JSON.parse(localStorage.getItem("currentRecipe"));
    
//     if (recipe) {
//         const recipeDetails = document.getElementById("recipeDetails");
//         recipeDetails.innerHTML = `
//             <h2>${recipe.name} - ${recipe.category}</h2>
//             <img src="${recipe.image}" alt="Image de ${recipe.name}">
//             <h3>Ingrédients :</h3>
//             <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
//             <h3>Étapes :</h3>
//             <p>${recipe.steps}</p>
//         `;
//     } else {
//         document.getElementById("recipeDetails").innerHTML = "<p>Recette introuvable.</p>";
//     }
// }

// loadRecipeDetails();
// Récupérer la liste complète des recettes et l'index de la recette actuelle
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let currentRecipeIndex = recipes.findIndex(recipe => recipe.id === JSON.parse(localStorage.getItem("currentRecipe")).id);

function loadRecipeDetails() {
    // Mettre à jour l'index si nécessaire
    const recipe = recipes[currentRecipeIndex];

    if (recipe) {
        const recipeDetails = document.getElementById("recipeDetails");
        recipeDetails.innerHTML = `
            <h2>${recipe.name} - ${recipe.category}</h2>
            <img src="${recipe.image}" alt="Image de ${recipe.name}">
            <h3>Ingrédients :</h3>
            <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
            <h3>Étapes :</h3>
            <p>${recipe.steps}</p>
            <div class="navigation-buttons">
                <button onclick="showPreviousRecipe()">Précédente</button>
                <button onclick="showNextRecipe()">Suivante</button>
            </div>
        `;
        // Mettre à jour la recette actuelle dans localStorage pour persistance
        localStorage.setItem("currentRecipe", JSON.stringify(recipe));
    } else {
        document.getElementById("recipeDetails").innerHTML = "<p>Aucune recettes disponible.</p>";
    }
}

// Afficher la recette suivante
function showNextRecipe() {
    if (currentRecipeIndex < recipes.length - 1) {
        currentRecipeIndex++;
        loadRecipeDetails();
    } else {
        alert("C'est la dernière recette.");
    }
}

// Afficher la recette précédente
function showPreviousRecipe() {
    if (currentRecipeIndex > 0) {
        currentRecipeIndex--;
        loadRecipeDetails();
    } else {
        alert("C'est la première recette.");
    }
}

// Charger la première recette au chargement de la page
loadRecipeDetails();
