import { useState } from "react";
import IUserContext from '../interfaces/IUserContext'

export default function UseUser() {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [userIcon, setUserIcon] = useState("");

    return { username, setUsername, userId, setUserId, userIcon, setUserIcon }
}