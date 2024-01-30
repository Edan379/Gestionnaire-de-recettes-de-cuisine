if (localStorage.getItem("adminLogin")) {
    console.log("connecté");
}
else {
    location.href = "./connexion.html";
}
