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
        figcaption.addEventListener('click', deleteImg.bind(this,work[i].id));
        
        if (i=== 0){
            figcaption.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right"></i> <i class = "fa-solid fa-trash-can"></i>`;
        }
    }
}

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

const tokenuser = localStorage.getItem("token");
//funcao para apagar as fotos
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


const modal1 = document.getElementById("modal")
//fermer en cliquant n'importe ou
window.addEventListener("click", (e) => {
    if (e.target == modal1) {
        closeModal();
    }
});
// funcao para adicionar uma foto no 2~modal
/*const addImg = async => {
    const listgalerie = await fetch("http://localhost:5678/api/works/post", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            
        }
    })
    .then((res) => res.json());
    return listgalerie;
}
*/

/*
const fileInput = document.querySelector("#fileInput");

const uploadFile = file => {
  console.log("Uploading file...");
  const API_ENDPOINT = "https://file.io";
  const request = new XMLHttpRequest();
  const formData = new FormData();

  request.open("POST", API_ENDPOINT, true);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
    }
  };
  formData.append("file", file);
  request.send(formData);
};

fileInput.addEventListener("change", event => {
  const files = event.target.files;
  uploadFile(files[0]);
});
*/



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


/*
const ajouterPhoto = async () => {
    const listgalerie = await fetch("http://localhost:5678/api/works/post", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => {
            if 
            }
            else {
                openModal();
                
            }
        });
    return listgalerie;
}
*/