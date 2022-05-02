import { useState } from "react";

export default function UseUser() {
    const [username, setUsername] = useState<string>("");
    const [userId, setUserId] = useState<number>(0);
    const [userIcon, setUserIcon] = useState<string>("");
    const [MWGname, setMWGname] = useState<string>("");
    const [MWGId, setMWGId] = useState<number>(0);
    const [MWGgenres, setMWGgenres] = useState<any>([]);
    const [MWGmembersId, setMWGmembersId] = useState<string>("");
    const [genre1, setGenre1] = useState<number>(0);
    const [genre2, setGenre2] = useState<number>(0);
    const [genre3, setGenre3] = useState<number>(0);

    const [token, setToken] = useState<any>("");


    return { token, setToken, username, setUsername, userId, setUserId, userIcon, setUserIcon, MWGname, setMWGname, MWGId, setMWGId, MWGgenres, setMWGgenres, MWGmembersId, setMWGmembersId, genre1, setGenre1, genre2, setGenre2, genre3, setGenre3}
}