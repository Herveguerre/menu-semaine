//crud.js
let db;
let editingRecipeId = null;

function initDB() {
    const request = indexedDB.open("RecipeDatabase", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        db.createObjectStore("recipes", { keyPath: "id" });
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        loadRecipesFromDB(); // Charger les recettes depuis IndexedDB au démarrage
    };

    request.onerror = function (event) {
        console.error("Erreur d'initialisation d'IndexedDB :", event.target.errorCode);
    };
}

initDB();

// Fonction d'ajout ou de mise à jour des recettes
function saveRecipe() {
    const name = document.getElementById("recipeName").value;
    const image = document.getElementById("recipeImage").value;
    const category = document.getElementById("recipeCategory").value;
    const ingredients = Array.from(document.querySelectorAll('.ingredient')).map(input => input.value);
    const steps = document.getElementById("recipeSteps").value;

    const newRecipe = {
        id: editingRecipeId || Date.now(), // ID unique pour chaque recette
        name,
        image,
        category,
        ingredients,
        steps
    };

    const transaction = db.transaction(["recipes"], "readwrite");
    const store = transaction.objectStore("recipes");
    const request = editingRecipeId ? store.put(newRecipe) : store.add(newRecipe);

    request.onsuccess = function () {
        console.log("Recette enregistrée avec succès !");
        resetForm();
        loadRecipesFromDB(); // Recharger les recettes après enregistrement
    };

    request.onerror = function (event) {
        console.error("Erreur lors de l'enregistrement de la recette :", event.target.errorCode);
    };

    editingRecipeId = null; // Réinitialiser après l'enregistrement
}

// Charger les recettes depuis IndexedDB et les enregistrer dans `localStorage`
function loadRecipesFromDB() {
    const transaction = db.transaction(["recipes"], "readonly");
    const store = transaction.objectStore("recipes");
    const request = store.getAll();

    request.onsuccess = function (event) {
        const recipes = event.target.result;

        // Stocker les recettes dans `localStorage` pour synchronisation
        localStorage.setItem("recipes", JSON.stringify(recipes));

        // Afficher les recettes dans la liste
        const recipeList = document.getElementById("recipeList");
        recipeList.innerHTML = recipes.map((recipe) => `
            <div class="recipe-item">
                <h4>${recipe.name} - ${recipe.category}</h4>
                <button onclick="editRecipe(${recipe.id})">Modifier</button>
                <button onclick="deleteRecipe(${recipe.id})">Supprimer</button>
            </div>
        `).join('');
    };

    request.onerror = function () {
        console.error("Erreur lors du chargement des recettes.");
    };
}

function editRecipe(id) {
    const transaction = db.transaction(["recipes"], "readonly");
    const store = transaction.objectStore("recipes");
    const request = store.get(id);

    request.onsuccess = function (event) {
        const recipe = event.target.result;

        document.getElementById("recipeName").value = recipe.name;
        document.getElementById("recipeImage").value = recipe.image;
        document.getElementById("recipeCategory").value = recipe.category;
        document.getElementById("recipeSteps").value = recipe.steps;

        const ingredientsContainer = document.getElementById("ingredientsContainer");
        ingredientsContainer.innerHTML = recipe.ingredients.map(ingredient => `
            <input type="text" class="ingredient" value="${ingredient}" required>
        `).join('');

        editingRecipeId = recipe.id;
    };

    request.onerror = function () {
        console.error("Erreur lors de l'édition de la recette.");
    };
}

function deleteRecipe(id) {
    const transaction = db.transaction(["recipes"], "readwrite");
    const store = transaction.objectStore("recipes");
    const request = store.delete(id);

    request.onsuccess = function () {
        console.log("Recette supprimée avec succès !");
        loadRecipesFromDB(); // Recharger les recettes après suppression
    };

    request.onerror = function () {
        console.error("Erreur lors de la suppression de la recette.");
    };
}

function addIngredient() {
    const ingredientsContainer = document.getElementById("ingredientsContainer");
    ingredientsContainer.insertAdjacentHTML("beforeend", '<input type="text" class="ingredient" placeholder="Ingrédient" required>');
}

function resetForm() {
    document.getElementById("recipeForm").reset();
    document.getElementById("ingredientsContainer").innerHTML = '<input type="text" class="ingredient" placeholder="Ingrédient" required>';
    editingRecipeId = null; // Réinitialiser après réinitialisation
}
