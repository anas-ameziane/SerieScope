let seriesInitiales = [];
let a = 0
const Cartes = document.getElementById("ticketList");
const Vide = document.getElementById("etat-vide");
const form = document.getElementById("formulaire-serie");
const inptRecherche = document.getElementById("recherche");
const filtre = document.getElementById("filtre-genre");
const Reset = document.getElementById("reinitialiser-filtres");
async function fetchData() {
    try {
        const response = await fetch("https://api.tvmaze.com/shows?page=0");
        if (!response.ok) throw new Error("Erreur lors du chargement des séries");
        seriesInitiales = await response.json()
        grnrefil();
        appliquerFiltres();
        
    let seriesList = [];
    for (let i = 0; i < 20; i++){
       a++
        seriesList.push(serie);
}
    } catch (error) {
        console.error(error);
    }
}
function grnrefil() {
    const valeurActuelle = filtre.value;
    const genres = new Set();
    for (let i = 0; i < seriesInitiales.length; i++)
        for (let j = 0; j < seriesInitiales[i].genres.length; j++)
            genres.add(seriesInitiales[i].genres[j]);
    filtre.replaceChildren(new Option("Tous les genres", ""));
    for (let genre of genres)
        filtre.add(new Option(genre));
    filtre.value = genres.has(valeurActuelle) ? valeurActuelle : "";
}
// 3. Recherche et filtres
function appliquerFiltres() {
    const terme = inptRecherche.value.trim().toLowerCase();
    const genre = filtre.value;
    const resultat = seriesInitiales.filter(serie =>serie.name.toLowerCase().includes(terme) 
    &&(!genre || serie.genres.includes(genre))
    );
    afficherSeries(resultat);
}
// 4. Afficher les séries

function afficherSeries(donnees) {
    Cartes.replaceChildren();
    if (donnees.length === 0) {
        Vide.hidden = false;
        return;
    }
    Vide.hidden = true;
    for (let i = 0; i < 20; i++) {
        
        document.getElementById("total").textContent = "Total de séries : " + seriesInitiales.length;
        
        const serie = donnees[i];
        const card = document.createElement("article");
        const imageContainer = document.createElement("div");
        const titre = document.createElement("h3");
        const genresContainer = document.createElement("div");
        const description = document.createElement("p");
        card.className = "bg-[#18181b] border border-gray-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between p-4 space-y-4";
        if (serie.image && serie.image.medium) {
            const image = document.createElement("img");
            image.src = serie.image.medium;
            image.alt = serie.name;
            image.className = "w-full h-48 object-cover rounded-xl mb-3";
            imageContainer.appendChild(image);
        }
        titre.textContent = serie.name;
        titre.className = "text-xl font-bold text-white tracking-tight";
        genresContainer.className = "flex flex-wrap gap-1.5";
        serie.genres.forEach(genre => {
            const span = document.createElement("span");
            span.textContent = genre;
            span.className = "bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-full border border-gray-700";
            genresContainer.appendChild(span);
        });
        description.className = "text-sm text-gray-400 line-clamp-3";
        if (serie.isLocal) {
            description.textContent = serie.summary;
        } else {
            description.innerHTML = serie.summary ?? "";
        }
        card.append(imageContainer, titre, genresContainer, description);
        Cartes.appendChild(card);
    }
}

// 5. Ajouter une série
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nom = document.getElementById("nom").value.trim();
    const genres = document.getElementById("genres").value.split(",").map(genre => genre.trim()).filter(Boolean);
    const description = document.getElementById("description").value.trim();
    document.getElementById("erreur-nom").textContent = nom ? "" : "Le nom est obligatoire.";
    document.getElementById("erreur-genres").textContent = genres.length ? "" : "Indique au moins un genre.";
    if (!nom || genres.length === 0) return;
    const nouvelleSerie = {
        id: Date.now(),
        name: nom,
        genres: genres,
        summary: description,
        image: null,
        isLocal: true
    };
    seriesInitiales.unshift(nouvelleSerie);
    form.reset();
    grnrefil();
    appliquerFiltres();
});
// 6. Recherche
inptRecherche.addEventListener("input", appliquerFiltres);
// 7. Filtre par genre
filtre.addEventListener("change", appliquerFiltres);
// 8. Réinitialiser les filtres
Reset.addEventListener("click", () => {
    inptRecherche.value = "";
    filtre.value = "";
    appliquerFiltres();
});
const place = document.getElementById("pgplace")
function pg (){
for (let i = 0; i < array.length; i++) {
    
const btn = document.createElement("button");
    
}


}
// 9. Démarrer le programme
console.log(seriesInitiales.length)
console.log(seriesInitiales)
document.getElementById("total").textContent = "Total de séries : " + seriesInitiales.length;
fetchData();