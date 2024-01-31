let tagForm:HTMLFormElement=document.getElementById("form-sign-up") as HTMLFormElement;

// event listener on sign up register (user new) 
tagForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("formulaire soumis");
    console.dir(tagForm);
    const firstElementChild=tagForm.firstElementChild as HTMLFormElement;
    let userData=firstElementChild.elements;

    interface user {
        firstname:string;
        lastname:string;
        email:string;
        password:string;
        pwdConfirmed:string;
    }

    let user: user = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        pwdConfirmed: ""
    };

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
        let adminLogin={};
        adminLogin["email"]=user.email;
        adminLogin["password"]=user.password;
        adminLogin["isLogin"]=true;
        localStorage.setItem("adminLogin",JSON.stringify(adminLogin));
        //redirection
        location.href="./recettes-cuisines.html";

    }
    else{
        user["islogin"]=true;
        let admin=[user]; console.log(admin)
        localStorage.setItem("admins",JSON.stringify(admin));
        let adminLogin={};
        adminLogin["email"]=user.email;
        adminLogin["password"]=user.password;
        adminLogin["isLogin"]=true;
        localStorage.setItem("adminLogin",JSON.stringify(adminLogin));
        //redirection
        location.href="./recettes-cuisines.html";
    }
})

// event listener on member register
let tagRegister:HTMLFormElement=document.getElementById("form-login") as HTMLFormElement;

tagRegister.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("formulaire de membre soumis");
    let tagFailed: HTMLFormElement=document.getElementById("failed") as HTMLFormElement;
    if(tagFailed){
        tagFailed.remove();
    }

    const firstElementChild=tagRegister.firstElementChild as HTMLFormElement;
    let memberData=firstElementChild.elements; console.log("memberData: ",memberData);
    
    //typer memberInfos
    interface memberInfos {
        memberEmail: string;
        memberPwd: string;
    }

    let memberInfos:memberInfos={
        memberEmail:"",
        memberPwd:"" 
    };

    Array.from(memberData).forEach(element => {
        let input=element as HTMLFormElement
        if(input.type!="submit"){
            console.log(input.value, input.id);
            memberInfos[input.id]=input.value;
        }
    });console.log("memberInfos: ",memberInfos);

    if(localStorage.getItem("admins")){
        let admins=JSON.parse(localStorage.getItem("admins")); console.log("admins ",admins);

        //typer authenticMember
        interface authenticMember {
           email:string;
           password:string;
           islogin?:boolean;
        }

        //comparate memberInfos with admins
        let authenticMember:authenticMember[]=admins.filter((admin:authenticMember)=>{return admin.email===memberInfos.memberEmail && admin.password===memberInfos.memberPwd})
        if (authenticMember.length!=0){// authenticated member
            console.log("authenticMember: ",authenticMember);
            authenticMember[0].islogin=true; console.log(authenticMember)
            localStorage.setItem("adminLogin",JSON.stringify(authenticMember[0]));
            //redirection
            location.href="./recettes-cuisines.html";
        }
        else{//show an alert
            let tagPNotAuthen=document.createElement("p");
            tagPNotAuthen.textContent="L'authentification n'a pas réussie!";
            tagPNotAuthen.id="failed";
            let tagBody:HTMLFormElement=document.getElementById("body") as HTMLFormElement;
            tagBody.appendChild(tagPNotAuthen);
        }
    }
})