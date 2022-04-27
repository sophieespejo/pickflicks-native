import ICreateAccountDTO from "../interfaces/ICreateAccountDTO";
import ILoginDTO from "../interfaces/ILoginDTO";
import IMWGModel from "../interfaces/IMWGModel";
import IGenreRankingModel from '../interfaces/IGenreRankingModel'

let url = 'https://pickflicksapi.azurewebsites.net'

async function AddUser(newUserData: ICreateAccountDTO){
    let res= await fetch(`${url}/User/AddUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserData)
    });
    let data = await res.json();
   return data;
}

async function Login(userData: ILoginDTO){
    let res= await fetch(`${url}/User/Login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
    let data = await res.json();
   return data;
}

async function GetUserByUsername(username:string){
    let res = await fetch('https://pickflicksapi.azurewebsites.net/User/GetUserByUsername/' + (username));
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    return data;
}

async function GetAllMWGAUserIsMemberOfuserId(userId:number){
    let res = await fetch('https://pickflicksapi.azurewebsites.net/MWG/GetAllMWGAUserIsMemberOf/' + (userId));
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    return data;
}
async function GetMWGById(MWGId:number){
    let res = await fetch('https://pickflicksapi.azurewebsites.net/MWG/GetMWGById/' + (MWGId));
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    return data;
}

async function AddFavoriteMWG(userId:number, MWGId:number){
    let res= await fetch(`${url}/User/AddFavoriteMWG/${userId}/${MWGId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(null)
    });
    let data = await res.json();
   return data;
}

async function RemoveFavoriteMWG(userId:number, MWGId:number){
    let res= await fetch(`${url}/User/RemoveFavoriteMWG/${userId}/${MWGId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(null)
    });
    let data = await res.json();
   return data;
}

async function AddMWG(newMWG: IMWGModel){
    let res= await fetch('https://pickflicksapi.azurewebsites.net/MWG/AddMWG', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMWG)
    });
    let data = await res.json();
   return data;
}

async function AddChosenGenres(MWGId:number, chosenGenres:string){
    let res= await fetch(`${url}/mwg/AddChosenGenres/${MWGId}/${chosenGenres}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(null)
    });
    let data = await res.json();
   return data;
}

async function AddGenreRankingModel(newGenreRanking: IGenreRankingModel ){
    let res= await fetch(`${url}/GenreRanking/AddGenreRankings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGenreRanking)
    });
    let data = await res.json();
   return data;
}


export { AddUser, Login, GetMWGById, AddGenreRankingModel, GetUserByUsername, GetAllMWGAUserIsMemberOfuserId, AddFavoriteMWG, RemoveFavoriteMWG, AddMWG, AddChosenGenres};;