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
    const div1 = document.getElementById('divIngredients')
    const div2 = document.getElementById('divAppareils')
    const div3 = document.getElementById('divUstensiles')
    div1.appendChild(liste1)
    div2.appendChild(liste2)
    div3.appendChild(liste3)

    barreDeRecherche.addEventListener('input', (e) => {
        const entreeValue = e.target.value.toLowerCase() 
        
        while (entreeValue.length >= 3) {
            
            if (entreeValue.includes(recettes.name)) {
                console.log(recettes.includes());
            }
            if (entreeValue.includes(recettes.description)) {
                
            }
            if (entreeValue.includes(recettes.ingredients.some(i => i.ingredient.toLowerCase()))) {

            }
        

            
             
            // Appliance, ustensils, ingredients des recettes restantes
            liste1.innerHTML = ``
            liste2.innerHTML = ``
            liste3.innerHTML = ``
            const sectionTag = document.getElementById('affichage_tags')
            // CSS
            const input1 = document.getElementById('inputIngredients')
            const input2 = document.getElementById('inputAppareils')
            const input3 = document.getElementById('inputUstensiles')
            input1.placeholder = "Rechercher un ingrédient"
            input2.placeholder = "Rechercher un appareil"
            input3.placeholder = "Rechercher un ustensile"
            const Div1 = document.getElementById('divIngredients')
            const Div2 = document.getElementById('divAppareils')
            const Div3 = document.getElementById('divUstensiles')
            Div1.className = "input_ouvert"
            Div2.className = "input_ouvert"
            Div3.className = "input_ouvert"
 
            for (let i = 0; i < recettesFiltrees.length; i++) {

                // ingredients
                const afficheIngredients = recettesFiltrees[i].ingredients   
                for (let n = 0; n < afficheIngredients.length; n++) {
                    const listeIngredients = afficheIngredients[n].ingredient
                    const liIngredients = document.createElement('li')
                    liIngredients.textContent = listeIngredients
                    const dejaLa = [...liste1.children].map(tag => tag.textContent.toLowerCase())
                    if (!dejaLa.includes(listeIngredients.toLowerCase())) {
                        liste1.appendChild(liIngredients)
                        // TAGS
                        liIngredients.addEventListener('click', (e) => {
                            const newTagBlue = document.createElement('li')
                            const pNewTagBlue = document.createElement('p')
                            const closeNewTagBlue = document.createElement('i')
                            closeNewTagBlue.className = "fa-regular fa-circle-xmark"
                            pNewTagBlue.textContent = listeIngredients
                            newTagBlue.className = "tag blue"
                            newTagBlue.appendChild(pNewTagBlue)
                            newTagBlue.appendChild(closeNewTagBlue)
                            sectionTag.appendChild(newTagBlue)
                            filter()
                            // liste1.innerHTML = ""
                            // for (let i = 0; i < afficheIngredients.length; i++) {
                            //     const ingredientRestant = afficheIngredients[i].ingredient;
                            //     const NewliIngredients = document.createElement('li')
                            //     NewliIngredients.textContent = ingredientRestant
                            //     liste1.appendChild(NewliIngredients)                            
                            // }
                        })
                    }
                }               

                // Appliance
                let afficheAppliance = recettesFiltrees[i].appliance
                const liAppliance = document.createElement('li')
                liAppliance.textContent = afficheAppliance
                const dejaLa = [...liste2.children].map(tag => tag.textContent.toLowerCase())
                if(!dejaLa.includes(afficheAppliance.toLowerCase())) {
                    liste2.appendChild(liAppliance)
                    // TAGS
                    liAppliance.addEventListener('click', (e) => {
                        const newTagGreen = document.createElement('li')
                        const pNewTagGreen = document.createElement('p')
                        const closeNewTagGreen = document.createElement('i')
                        closeNewTagGreen.className = "fa-regular fa-circle-xmark"
                        pNewTagGreen.textContent = afficheAppliance
                        newTagGreen.className = "tag green"
                        newTagGreen.appendChild(pNewTagGreen)
                        newTagGreen.appendChild(closeNewTagGreen)
                        sectionTag.appendChild(newTagGreen)
                        filter()
                    })
                }
                
                // Ustensiles
                const afficheUstensils = recettesFiltrees[i].ustensils
                for (let u = 0; u < afficheUstensils.length; u++) {
                    const listeUstensils = afficheUstensils[u]
                    const liUstensils = document.createElement('li')
                    liUstensils.textContent = listeUstensils
                    const dejaLa = [...liste3.children].map(tag => tag.textContent.toLowerCase())
                    if (!dejaLa.includes(listeUstensils.toLowerCase())) {
                        liste3.appendChild(liUstensils)
                        // TAGS
                        liUstensils.addEventListener('click', (e) => {
                            const newTagRed = document.createElement('li')
                            const pNewTagRed = document.createElement('p')
                            const closeNewTagRed = document.createElement('i')
                            closeNewTagRed.className = "fa-regular fa-circle-xmark"
                            pNewTagRed.textContent = afficheUstensils[u]
                            newTagRed.className = "tag red"
                            newTagRed.appendChild(pNewTagRed)
                            newTagRed.appendChild(closeNewTagRed)
                            sectionTag.appendChild(newTagRed)
                            filter()
                        })
                    }
                }
            } 
        }
        while (entreeValue.length < 3) {
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
    const barreDeRecherche = document.querySelector('#searchPrincipale')
    const entreeValue = barreDeRecherche.value.toLowerCase()

    const recettesTags = recettes.filter((recette) => {
        return ( 
            recette.ingredients.some(i => i.ingredient.includes(blueTags))
            &&
            recette.ustensils.some(u => u.includes(redTags))
            &&
            recette.appliance.includes(greenTags)
            &&
            (
                recette.name.toLowerCase().includes(entreeValue)
                ||
                recette.description.toLowerCase().includes(entreeValue)
                ||
                recette.ingredients.some(i => i.ingredient.toLowerCase().includes(entreeValue))
            )
        )
    })
    if (recettesTags.length == 0) {
        const section = document.getElementById('aucune_recette')
        section.innerHTML = `
        <p><strong>Désolé, aucune recette ne correspond à votre critère…</strong> vous pouvez chercher « Poulet coco réunionnais », « poisson », « Lasagne Courgettes et Chèvre », « Far breton », « Crumble aux pommes » etc.</p>
        `      
    }
    renderCards(recettesTags)

    const lesTags = document.querySelectorAll('.tag')
    for (const tag of lesTags) {
        const closeTag = tag.lastChild        
        closeTag.addEventListener('click', e => {
            const li = closeTag.parentNode
            if(li.style.display = "none") {
                renderCards(recettes)
            }
        }) 
    }
}

function rechercheAvancee() {
    const rechercheUstensiles = document.getElementById('inputUstensiles')
    const rechercheAppareils = document.getElementById('inputAppareils')
    const rechercheIngredients = document.getElementById('inputIngredients')
    
    rechercheUstensiles.addEventListener('input', (e) => {
        const entreeValue = e.target.value.toLowerCase()
        const liUstensils = document.querySelectorAll('#divUstensiles li')

        if (entreeValue.length >= 1) {
            const recettesUstensils = recettes.filter((recette) => {
                    
                return ( 
                    recette.ustensils.some(u => u.toLowerCase().includes(entreeValue))
                )
            })
            renderCards(recettesUstensils) 
        }

        for (const li of liUstensils) {
            if (!li.textContent.toLowerCase().includes(entreeValue)) {
                li.style.display = "none"
            }
            else {
                li.style.display = "block"
            }
        }
    })

    rechercheAppareils.addEventListener('input', (e) => {
        const entreeValue = e.target.value.toLowerCase()
        const liAppareils = document.querySelectorAll('#divAppareils li')

        if (entreeValue.length >= 1) {
            const recettesAppareils = recettes.filter((recette) => {
                    
                return ( 
                    recette.appliance.toLowerCase().includes(entreeValue)
                )
            })
            renderCards(recettesAppareils) 
        }

        for (const li of liAppareils) {
            if (!li.textContent.toLowerCase().includes(entreeValue)) {
                li.style.display = "none"
            }
            else {
                li.style.display = "block"
            }
        }
    })

    rechercheIngredients.addEventListener('input', (e) => {
        const entreeValue = e.target.value.toLowerCase()
        const liIngredients = document.querySelectorAll('#divIngredients li')

        if (entreeValue.length >= 1) {
            const recettesIngredients = recettes.filter((recette) => {
                    
                return ( 
                    recette.ingredients.some(i => i.ingredient.toLowerCase().includes(entreeValue))
                )
            })
            renderCards(recettesIngredients) 
        }

        for (const li of liIngredients) {
            if (!li.textContent.toLowerCase().includes(entreeValue)) {
                li.style.display = "none"
            }
            else {
                li.style.display = "block"
            }
        }
    })
}
