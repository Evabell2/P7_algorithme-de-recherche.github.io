function recetteFactory(data, recipes) {
    const { name, time, description, ingredients } = data

    function getUserCardDOM() {

        const article = document.createElement('article')
        const container = document.createElement('section')
        const divTitre = document.createElement('div')
        const titre = document.createElement( 'h1' )
        titre.textContent = recipes.name
        divTitre.className = "container_titre"
        const duree = document.createElement('span')
        duree.textContent = `${recipes.time} min`
        duree.className = "duree_recette"
        const divInfos = document.createElement('div')
        divInfos.className = "container_infos"
        const divIngredients = document.createElement('div')
        divIngredients.className = "div_ingredients"
        const Description = document.createElement('p')
        Description.className = "description"
        Description.textContent = recipes.description

        article.appendChild(container) 
        container.appendChild(divTitre)
        container.appendChild(divInfos)
        divTitre.appendChild(titre)
        divTitre.appendChild(duree)
        divInfos.appendChild(divIngredients)
        divInfos.appendChild(Description)
        
        let dataIngredients = recipes.ingredients
        for (const ingredients of dataIngredients) {
            const pIngredient = document.createElement('p')
            divIngredients.appendChild(pIngredient)
            
            const arrIngredient = [ingredients.ingredient, ingredients.quantity, ingredients.unit]   
            let filtered = arrIngredient.filter(function(x) {
                return x !== undefined;
            })
            pIngredient.innerHTML = `<span class="bold">${filtered[0]} ${filtered[1] ?":":""}</span> ${filtered[1] ?filtered[1]:""}  ${filtered[2] ?filtered[2]:""}`  
        }
        return (article)
    }
    
    return { name, time, description, ingredients, getUserCardDOM }
}