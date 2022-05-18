import { useState } from "react";

export default function UseUser() {
    const [device, setDevice] = useState('');
    const [username, setUsername] = useState<string>("");
    const [userId, setUserId] = useState<number>(0);
    const [userIcon, setUserIcon] = useState<string>("");
    const [MWGname, setMWGname] = useState<string>("");
    const [newMWGname, setnewMWGname] = useState<string>("");
    const [MWGId, setMWGId] = useState<number>(0);
    const [allMWG, setAllMWG] = useState<any>([]);
    const [MWGgenres, setMWGgenres] = useState<any>([]);
    const [MWGmembersId, setMWGmembersId] = useState<string>("");
    const [genre1, setGenre1] = useState<number>(0);
    const [genre2, setGenre2] = useState<number>(0);
    const [genre3, setGenre3] = useState<number>(0);
    const [genreId, setGenreId] = useState<number>(0);
    const [genreName, setGenreName] = useState<string>("");
    const [streamingServiceId, setStreamingServiceId] = useState<number>(0);
    const [listOfMovieNamesUsedToCompare1, setListOfMovieNamesUsedToCompare1] = useState<any>([]);
    const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
    const [userIsReadyForGenres, setUserIsReadyForGenres] = useState<boolean>(false);
    const [userIsReadyForSwipes, setUserIsReadyForSwipes] = useState<boolean>(false);
    const [userIsReadyToSeeFinalMovie, setUserIsReadyToSeeFinalMovie] = useState<boolean>(false);
    const [userIsWaiting, setUserIsWaiting] = useState<boolean>(false);
    const [invitationMWG, setInvitationMWG] = useState<Array<any>>([]);


    const [token, setToken] = useState<any>("");


    return { invitationMWG, setInvitationMWG, device, setDevice, token, setToken, username, setUsername, genreName, setGenreName, streamingServiceId, setStreamingServiceId,genreId, setGenreId, allMWG, setAllMWG, newMWGname, setnewMWGname, userId, setUserId, userIcon, setUserIcon, MWGname, setMWGname, MWGId, setMWGId, MWGgenres, setMWGgenres, MWGmembersId, setMWGmembersId, genre1, setGenre1, genre2, setGenre2, genre3, setGenre3, listOfMovieNamesUsedToCompare1, setListOfMovieNamesUsedToCompare1, userIsAdmin, setUserIsAdmin, userIsReadyForGenres, setUserIsReadyForGenres, userIsReadyForSwipes, setUserIsReadyForSwipes, userIsReadyToSeeFinalMovie, setUserIsReadyToSeeFinalMovie, userIsWaiting, setUserIsWaiting}
}