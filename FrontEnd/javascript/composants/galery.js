/*retourner la list de la galerie fournie par l api*/
const galerie = async () => {  //funcao
    const listgalerie = await fetch("http://localhost:5678/api/works", { //fetch interage com a api
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json()); //then é 1promessa
    return listgalerie; //retourne la list des travaux a la fin
}

const gallery = document.querySelector(".gallery");
/*afficher les travaux sur la page d accueil*/
const affichework = async () => {
    const work = await galerie(); // xamei a funcao galerie, await attend la reponse d la list des travaux

    for (let i = 0; i < work.length; i++) {
        let figure = document.createElement("figure");//crear a tag figure
        gallery.appendChild(figure);//o parente gallery xama o filho figure
        let image = document.createElement("img");
        figure.appendChild(image);
        image.src = work[i].imageUrl; //fui buscar o valor imageurl ao ficheiro workmodel do back
        let figcaption = document.createElement("figcaption"); //o k ta no parenteses é a tag do html
        figure.appendChild(figcaption);
        figure.classList.add("category" + work[i].category.id);
        figure.classList.add("all");
        figcaption.innerText = work[i].title;
    }
}
window.onload = affichework();//desde k o site e aberto ele executa a funcao affichework (para mostrar as imgs e texto)


//let gallery = document.querySelector(".gallery");
const filtrer = async () => {
    const category = await fetch("http://localhost:5678/api" + "/categories", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        }

    })
        .then((res) => res.json());
    return category;
}
//const selectionfilters = document.querySelector(".selectionfilters");
const affichecategory = async (elt_category) => {
    const category = await filtrer();

    //creer le bouton "tous" en dehors de boucle
    const creerdiv = document.createElement("article");
    //const button = document.createElement("button");
    creerdiv.classList.add("selectionfilters");
    const btn_all = document.createElement("button");
    btn_all.innerHTML = "Tous";
    btn_all.classList.add("filters");
    btn_all.dataset.category = "all";
    creerdiv.appendChild(btn_all);
    //pour cibler les boutons
    btn_all.setAttribute("data-name", "Tous");

    //creer les 3 boutons de filtre
    for (let i = 0; i < category.length; i++) {
        const btn = document.createElement("button");
        btn.innerHTML = category[i].name;
        creerdiv.appendChild(btn);
        btn.classList.add("filters");
        btn.dataset.category = "category" + category[i].id
        if (i === 1 || i === 2) {
            btn.classList.add("largeurfilter4");
        }
        //btn.setAttribute("data-name", category[i].name);
    }
    for (const button of creerdiv.children) {
        button.addEventListener('click', () => {
            afficheCategoryFiltres(button.dataset.category)
        })
    }
    //inserer cote a cote avant gallery
    gallery.insertAdjacentElement("beforebegin", creerdiv);
}
affichecategory();

function afficheCategoryFiltres(category) {
    for (const child of gallery.children) {
        if (child.classList.contains(category)) {
            child.style.display = "Block"
        } else {
            child.style.display = "None"
        }
    }
};

const token = localStorage.getItem('token');
if (token != null) {
    const masque = document.querySelectorAll('.masque');
    masque.forEach(elementsmasque => {
        elementsmasque.style.display = "content"
    })
    /*
    const filters = document.querySelector('.selectionfilters');
    
        filters.style.display = "none"
    console.log(filters);
*/
}
else {
    const masque = document.querySelectorAll('.masque');
    masque.forEach(elementsmasque => {
        elementsmasque.style.display = "none"
    })
}

/*
const selectionfilters = document.querySelector(".selectionfilters");
fetch("http://localhost:5678/api/categories")
.then((res)=> res.json())
.then(function(data){// é uma promessa com uma funcao k vai pegar o resultado da primeira promessa
    for(let i;i<data.length;i++){
        console.log(data.length);
        let button = document.createElement("button");
        selectionfilters.appendChild(button);
        button.classList.add("filters"); // para dar class á tag button
        button.innerText = data[i].name; //para afichar o nome da categoria k se encontra na posicao i e name fui buscar ao dossier categories model
        button.dataset.category="category"+data[i].id;
    }
    for(let buton of selectionfilters.children){

    }
    //gallery.insertAdjacentElement("beforebegin",button);
})

const filtre = async () => {

}
*/