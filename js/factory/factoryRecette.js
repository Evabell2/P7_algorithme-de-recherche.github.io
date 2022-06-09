function recetteFactory(data, recipes) {
    const { name, time, description, ingredients } = data

    function getUserCardDOM() {

        const article = document.createElement('article')
        const divTitre = document.createElement('div')
        article.appendChild(divTitre)
        const titre = document.createElement( 'h1' )
        titre.textContent = recipes.name
        divTitre.appendChild(titre)
        divTitre.className = "container_titre"
        const duree = document.createElement('span')
        duree.textContent = `${recipes.time} min`
        divTitre.appendChild(duree)
        duree.className = "duree_recette"
        const divInfos = document.createElement('div')
        divInfos.className = "container_infos"
        article.appendChild(divInfos)
        const divIngredients = document.createElement('div')
        divIngredients.className = "div_ingredients"
        divInfos.appendChild(divIngredients)
        const Description = document.createElement('p')
        Description.className = "description"
        Description.textContent = recipes.description
        divInfos.appendChild(Description)
        let dataIngredients = recipes.ingredients
        for (const ingredients of dataIngredients) {
            const pIngredient = document.createElement('p')
            divIngredients.appendChild(pIngredient)
            
            const arrIngredient = [ingredients.ingredient, ingredients.quantity, ingredients.unit]   
            let filtered = arrIngredient.filter(function(x) {
                return x !== undefined;
            })
            pIngredient.textContent = `${filtered[0]} : ${filtered.join(" ").split(filtered[0])}`
        }
        return (article)
    }
    
    return { name, time, description, ingredients, getUserCardDOM }
}