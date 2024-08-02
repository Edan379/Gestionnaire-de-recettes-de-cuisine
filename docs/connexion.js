let tagForm = document.getElementById("form-sign-up");
// event listener on sign up register (user new) 
tagForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("formulaire soumis");
  console.dir(tagForm);
  const firstElementChild = tagForm.firstElementChild;
  let userData = firstElementChild.elements;
  let user = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    pwdConfirmed: ""
  };
  Array.from(userData).forEach(element => {
    let input = element;
    if (input.value != "S'inscrire") {
      console.log(input.value, input.id);
      user[input.id] = input.value;
    }
  });
  console.log("user: ", user);
  if (localStorage.getItem("admins")) {
    user["islogin"] = true;
    let admins = JSON.parse(localStorage.getItem("admins"));
    admins.push(user);
    console.log(admins);
    localStorage.setItem("admins", JSON.stringify(admins));
    let adminLogin = {};
    adminLogin["email"] = user.email;
    adminLogin["password"] = user.password;
    adminLogin["isLogin"] = true;
    localStorage.setItem("adminLogin", JSON.stringify(adminLogin));
    //redirection
    location.href = "./recettes-cuisines.html";
  }
  else {
    user["islogin"] = true;
    let admin = [user];
    console.log(admin);
    localStorage.setItem("admins", JSON.stringify(admin));
    let adminLogin = {};
    adminLogin["email"] = user.email;
    adminLogin["password"] = user.password;
    adminLogin["isLogin"] = true;
    localStorage.setItem("adminLogin", JSON.stringify(adminLogin));
    //redirection
    location.href = "./recettes-cuisines.html";
  }
});
// event listener on member register
let tagRegister = document.getElementById("form-login");
tagRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("formulaire de membre soumis");
  let tagFailed = document.getElementById("failed");
  if (tagFailed) {
    tagFailed.remove();
  }
  const firstElementChild = tagRegister.firstElementChild;
  let memberData = firstElementChild.elements;
  console.log("memberData: ", memberData);
  let memberInfos = {
    email: "",
    password: "",
  };
  Array.from(memberData).forEach(element => {
    let input = element;
    if (input.type != "submit") {
      console.log(input.value, input.id);
      memberInfos[input.className] = input.value;
    }
  });
  console.log("memberInfos: ", memberInfos);
  if (localStorage.getItem("admins")) {
    let admins = JSON.parse(localStorage.getItem("admins"));
    console.log("admins ", admins);
    //comparate memberInfos with admins
    let memberIndex = admins.findIndex((admin) => { return admin.email === memberInfos.email && admin.password === memberInfos.password; });
    if (memberIndex !== -1) { // authenticated member
      console.log("memberIndex: ", memberIndex);
      admins[memberIndex].islogin = true;
      console.log(admins);
      localStorage.setItem("admins", JSON.stringify(admins));
      memberInfos.isLogin = true;
      localStorage.setItem("adminLogin", JSON.stringify(memberInfos));
      //redirection
      location.href = "./recettes-cuisines.html";
    }
    else { //show an alert
      let tagPNotAuthen = document.createElement("p");
      tagPNotAuthen.textContent = "L'authentification n'a pas réussie!";
      tagPNotAuthen.id = "failed";
      let tagBody = document.getElementById("body");
      tagBody.appendChild(tagPNotAuthen);
    }
  }
});
