import { useState } from "react";

export default function UseUser() {
    const [username, setUsername] = useState<string>("");
    const [userId, setUserId] = useState<number>(0);
    const [userIcon, setUserIcon] = useState<string>("");
    const [MWGname, setMWGname] = useState<string>("");
    const [MWGId, setMWGId] = useState<number>(0);
    const [MWGgenres, setMWGgenres] = useState<any>([]);

    return { username, setUsername, userId, setUserId, userIcon, setUserIcon, MWGname, setMWGname, MWGId, setMWGId, MWGgenres, setMWGgenres }
}