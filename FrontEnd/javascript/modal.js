/*
para selecionar todos os elementos, 
metodo foreach -para cada um dos elementos vamos escutar o clic, 
entre parenteses eu vou selecionar cada lien
para cada lien vou juntar 1event e quando vamos clicar no lien vamos chamar uma funcao k vai se xamar openmodal
depois criar a funcao numa constante, é a funcao k vai ter os parametros do evento

*/
//import {} from "./composants/galery.js";
letmodal = null

const openModal = function (e) {
    e.preventDefault()
    document.getElementById('modal').style.display = "block";
    const modal = document.querySelector(e.modal.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute ('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal = modal
    modal.addEventListener('click', closeModal)
    modal.querySelector('.jsclosemodal').addEventListener('click', closeModal)

}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    document.getElementById('modal').style.display = "none";
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.jsclosemodal').removeEventListener('click', closeModal)
    modal = null
}

document.querySelectorAll('jsmodal').forEach(a => {
    a.addEventListener('click', openModal)
}) 