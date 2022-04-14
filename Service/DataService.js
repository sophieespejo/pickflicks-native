let url = 'https://pickflicksapi.azurewebsites.net'

async function AddUser(newUserData){
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

async function Login(userData){
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

async function GetUserByUsername(username){
    let res = await fetch('https://pickflicksapi.azurewebsites.net/User/GetUserByUsername/' + (username));
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    return data;
}

async function GetAllMWGAUserIsMemberOfuserId(userId){
    let res = await fetch('https://pickflicksapi.azurewebsites.net/MWG/GetAllMWGAUserIsMemberOf/' + (userId));
    if(!res.ok)
    {
        const message = `An error has occured ${res.status}`
        throw new Error(message);
    }
    let data = await res.json();
    return data;
}

async function AddFavoriteMWG(userId, MWGId){
    let res= await fetch(`${url}/User/AddFavoriteMWG/${userId}/${MWGId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify()
    });
    let data = await res.json();
   return data;
}

async function RemoveFavoriteMWG(userId, MWGId){
    let res= await fetch(`${url}/User/RemoveFavoriteMWG/${userId}/${MWGId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify()
    });
    let data = await res.json();
   return data;
}

export { AddUser, Login, GetUserByUsername, GetAllMWGAUserIsMemberOfuserId, AddFavoriteMWG, RemoveFavoriteMWG};