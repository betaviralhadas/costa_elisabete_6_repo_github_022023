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

const openModal = function (e) {
    //e.preventDefault()
    document.querySelector(".photos").innerHTML = '';
    document.getElementById('modal').style.display = "block";
    afficheworkmodal();
}

const closeModal = function (e) {
    //e.preventDefault()
    document.getElementById('modal').style.display = "none";
}
document.querySelector('.jsclosemodal').addEventListener('click', closeModal);

document.querySelectorAll('.masque').forEach(a => {
    a.addEventListener('click', openModal)
})

const openModal2 = function (e) {
    e.preventDefault()
    closeModal();
    document.getElementById('modal2').style.display = "block";
}
document.querySelector('.btnaddphoto').addEventListener('click', openModal2);

const closeModal2 = function (e) {
    e.preventDefault()
    document.getElementById('modal2').style.display = "none";
    openModal();
}
document.querySelector('.jsclosemodal2').addEventListener('click', closeModal2);

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

const modal1 = document.getElementById("modal")
//fermer en cliquant n'importe ou
window.addEventListener("click", (e) => {
    if (e.target === modal1) {
        closeModal();
    }
    console.log("fechar");
});

const gallerymodal = document.querySelector(".photos");
const afficheworkmodal = async () => {
    const work = await galeriemodal();

    for (let i = 0; i < work.length; i++) {
        let figure = document.createElement("figure");//crear a tag figure
        gallerymodal.appendChild(figure);//o parente gallery xama o filho figure
        figure.classList.add("category" + work[i].category.id);
        figure.classList.add("all");
        figure.classList.add("modal_cart");
        let image = document.createElement("img");
        figure.appendChild(image);
        image.src = work[i].imageUrl; //fui buscar o valor imageurl ao ficheiro workmodel do back
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
            figcaption.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right"></i> <i class = "fa-solid fa-trash-can"></i>`;
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

const iconArrowLeft = document.querySelector(".iconArrowLeft");

iconArrowLeft.addEventListener("click", function () {
    openModal()
})

const inputFile = document.querySelector("#fileInput");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "+ Ajouter photo";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
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
            //errorText.innerHTML = ""
        } else if (res.status === 401) {
            let errorText = document.querySelector(".errorFile")
            errorText.innerHTML = "Action non autorisée !"
            //errorText.innerHTML = ""
        } else if (res.status === 500) {
            let errorText = document.querySelector(".errorFile")
            errorText.innerHTML = "Veuillez ajouter une photo"
            //errorText.innerHTML = "."
        }
    }).then(function (data) {
        if (data === 'created') {
            document.querySelector(".photos").innerHTML = '';
            document.querySelector(".gallery").innerHTML = "";
            openModal()
            //afficheworkmodal()
            affichework()

        }
    })
})
//meter o logout e tirar os filtros
if (tokenuser) {
    document.querySelector('.logout').style.display = "block";
    document.querySelector(".login").style.display = "none";

}

document.querySelector('.logout').addEventListener('click', () => {
    localStorage.clear();//limpar
    document.location.href = "./index.html"
})