let recettes = []
const fetchProfil = async () => {
    await fetch(`data/data.json`)
    .then((res) => res.json())
    .then((data) => {
        recettes = data.recipes
    })
    renderCards(recettes)
    recherchePrincipale()
}
fetchProfil()

function renderCards(recettes) {
    const sectionRecette = document.querySelector("#affichage_des_recettes")
    sectionRecette.innerHTML = ``
    for (const recipes of recettes) {
        const recetteModel = recetteFactory(recettes, recipes)
        const recetteCardDom = recetteModel.getUserCardDOM()
        sectionRecette.appendChild(recetteCardDom)
    }
}

function recherchePrincipale() {
    
    const barreDeRecherche = document.querySelector('#searchPrincipale')
    
    barreDeRecherche.addEventListener('keyup', (e) => {
        const entreeValue = e.target.value
        
        if (entreeValue.length >= 3) {
            const filtreRecettes = recettes.filter((recette) => {

                return ( 
                    recette.name.includes(entreeValue)
                    ||
                    recette.description.includes(entreeValue)
                    ||
                    recette.ingredients.some(i => i.ingredient.includes(entreeValue))
                )
            })
            renderCards(filtreRecettes)
             
            // Appliance, ustensils, ingredients des recettes restantes
            const liste1 = document.createElement('ul')
            const liste2 = document.createElement('ul')
            const liste3 = document.createElement('ul')
            const div1 = document.getElementById('divAppareils')
            const div2 = document.getElementById('divUstensiles')
            const div3 = document.getElementById('divIngredients')
            for (let i = 0; i < filtreRecettes.length; i++) {

                const afficheAppliance = filtreRecettes[i].appliance
                const liAppliance = document.createElement('li')
                liAppliance.textContent = afficheAppliance
                liste1.appendChild(liAppliance)
                div1.appendChild(liste1)

                const afficheUstensils = filtreRecettes[i].ustensils
                for (let u = 0; u < afficheUstensils.length; u++) {
                    const liUstensils = document.createElement('li')
                    liUstensils.textContent = afficheUstensils[u]
                    liste2.appendChild(liUstensils)
                    div2.appendChild(liste2)
                }

                const afficheIngredients = filtreRecettes[i].ingredients
                for (let n = 0; n < afficheIngredients.length; n++) {
                    const liIngredients = document.createElement('li')
                    liIngredients.textContent = afficheIngredients[n].ingredient
                    liste3.appendChild(liIngredients)
                    div3.appendChild(liste3)
                }
            }
            const input1 = document.getElementById('inputUstensiles')
            input1.placeholder = "Rechercher un ustensile"
            input1.style.width="100%"
            input1.style.opacity=".5"

            const input2 = document.getElementById('inputAppareils')
            input2.placeholder = "Rechercher un appareil"
            input2.style.width="100%"
            input2.style.opacity=".5"

            const input3 = document.getElementById('inputIngredients')
            input3.placeholder = "Rechercher un ingrédient"
            input3.style.width="100%"
            input3.style.opacity=".5"

            const icone1 = document.querySelector('.fleche1')
            const icone2 = document.querySelector('.fleche2')
            const icone3 = document.querySelector('.fleche3')
            icone1.style.transform = "rotate(180deg)"
            icone2.style.transform = "rotate(180deg)"
            icone3.style.transform = "rotate(180deg)"
        } 
    })
}
