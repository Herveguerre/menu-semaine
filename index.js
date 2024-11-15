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

// Appeler cette fonction au chargement de la page
initializeLocalStorage();

// Charger et afficher les recettes sur la page
function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    displayRecipesByCategory(recipes);
}

document.addEventListener("DOMContentLoaded", loadRecipes);




//index.js
function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    displayRecipesByCategory(recipes);
}

function filterByCategory() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    
    const filteredRecipes = selectedCategory === "all" 
        ? recipes 
        : recipes.filter(recipe => recipe.category === selectedCategory);
    
    displayRecipesByCategory(filteredRecipes);
}

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

function viewRecipe(id) {
    const recipes = JSON.parse(localStorage.getItem("recipes"));
    const selectedRecipe = recipes.find(recipe => recipe.id === id);
    localStorage.setItem("currentRecipe", JSON.stringify(selectedRecipe));
    window.location.href = "viewRecipe.html";
}

// Charger les recettes au chargement de la page
loadRecipes();




// index.js



