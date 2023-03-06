const form = document.querySelector(".form")
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value

    const data = {
        email: email,
        password: password
    }

    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else if (res.status === 404) {
            let errorText = document.querySelector("#error")
            errorText.innerHTML = "Utilisateur inconnu !"
        } else if (res.status === 401) {
            let errorText = document.querySelector("#error")
            errorText.innerHTML = "Non autorisé !"
        }
    }).then(res => {
        if (res?.token) {
            localStorage.setItem("token", res.token)
            document.location.href = "./index.html"
        }
    })
})