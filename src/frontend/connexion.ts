let tagForm:HTMLFormElement=document.getElementById("form-sign-up") as HTMLFormElement;

tagForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("formulaire soumis");
    console.dir(tagForm);
    const firstElementChild=tagForm.firstElementChild as HTMLFormElement;
    let userData=firstElementChild.elements;
    const user={}
    Array.from(userData).forEach(element => {
        let input=element as HTMLFormElement
        if(input.value!="S'inscrire"){
            console.log(input.value, input.id);
            user[input.id]=input.value;
        }
    });
    
    console.log("user: ",user)
    if(localStorage.getItem("admins")){
        user["islogin"]=true;
        let admins=JSON.parse(localStorage.getItem("admins"));
        admins.push(user); console.log(admins)
        localStorage.setItem("admins",JSON.stringify(admins));
        localStorage.setItem("adminLogin",JSON.stringify(user));
        //redirection
        location.href="./recettes-cuisines.html";

    }
    else{
        user["islogin"]=true;
        let admin=[user];
        localStorage.setItem("admins",JSON.stringify(admin));
        let adminLogin=user;
        localStorage.setItem("adminLogin",JSON.stringify(adminLogin));
        //redirection
        location.href="./recettes-cuisines.html";
    }
})