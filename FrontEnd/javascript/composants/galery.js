
const galerie = async () => {
    const listgalerie = await fetch("http://localhost:5678/api/works", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json());
    return listgalerie;
}

const gallery = document.querySelector(".gallery");

const affichework = async () => {
    const work = await galerie();

    for (let i = 0; i < work.length; i++) {
        let figure = document.createElement("figure");
        gallery.appendChild(figure);
        let image = document.createElement("img");
        figure.appendChild(image);
        image.src = work[i].imageUrl; //fui buscar o valor imageurl ao ficheiro workmodel do back
        let figcaption = document.createElement("figcaption");
        figure.appendChild(figcaption);
        figure.classList.add("category" + work[i].category.id);
        figure.classList.add("all");
        figcaption.innerText = work[i].title;
    }
}
window.onload = affichework();


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

//recuperar o token k se encontra no localstorage
const tokenusers = localStorage.getItem("token");

const affichecategory = async (elt_category) => {
    const category = await filtrer();

    const creerdiv = document.createElement("article");
    creerdiv.classList.add("selectionfilters");
    if (tokenusers) {
        document.querySelector('.selectionfilters').style.display = "none";
    } else {
        const btn_all = document.createElement("button");
        btn_all.innerHTML = "Tous";
        btn_all.classList.add("filters");
        btn_all.dataset.category = "all";
        creerdiv.appendChild(btn_all);
        btn_all.setAttribute("data-name", "Tous");

        for (let i = 0; i < category.length; i++) {
            const btn = document.createElement("button");
            btn.innerHTML = category[i].name;
            creerdiv.appendChild(btn);
            btn.classList.add("filters");
            btn.dataset.category = "category" + category[i].id
            if (i === 1 || i === 2) {
                btn.classList.add("largeurfilter4");
            }
        }
        for (const button of creerdiv.children) {
            button.addEventListener('click', () => {
                afficheCategoryFiltres(button.dataset.category)
            })
        }
        gallery.insertAdjacentElement("beforebegin", creerdiv); //inserer cote a cote avant gallery
    }
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
}
else {
    const masque = document.querySelectorAll('.masque');
    masque.forEach(elementsmasque => {
        elementsmasque.style.display = "none"
    })
}