/*retourner la list de la galerie fournie par l api*/
const galerie = async () => { 
    const listgalerie = await fetch("http://localhost:5678/api/works", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res)=> res.json());
    return listgalerie;
}
/*afficher les travaux sur la page d accueil*/
const affichework = async () => {
    const work = await galerie(); // xamei a funcao galerie
    for
}