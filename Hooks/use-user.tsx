import { useState } from "react";

export default function UseUser() {
    const [username, setUsername] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [userIcon, setUserIcon] = useState<string>("");

    return { username, setUsername, userId, setUserId, userIcon, setUserIcon }
}