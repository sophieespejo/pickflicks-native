export default interface IMWGModel{
    Id:number,
    MWGName:string,
    GroupCreatorId:number,
    MembersId:string,
    MembersNames:string,
    MembersIcons: string,
    UserSuggestedMovies:string,
    ChosenGenres:string,
    StreamingService:string,
    IsDeleted:boolean
}