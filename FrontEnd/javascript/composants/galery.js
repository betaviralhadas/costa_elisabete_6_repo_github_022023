/*retourner la list de la galerie fournie par l api*/
const galerie = async () => {  //funcao
    const listgalerie = await fetch("http://localhost:5678/api/works", { //fetch interage com a api
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res)=> res.json()); //then é 1promessa
    return listgalerie; //retourne la list des travaux a la fin
}
/*afficher les travaux sur la page d accueil*/
const affichework = async () => {
    const work = await galerie(); // xamei a funcao galerie, await attend la reponse d la list des travaux
    const gallery = document.querySelector(".gallery");
    for(let i=0; i<work.length;i++){
       let figure = document.createElement("figure");//crear a tag figure
       gallery.appendChild(figure);//o parente gallery xama o filho figure
       let image = document.createElement("img");
       figure.appendChild(image);
       image.src = work[i].imageUrl; //fui buscar o valor imageurl ao ficheiro workmodel do back
       let figcaption = document.createElement("figcaption"); //o k ta no parenteses é a tag do html
       figure.appendChild(figcaption);
       figcaption.innerText = work[i].title;
    }
}
window.onload = affichework();//desde k o site e aberto ele executa a funcao affichework (para mostrar as imgs e texto)

const filtre = async () => {

}