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
    
    // #region constantes
        const barreDeRecherche = document.querySelector('#searchPrincipale')
        const liste1 = document.createElement('ul')
        const liste2 = document.createElement('ul')
        const liste3 = document.createElement('ul')
        const input1 = document.getElementById('inputIngredients')
        const input2 = document.getElementById('inputAppareils')
        const input3 = document.getElementById('inputUstensiles')
        const div1 = document.getElementById('divIngredients')
        const div2 = document.getElementById('divAppareils')
        const div3 = document.getElementById('divUstensiles')
        div1.appendChild(liste1)
        div2.appendChild(liste2)
        div3.appendChild(liste3)
    // #endregion constantes
    liste1.style.display = "none"
    liste2.style.display = "none"
    liste3.style.display = "none"

    // #region Ouverture des inputs avec chevron
        // INGREDIENTS
        const chevron1 = div1.querySelector('.fa-angle-down')
        chevron1.addEventListener('click', (e) => {
            if (liste1.style.display == "block") {
                liste1.style.display = "none"
                input1.placeholder = "Ingrédients"
                chevron1.style.transform = "rotate(0deg)"
                div1.classList.remove("input_ouvert")
            }
            else {
                liste1.style.display = "block"
                input1.placeholder = "Rechercher un ingrédient"
                chevron1.style.transform = "rotate(180deg)"
                div1.className += " input_ouvert "
            }
        })
        //APPAREILS
        const chevron2 = div2.querySelector('.fa-angle-down')
        chevron2.addEventListener('click', (e) => {
            if (liste2.style.display == "block") {
                liste2.style.display = "none"
                input2.placeholder = "Appareils"
                chevron2.style.transform = "rotate(0deg)"
                div2.classList.remove("input_ouvert")
            }
            else {
                liste2.style.display = "block"
                input2.placeholder = "Rechercher un appareil"
                chevron2.style.transform = "rotate(180deg)"
                div2.className += " input_ouvert "
            }
        })
        // USTENSILES
        const chevron3 = div3.querySelector('.fa-angle-down')
        chevron3.addEventListener('click', (e) => {
            if (liste3.style.display == "block") {
                liste3.style.display = "none"
                input3.placeholder = "Ustensiles"
                chevron3.style.transform = "rotate(0deg)"
                div3.classList.remove("input_ouvert")
            }
            else {
                liste3.style.display = "block"
                input3.placeholder = "Rechercher un ustensile"
                chevron3.style.transform = "rotate(180deg)"
                div3.className += " input_ouvert "
            }
        })
    // #endregion Ouverture des inputs 

    const runRecherche = (e) => {
        const barreDeRecherche = document.querySelector('#searchPrincipale')
        const entreeValue = barreDeRecherche.value.toLowerCase()
        let started = false

        if (entreeValue.length >= 3 || !started) {
            // started : la recherche se lance dès le début, sans le moteur de recherche
            started = true
            // recherche principale
            const recettesFiltrees = []
            for (const recette of recettes) {
                
                if (recette.name.toLowerCase().includes(entreeValue)
                ||
                recette.description.toLowerCase().includes(entreeValue)
                ||
                recette.ingredients.some(i => i.ingredient.toLowerCase().includes(entreeValue))) {
                    recettesFiltrees.push(recette)
                }
            }
            renderCards(recettesFiltrees)
            
            // affichage inputs avec entreeValue barre de recherche principale
            if (entreeValue.length >= 3) {
                liste1.style.display = "block"
                liste2.style.display = "block"
                liste3.style.display = "block"
                input1.placeholder = "Rechercher un ingrédient"
                input2.placeholder = "Rechercher un appareil"
                input3.placeholder = "Rechercher un ustensile"
                chevron1.style.transform = "rotate(180deg)"
                div1.className += " input_ouvert "
                chevron2.style.transform = "rotate(180deg)"
                div2.className += " input_ouvert "
                chevron3.style.transform = "rotate(180deg)"
                div3.className += " input_ouvert "
            }
            // Appliance, ustensils, ingredients des recettes restantes + TAGS
            liste1.innerHTML = ``
            liste2.innerHTML = ``
            liste3.innerHTML = ``
            const sectionTag = document.getElementById('affichage_tags')
    
            for (let i = 0; i < recettesFiltrees.length; i++) {

                // #region ingredients
                    const afficheIngredients = recettesFiltrees[i].ingredients 
                    for (let n = 0; n < afficheIngredients.length; n++) {
                        const listeIngredients = afficheIngredients[n].ingredient
                        const liIngredients = document.createElement('li')
                        liIngredients.textContent = listeIngredients
                        // liIngredients est la liste de tout les ingredients des recettes filtrées
                        const dejaLa = [...liste1.children].map(tag => tag.textContent.toLowerCase())
                        // dejala est la liste des ingrédients dans la recherche avancée
                        if (!dejaLa.includes(listeIngredients.toLowerCase())) {
                            // pour gérer les doublons
                            liste1.appendChild(liIngredients)
                            liIngredients.addEventListener('click', (e) => {
                                // création tag
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
                            })
                        }
                    }               
                // #endregion ingredients

                // #region Appliance
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
                // #endregion Appliance
                
                // #region Ustensiles
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
                // #endregion Ustensiles
            }  
        }                  
        else {
            renderCards(recettes) 
            const section = document.getElementById('aucune_recette')
            section.innerHTML = `
            <p><strong>Désolé, aucune recette ne correspond à votre critère…</strong> vous pouvez chercher « Poulet coco réunionnais », « poisson », « Lasagne Courgettes et Chèvre », « Far breton », « Crumble aux pommes » etc.</p>
            `      
        }
    }
     barreDeRecherche.addEventListener('input', runRecherche)
     runRecherche()
}

function gettags(color) {
    const sectionTag = document.getElementById('affichage_tags')
    const tags = [...sectionTag.children]
    let lesTags = tags.filter(tag => tag.className == "tag "+color)
    return lesTags.map(tag => tag.textContent)
}
function containBlueTags(recipe, tags) {
    // fonction qui va pouvoir être utilisée dans la fonction filter (en dessous)
    // fait partie du filtrage
    let count = tags.length
    for (const tag of tags) {
        if (recipe.ingredients.some(i => i.ingredient.toLowerCase() === tag.toLowerCase())) {
            count--
        }
        if (recipe.ustensils.some(u => u.toLowerCase() === tag.toLowerCase())) {
            count--
        }
        if (recipe.appliance.toLowerCase() === tag.toLowerCase()) {
            count--
        }
    }
    return count>0?false:true
}
function filter() {
    const blueTags = gettags("blue")
    const redTags = gettags("red")
    const greenTags = gettags("green")
    const barreDeRecherche = document.querySelector('#searchPrincipale')
    const entreeValue = barreDeRecherche.value.toLowerCase()

    // permet de filtrer les tags ET la recherche principale
    const recettesTags = recettes.filter((recette) => {
        return ( 
            (blueTags.length == 0 || containBlueTags(recette,blueTags))
            &&
            (redTags.length == 0 || containBlueTags(recette,redTags))
            &&
            (greenTags.length == 0 || containBlueTags(recette,greenTags))
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

    // message d'erreur
    if (recettesTags == false) {
        const section = document.getElementById('aucune_recette')
        section.innerHTML = `
        <p><strong>Désolé, aucune recette ne correspond à votre critère…</strong> vous pouvez chercher « Poulet coco réunionnais », « poisson », « Lasagne Courgettes et Chèvre », « Far breton », « Crumble aux pommes » etc.</p>
        `      
    }
    renderCards(recettesTags)

    // fermeture d'un tag
    const lesTags = document.querySelectorAll('.tag')
    for (const tag of lesTags) {
        const closeTag = tag.lastChild        
        closeTag.addEventListener('click', e => {
            const parent = tag.parentNode
            parent.removeChild(tag)
            filter() 
        }) 
    }

    // #region maj recherches avancées ingredients
        const ulInput = document.querySelector('#divIngredients > ul')
        const ingredientsInput = ulInput.children
        // ingredients présent sans le tag

        for (const ingredient of ingredientsInput) {
            ingredient.style.display = "none"
        }
        for (const ingredient of ingredientsInput) {
            let textIngredients = ingredient.textContent
            for (const recetteTag of recettesTags) {
                const ingredientsRestants = recetteTag.ingredients
                for (const ingredientrestant of ingredientsRestants) {
                    const ingredientsRecettesPresentes = ingredientrestant.ingredient
                    if (textIngredients == ingredientsRecettesPresentes) {
                        ingredient.style.display = "block"
                    }
                }
            }
        }
    // #endregion maj recherches avancées ingredients

    // #region maj recherches avancées appareils
        const ulInput2 = document.querySelector('#divAppareils > ul')
        const appareilsInput = ulInput2.children
        // appareils présent sans le tag

        for (const appareil of appareilsInput) {
            appareil.style.display = "none"
        }
        for (const appareil of appareilsInput) {
            let textAppareil = appareil.textContent                              
            for (const recetteTag of recettesTags) {
                const appareilsRestants = recetteTag.appliance
                if (textAppareil == appareilsRestants) {
                    appareil.style.display = "block"
                }
            } 
        }
    // #endregion maj recherches avancées appareils

    // #region maj recherches avancées ustensiles
        const ulInput3 = document.querySelector('#divUstensiles > ul')
        const ustensilesInput = ulInput3.children
        // ustensiles présent sans le tag

        for (const ustensile of ustensilesInput) {
            ustensile.style.display = "none"
        }
        for (const ustensile of ustensilesInput) {
            let textUstensile = ustensile.textContent   
            for (const recetteTag of recettesTags) {
                const appareilsRestants = recetteTag.ustensils
                for (let i = 0; i < appareilsRestants.length; i++) {
                    const appareilsRecettesPresentes = appareilsRestants[i];
                    if (textUstensile == appareilsRecettesPresentes) {
                        ustensile.style.display = "block"
                    }
                }
            }    
        }
    // #endregion maj recherches avancées ustensiles
}

function rechercheAvancee() {
    // fonctionnalité barres de recherche des input des champs avancés
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
