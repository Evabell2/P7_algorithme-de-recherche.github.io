let recettes = []
const fetchProfil = async () => {
    await fetch(`data/data.json`)
    .then((res) => res.json())
    .then((data) => {
        recettes = data.recipes
    })
    renderCards(recettes)
    recherchePrincipale()
    rechercheAvancee()
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
    const liste1 = document.createElement('ul')
    const liste2 = document.createElement('ul')
    const liste3 = document.createElement('ul')
    const div1 = document.getElementById('divAppareils')
    const div2 = document.getElementById('divUstensiles')
    const div3 = document.getElementById('divIngredients')
    div1.appendChild(liste1)
    div2.appendChild(liste2)
    div3.appendChild(liste3)

    barreDeRecherche.addEventListener('input', (e) => {
    const entreeValue = e.target.value.toLowerCase()
        
        if (entreeValue.length >= 3) {
            const recettesFiltrees = recettes.filter((recette) => {
                
                return ( 
                    recette.name.toLowerCase().includes(entreeValue)
                    ||
                    recette.description.toLowerCase().includes(entreeValue)
                    ||
                    recette.ingredients.some(i => i.ingredient.toLowerCase().includes(entreeValue))
                )
            })
            renderCards(recettesFiltrees)
             
            // Appliance, ustensils, ingredients des recettes restantes
            liste1.innerHTML = ``
            liste2.innerHTML = ``
            liste3.innerHTML = ``
            const sectionTag = document.getElementById('affichage_tags')
            // CSS
            const input1 = document.getElementById('inputUstensiles')
            const input2 = document.getElementById('inputAppareils')
            const input3 = document.getElementById('inputIngredients')
            input1.placeholder = "Rechercher un ustensile"
            input2.placeholder = "Rechercher un appareil"
            input3.placeholder = "Rechercher un ingrédient"
            const Div1 = document.querySelector('#divAppareils')
            const Div2 = document.querySelector('#divUstensiles')
            const Div3 = document.querySelector('#divIngredients')
            Div1.className = "input_ouvert"
            Div2.className = "input_ouvert"
            Div3.className = "input_ouvert"
 
            for (let i = 0; i < recettesFiltrees.length; i++) {

                // Appliance
                let afficheAppliance = recettesFiltrees[i].appliance
                const liAppliance = document.createElement('li')
                liAppliance.textContent = afficheAppliance
                liste1.appendChild(liAppliance)
                // TAGS
                liAppliance.addEventListener('click', (e) => {
                    const newliAppliance = document.createElement('li')
                    newliAppliance.textContent = afficheAppliance
                    newliAppliance.className = "tag green"
                    sectionTag.appendChild(newliAppliance)
                    filter()
                })
                
                // Ustensiles
                const afficheUstensils = recettesFiltrees[i].ustensils
                for (let u = 0; u < afficheUstensils.length; u++) {
                    const liUstensils = document.createElement('li')
                    liUstensils.textContent = afficheUstensils[u]
                    liste2.appendChild(liUstensils)
                    // TAGS
                    liUstensils.addEventListener('click', (e) => {
                        const newliustensils = document.createElement('li')
                        newliustensils.textContent = afficheUstensils[u]
                        newliustensils.className = "tag red"
                        sectionTag.appendChild(newliustensils)
                        filter()
                    })
                }

                // ingredients
                const afficheIngredients = recettesFiltrees[i].ingredients   
                for (let n = 0; n < afficheIngredients.length; n++) {
                    const listeIngredients = afficheIngredients[n].ingredient
                    const liIngredients = document.createElement('li')
                    liIngredients.textContent = listeIngredients
                    liste3.appendChild(liIngredients)
                    // TAGS
                    liIngredients.addEventListener('click', (e) => {
                        const newliIngredients = document.createElement('li')
                        newliIngredients.textContent = listeIngredients
                        newliIngredients.className = "tag blue"
                        sectionTag.appendChild(newliIngredients)
                        filter()
                    })
                    // if (liste3.includes(listeIngredients)) {
                    // }
                    // else {
                    //     const liIngredients = document.createElement('li')
                    //     liIngredients.textContent = listeIngredients
                    //     liste3.appendChild(liIngredients)
                    // }
                }
            } 
        }
        else {
            renderCards(recettes)
        }
    })
}

function gettags(color) {
    const sectionTag = document.getElementById('affichage_tags')
    const tags = [...sectionTag.children]
    let lesTags = tags.filter(tag => tag.className == "tag "+color)
    return lesTags.map(tag => tag.textContent)
}

function filter() {
    const blueTags = gettags("blue")
    const redTags = gettags("red")
    const greenTags = gettags("green")
    // const barreDeRecherche = document.querySelector('#searchPrincipale')
    // const entreeValue = barreDeRecherche.value.toLowerCase() 

    const recettesTags = recettes.filter((recette) => {
        return ( 
            recette.ingredients.some(i => i.ingredient.includes(blueTags))
            &&
            recette.ustensils.some(u => u.includes(redTags))
            &&
            recette.appliance.includes(greenTags)
            
            // recette.name.toLowerCase().includes(entreeValue)
            // ||
            // recette.description.toLowerCase().includes(entreeValue)
            // ||
            // recette.ingredients.some(i => i.ingredient.toLowerCase().includes(entreeValue))
        )
    })
    renderCards(recettesTags)
}

function rechercheAvancee() {
    const rechercheUstensiles = document.getElementById('inputUstensiles')
    const rechercheAppareils = document.getElementById('inputAppareils')
    const rechercheIngredients = document.getElementById('inputIngredients')
    
    rechercheUstensiles.addEventListener('input', (e) => {
        const entreeValue = e.target.value.toLowerCase()
        const recettesUstensiles = recettes.filter((recette) => {
            return ( 
                recette.ustensils.some(u => u.toLowerCase().includes(entreeValue))
            )
        })
        renderCards(recettesUstensiles)
    })

    rechercheAppareils.addEventListener('input', (e) => {
        const entreeValue = e.target.value.toLowerCase()
        const recettesAppliance = recettes.filter((recette) => {
            return ( 
                recette.appliance.toLowerCase().includes(entreeValue)
            )
        })
        renderCards(recettesAppliance)
    })

    rechercheIngredients.addEventListener('input', (e) => {
        const entreeValue = e.target.value.toLowerCase()
        const recettesIngredients = recettes.filter((recette) => {
            return ( 
                recette.ingredients.some(i => i.ingredient.toLowerCase().includes(entreeValue))
            )
        })
        renderCards(recettesIngredients)
    })
}
