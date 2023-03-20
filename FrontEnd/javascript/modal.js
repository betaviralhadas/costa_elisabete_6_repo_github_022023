//funcao para xamar a galeria
const galeriemodal = async () => {
    const listgalerie = await fetch("http://localhost:5678/api/works", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json());
    return listgalerie;
}

//funcao para abrir o 1ºmodal
const openModal = function (e) {
    e.preventDefault()
    document.getElementById('modal').style.display = "block";
    afficheworkmodal(); 
}

//funcao para fechar o 1ºmodal
const closeModal = function (e) {
    e.preventDefault()
    document.getElementById('modal').style.display = "none";
}
document.querySelector('.jsclosemodal').addEventListener('click', closeModal);

//abrir o modal
document.querySelectorAll('.masque').forEach(a => {
    a.addEventListener('click', openModal)
}) 

//funcao para abrir o 2ºmodal
const openModal2 = function (e) {
    e.preventDefault()
    document.getElementById('modal2').style.display = "block";
}
document.querySelector('.btnaddphoto').addEventListener('click', openModal2);// ao clicar no botao ajouter1photo abre o 2ºmodal

//funcao para fechar o 2ºmodal
const closeModal2 = function (e) {
    e.preventDefault()
    document.getElementById('modal2').style.display = "none";
}
document.querySelector('.jsclosemodal2').addEventListener('click', closeModal2);


const gallerymodal = document.querySelector(".photos");
/*afficher les travaux sur le modal*/
const afficheworkmodal = async () => {
    const work = await galeriemodal(); // xamei a funcao galerie, await attend la reponse d la list des travaux

    for (let i = 0; i < work.length; i++) {
        let figure = document.createElement("figure");//crear a tag figure
        gallerymodal.appendChild(figure);//o parente gallery xama o filho figure
        let image = document.createElement("img");
        figure.appendChild(image);
        image.src = work[i].imageUrl; //fui buscar o valor imageurl ao ficheiro workmodel do back
        let editer = document.createElement("p");
        figure.appendChild(editer);
        editer.innerHTML = "éditer";
        let figcaption = document.createElement("figcaption");
        figure.appendChild(figcaption);
        figcaption.innerHTML = `<i class = "fa-solid fa-trash-can"></i>`;
        figcaption.addEventListener('click', deleteImg.bind(this,work[i].id));
        //let icon = document.createElement("i");
        //figure.appendChild(icon);
        figure.classList.add("category" + work[i].category.id);
        figure.classList.add("all");
        editer.classList.add("editer");

        //icon.classList.add("fa-solid fa-trash-can");
        if (i=== 0){
            figcaption.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right"></i> <i class = "fa-solid fa-trash-can"></i>`;
        }
    }
}

const tokenuser = localStorage.getItem("token");

const deleteImg = async (id) => {
    const listgalerie = await fetch("http://localhost:5678/api/works/{id}", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenuser}`
        }
    })
        .then((res) => {
            if (res.status === 400 || res.status === 404){
                console.log("nao esta autorizado");
            }
            else {
                openModal();
                
            }
        });
    return listgalerie;
}
/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
para selecionar todos os elementos, 
metodo foreach -para cada um dos elementos vamos escutar o clic, 
entre parenteses eu vou selecionar cada lien
para cada lien vou juntar 1event e quando vamos clicar no lien vamos chamar uma funcao k vai se xamar openmodal
depois criar a funcao numa constante, é a funcao k vai ter os parametros do evento
/* const modal = document.querySelector(e.modal.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute ('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal = modal
    modal.addEventListener('click', closeModal)
    modal.querySelector('.jsclosemodal').addEventListener('click', closeModal)
*/