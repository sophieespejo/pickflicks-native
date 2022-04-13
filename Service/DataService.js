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

export { AddUser, Login };