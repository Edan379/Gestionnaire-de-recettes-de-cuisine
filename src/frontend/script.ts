if(localStorage.getItem("adminLogin")){
    console.log("connecté");
}else{
    location.href="./connexion.html";    
}

document.addEventListener("DOMContentLoaded",()=>{
    //event listener on btn-disconnected
    let tagBtnDisconnected:HTMLFormElement=document.getElementById("btn-disconnected") as HTMLFormElement;
    tagBtnDisconnected.addEventListener("click",()=>{
        let adminLogin=JSON.parse(localStorage.getItem("adminLogin"));
        let admins=JSON.parse(localStorage.getItem("admins"));
        interface admin {
            firstname:string;
            lastname:string;
            email:string;
            password:string;
            passwordConfirmed:string;
            isLogin:boolean;
        }
        console.log(adminLogin,admins)
        let adminIndex=admins.findIndex((admin:admin)=>{
            return  admin.email===adminLogin.email &&
                    admin.password===adminLogin.password
        });

        if(adminIndex!==-1){
            admins[adminIndex].islogin=false;
        } console.log(admins);
        localStorage.removeItem("adminLogin");
        location.href="./connexion.html";
    })
})