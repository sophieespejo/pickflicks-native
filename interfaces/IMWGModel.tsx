export default interface IMWGModel{
    Id:number,
    MWGName:string,
    GroupCreatorId:number,
    MembersId:string,
    MembersNames:string,
    MembersIcons: string,
    suggestedMovieNames: string,
    suggestedMovieGenres: string,
    ChosenGenres:string,
    StreamingService:string,
    FinalGenre:string,
    FinalMovieIndex:number,
    IsDeleted:boolean
}