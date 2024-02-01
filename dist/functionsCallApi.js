import {useApi} from "./useApi.js";

const api=useApi();

let getListRecipes=async()=>{console.log("ici")
    try{
        let {data}= await api.get("?type=public&q=poulet&app_id=c1673f10&app_key=1f13882d40bd168e4770bde11bcea0a7");
        return data.hits;
    }
    catch(error){
        console.log("il y a une erreur ", error);
    }
}

export {getListRecipes};