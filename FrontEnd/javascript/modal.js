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

//abrir 1ºmodal
const openModal = function (e) {
    document.querySelector(".photos").innerHTML = '';
    document.getElementById('modal').style.display = "block";
    afficheworkmodal();
}

//fechar 1ºmodal
const closeModal = function (e) {
    document.getElementById('modal').style.display = "none";
}
document.querySelector('.jsclosemodal').addEventListener('click', closeModal);

//abrir modal ao clicar em modificar
document.querySelectorAll('.masque').forEach(a => {
    a.addEventListener('click', openModal)
})

//abrir o 2ºmodal
const openModal2 = function (e) {
    e.preventDefault()
    closeModal();
    document.getElementById('modal2').style.display = "block";
}
document.querySelector('.btnaddphoto').addEventListener('click', openModal2);

//fechar 2ºmodal
const closeModal2 = function (e) {
    e.preventDefault()
    document.getElementById('modal2').style.display = "none";
    openModal();
}
document.querySelector('.jsclosemodal2').addEventListener('click', closeModal2);

//fechar 1ºmodal com a tecla esc
window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

const modal1 = document.getElementById("modal")
//fechar o 1ºmodal clicando em klk sitio
window.addEventListener("click", (e) => {
    if (e.target === modal1) {
        closeModal();
    }
    console.log("fechar");
});

//funçao p/mostrar os trabalhos no 1ºmodal
const gallerymodal = document.querySelector(".photos");
const afficheworkmodal = async () => {
    const work = await galeriemodal();

    for (let i = 0; i < work.length; i++) {
        let figure = document.createElement("figure");
        gallerymodal.appendChild(figure);
        figure.classList.add("category" + work[i].category.id);
        figure.classList.add("all");
        figure.classList.add("modal_cart");
        let image = document.createElement("img");
        figure.appendChild(image);
        image.src = work[i].imageUrl;
        let editer = document.createElement("p");
        figure.appendChild(editer);
        editer.innerHTML = "éditer";
        editer.classList.add("editer");
        let figcaption = document.createElement("figcaption");
        figure.appendChild(figcaption);
        figcaption.classList.add("icons");
        figcaption.innerHTML = `<i class = "fa-solid fa-trash-can"></i>`;
        figcaption.addEventListener('click', deleteImg.bind(this, work[i].id));

        if (i === 0) {
            figcaption.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right iconarrow"></i> <i class = "fa-solid fa-trash-can icontrash"></i>`;

        }
    }
}

//recuperar o token k se encontra no localstorage
const tokenuser = localStorage.getItem("token");

//funcao para apagar as fotos
const deleteImg = async (id) => {
    const listgalerie = await fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenuser}`
        }
    })
        .then((res) => {
            if (res.status === 400 || res.status === 404) {
                console.log("nao esta autorizado");
            }
            else {
                document.querySelector(".photos").innerHTML = '';
                document.querySelector(".gallery").innerHTML = "";
                afficheworkmodal()
                affichework()

            }
        });
    return listgalerie;
}

//clicar na seta do 2ºmodal volta ao 1ºmodal
const iconArrowLeft = document.querySelector(".iconArrowLeft");

iconArrowLeft.addEventListener("click", function () {
    openModal()
})


const inputFile = document.querySelector("#fileInput");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "+ Ajouter photo";
pictureImage.innerHTML = pictureImageTxt;
//funcao p/mostrar a img carregada no formulario
inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];//recuperei a imagem

    if (file) {//se a imagem existe
        const reader = new FileReader();

        reader.addEventListener("load", function (e) {
            const readerTarget = e.target;

            const img = document.createElement("img");
            img.src = readerTarget.result;
            img.classList.add("picture__img");

            pictureImage.innerHTML = "";
            pictureImage.appendChild(img);
        });

        reader.readAsDataURL(file);
    } else {
        pictureImage.innerHTML = pictureImageTxt;
    }
});

//adicionar os trblhs no site
const modalForm = document.querySelector(".formmodal2");
modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = new FormData(modalForm)

    fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenuser}`
        },
        body: form
    }).then(res => {
        if (res.ok) {
            return 'created'
        } else if (res.status === 400) {
            let errorText = document.querySelector(".errorFile")
            errorText.innerHTML = "action impossible !"

        } else if (res.status === 401) {
            let errorText = document.querySelector(".errorFile")
            errorText.innerHTML = "Action non autorisée !"

        } else if (res.status === 500) {
            let errorText = document.querySelector(".errorFile")
            errorText.innerHTML = "Veuillez ajouter une photo"
        }
    }).then(function (data) {
        if (data === 'created') {
            document.querySelector(".photos").innerHTML = '';
            document.querySelector(".gallery").innerHTML = "";
            openModal()
            affichework()

        }
    })
})
//mostrar o botao logout 
if (tokenuser) {
    document.querySelector('.logout').style.display = "block";
    document.querySelector(".login").style.display = "none";

}

//ao fazer logout, limpa tudo o k ta no localstorage
document.querySelector('.logout').addEventListener('click', () => {
    localStorage.clear();
    document.location.href = "./index.html"
})