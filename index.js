// index.js

// Fonction pour initialiser le stockage local avec les recettes par défaut
function initializeLocalStorage() {
    // Vérifie si des recettes existent déjà dans localStorage
    if (!localStorage.getItem("recipes")) {
        // Si non, enregistre les recettes par défaut dans localStorage
        localStorage.setItem("recipes", JSON.stringify(defaultRecipes));
        console.log("Recettes par défaut ajoutées à localStorage.");
    } else {
        console.log("Recettes déjà présentes dans localStorage.");
    }
}

// Fonction pour charger et afficher les recettes depuis le localStorage
function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    displayRecipesByCategory(recipes);
}

// Charger et initialiser les données au chargement complet du DOM
document.addEventListener("DOMContentLoaded", () => {
    initializeLocalStorage(); // Initialise les recettes si nécessaire
    loadRecipes(); // Charge les recettes pour l'affichage
});

// Fonction de filtrage par catégorie
function filterByCategory() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    
    const filteredRecipes = selectedCategory === "all" 
        ? recipes 
        : recipes.filter(recipe => recipe.category === selectedCategory);
    
    displayRecipesByCategory(filteredRecipes);
}

// Fonction pour afficher les recettes par catégorie
function displayRecipesByCategory(recipes) {
    const recipeList = document.getElementById("recipeList");
    const categories = [...new Set(recipes.map(recipe => recipe.category))];

    recipeList.innerHTML = categories.map(category => {
        const recipesByCategory = recipes.filter(recipe => recipe.category === category);
        
        return `
            <h3>${category}</h3>
            <div class="recipe-list">
                ${recipesByCategory.map(recipe => `
                    <div class="recipe-item" onclick="viewRecipe(${recipe.id})">
                        <img src="${recipe.image}" alt="Image de ${recipe.name}">
                        <h4>${recipe.name}</h4>
                    </div>
                `).join('')}
            </div>
            
        `;
    }).join('');
}

// Fonction pour afficher une recette spécifique
function viewRecipe(id) {
    const recipes = JSON.parse(localStorage.getItem("recipes"));
    const selectedRecipe = recipes.find(recipe => recipe.id === id);
    localStorage.setItem("currentRecipe", JSON.stringify(selectedRecipe));
    window.location.href = "viewRecipe.html";
}

