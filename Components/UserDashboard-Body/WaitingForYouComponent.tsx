import { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image,Pressable} from "react-native";
import emptyHeart from "../../assets/emptyHeart.png";
import filledHeart from "../../assets/filledHeart.png";
import { GetUserByUsername, AddFavoriteMWG, RemoveFavoriteMWG, GetMWGStatusByUserId } from '../../Service/DataService'
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../Context/UserContext';



const WaitingForYouComponent: FC = () => {
  let { displayObject, username, userId, setUserId, allMWG, setAllMWG, setMWGname, setMWGId, setUserIsAdmin, setUserIsReadyForGenres,  setUserIsReadyForSwipes,  setUserIsReadyToSeeFinalMovie } = useContext(UserContext)

  const [allFaveMWG, setAllFaveMWG] = useState<any>([]);
  const [noFave, setNoFave] = useState<boolean>(false);

  const navigation = useNavigation<any>();
  
  useEffect(  () => {
      async function fetchUserData() {
            setUserId(userId)
          
      let response = await GetUserByUsername(username);
      let favoritedMWGArray = response.favoritedMWGId.split(',');

      for (var i of favoritedMWGArray) {
        allFaveMWG.push(parseInt(i));
      }
      setAllFaveMWG([...allFaveMWG]);

      if(response != null)
        {
          let userMWG = await GetMWGStatusByUserId(response.id);
          setAllMWG(userMWG);
        }
      }
      fetchUserData();
    },
   []);

    const handleAddFavoriteMWG = async (groupId:number) =>{
      let result = await AddFavoriteMWG(userId,groupId);
      let userData = await GetUserByUsername(username);
      allFaveMWG.push(groupId);
      setAllFaveMWG([...allFaveMWG]);
      if(userData != null)
        {
          let userMWG = await GetMWGStatusByUserId(userData.id);
          setAllMWG(userMWG);
        }
    }

    const handleRemoveFavoriteMWG = async (groupId:number) =>{
      let result = await RemoveFavoriteMWG(userId,groupId);
      let userData = await GetUserByUsername(username);
      let indexGroupId = allFaveMWG.indexOf(groupId);
      allFaveMWG.splice(indexGroupId,1);
      setAllFaveMWG([...allFaveMWG]);
      if(userData != null)
        {
          let userMWG = await GetMWGStatusByUserId(userData.id);
          setAllMWG(userMWG);
        }
    }

    const handlePress = (MWGname:string, MWGId:number, whatIsUser:string) => {
      setMWGname(MWGname);
      setMWGId(MWGId);
      switch(whatIsUser)
      {
        case 'userIsAdmin':
          setUserIsAdmin(true);
          break;
        case 'userIsReadyForGenres':
          setUserIsReadyForGenres(true);
          break;
        case 'userIsReadyForSwipes':
          setUserIsReadyForSwipes(true);
          break;
        case 'userIsReadyToSeeFinalMovie':
          setUserIsReadyToSeeFinalMovie(true);
            break;
        default:
          break;
      }
      navigation.navigate('MWGDashboard');
    }




  
  return (

    <View style={{ flex:1, alignItems:'center', backgroundColor: '#1E1A1A'}}>
      {noFave ? <Text> NO GROUPS </Text> : null}
      
    {
      allMWG.map((group:any, i:number) => 
      
      { 
        if(allFaveMWG.includes(parseInt(group.mwgId)) && !group.isDeleted && group.isStarted == false && group.groupCreatorId == userId)
        {
          return (
            <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId, 'userIsAdmin')}>
            <View >
              <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                <Text
                 style={{
                   color: "#FFFFFF",
                   fontSize: 28,
                   fontWeight: 'bold',
                   fontFamily:'Raleway_400Regular', 
                   marginBottom: 0,
                 }}
                 >
                 {group.mwgName}
               </Text>
             </View>
             <View>
               <Text
                 style={{
                   paddingTop:'2%',
                   color: "#FFFFFF",
                   fontSize: 20,
                   justifyContent: "center",
                   textAlign: "center",
                   fontFamily:'Raleway_400Regular', 
                   marginBottom: '10%'
                 }}
               >
                 {group.membersNames.split(",").map((member:string, i:number) => i != group.membersNames.split(",").length-1 ? member + ', ' : member)}
               </Text>
             </View>
             <View>
               <Text
                 style={{
                   color: "#FFFFFF",
                   fontSize: 20,
                   justifyContent: "center",
                   textAlign: "center",
                   fontFamily:'Raleway_400Regular', 
                   marginBottom: '7%'
                 }}
               >
                 Waiting for you to start
               </Text>
             </View>
         </View>
         <Pressable style={styles.heart} onPress={()=>handleRemoveFavoriteMWG(group.mwgId)}>
           <Image  source={filledHeart} ></Image>
         </Pressable>
            </Pressable>
          )
        }
        if(allFaveMWG.includes(parseInt(group.mwgId)) && !group.isDeleted && group.isStarted == true)
        {
          if(group.userDoneWithGenreRankings == false && group.areAllMembersDoneWithGenre == false)
          {
            return (
              <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId, 'userIsReadyForGenres')}>
              <View >
                <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                  <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 28,
                     fontWeight: 'bold',
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: 0,
                   }}
                   >
                   {group.mwgName}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     paddingTop:'2%',
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '10%'
                   }}
                 >
                   {group.membersNames.split(",").map((member:string, i:number) => i != group.membersNames.split(",").length-1 ? member + ', ' : member)}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '7%'
                   }}
                 >
                   Your turn to rank genres
                 </Text>
               </View>
           </View>
           <Pressable style={styles.heart} onPress={()=>handleRemoveFavoriteMWG(group.mwgId)}>
             <Image  source={filledHeart} ></Image>
           </Pressable>
              </Pressable>
            )
          }
          if(group.areAllMembersDoneWithGenre == true && group.userDoneWithSwipes == false && group.areAllMembersDoneWithSwipes == false)
          {
            return (
              <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId, 'userIsReadyForSwipes')}>
              <View >
                <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                  <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 28,
                     fontWeight: 'bold',
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: 0,
                   }}
                   >
                   {group.mwgName}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     paddingTop:'2%',
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '10%'
                   }}
                 >
                   {group.membersNames.split(",").map((member:string, i:number) => i != group.membersNames.split(",").length-1 ? member + ', ' : member)}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '7%'
                   }}
                 >
                   Your turn to swipe through movies
                 </Text>
               </View>
           </View>
           <Pressable style={styles.heart} onPress={()=>handleRemoveFavoriteMWG(group.mwgId)}>
             <Image  source={filledHeart} ></Image>
           </Pressable>
         </Pressable>
            )
          }
          if(group.areAllMembersDoneWithGenre == true && group.areAllMembersDoneWithSwipes == true)
          {
            return (
              <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId, 'userIsReadyToSeeFinalMovie')}>
              <View >
                <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                  <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 28,
                     fontWeight: 'bold',
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: 0,
                   }}
                   >
                   {group.mwgName}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     paddingTop:'2%',
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '10%'
                   }}
                 >
                   {group.membersNames}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '7%'
                   }}
                 >
                   {displayObject.movieName} was selected!
                 </Text>
               </View>
           </View>
           <Pressable style={styles.heart} onPress={()=>handleRemoveFavoriteMWG(group.mwgId)}>
             <Image  source={filledHeart} ></Image>
           </Pressable>
         </Pressable>
            )
          }
        }



    }
    )

    
    }
    {
      allMWG.map((group:any, i:number) => {
        if(!allFaveMWG.includes(parseInt(group.mwgId)) && !group.isDeleted && group.isStarted == false && group.groupCreatorId == userId)
        {
          return (
            <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId, 'userIsAdmin')}>
            <View >
              <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                <Text
                 style={{
                   color: "#FFFFFF",
                   fontSize: 28,
                   fontWeight: 'bold',
                   fontFamily:'Raleway_400Regular', 
                   marginBottom: 0,
                 }}
                 >
                 {group.mwgName}
               </Text>
             </View>
             <View>
               <Text
                 style={{
                   paddingTop:'2%',
                   color: "#FFFFFF",
                   fontSize: 20,
                   justifyContent: "center",
                   textAlign: "center",
                   fontFamily:'Raleway_400Regular', 
                   marginBottom: '10%'
                 }}
               >
                 {group.membersNames.split(",").map((member:string, i:number) => i != group.membersNames.split(",").length-1 ? member + ', ' : member)}
               </Text>
             </View>
             <View>
               <Text
                 style={{
                   color: "#FFFFFF",
                   fontSize: 20,
                   justifyContent: "center",
                   textAlign: "center",
                   fontFamily:'Raleway_400Regular', 
                   marginBottom: '7%'
                 }}
               >
                 Waiting for you to start
               </Text>
             </View>
         </View>
         <Pressable style={styles.heart} onPress={()=>handleAddFavoriteMWG(group.mwgId)}>
           <Image  source={emptyHeart} ></Image>
         </Pressable>
            </Pressable>
          )
        }
        if(!allFaveMWG.includes(parseInt(group.mwgId)) && !group.isDeleted && group.isStarted == true)
        {
          if(group.userDoneWithGenreRankings == false && group.areAllMembersDoneWithGenre == false)
          {
            return (
              <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId, 'userIsReadyForGenres')}>
              <View >
                <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                  <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 28,
                     fontWeight: 'bold',
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: 0,
                   }}
                   >
                   {group.mwgName}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     paddingTop:'2%',
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '10%'
                   }}
                 >
                   {group.membersNames.split(",").map((member:string, i:number) => i != group.membersNames.split(",").length-1 ? member + ', ' : member)}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '7%'
                   }}
                 >
                   Your turn to rank genres!
                 </Text>
               </View>
           </View>
           <Pressable style={styles.heart} onPress={()=>handleAddFavoriteMWG(group.mwgId)}>
             <Image  source={emptyHeart} ></Image>
           </Pressable>
         </Pressable>
            )
          }
          if(group.areAllMembersDoneWithGenre == true && group.userDoneWithSwipes == false && group.areAllMembersDoneWithSwipes == false)
          {
            return (
              <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId, 'userIsReadyForSwipes')}>
              <View >
                <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                  <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 28,
                     fontWeight: 'bold',
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: 0,
                   }}
                   >
                   {group.mwgName}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     paddingTop:'2%',
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '10%'
                   }}
                 >
                    {group.membersNames.split(",").map((member:string, i:number) => i != group.membersNames.split(",").length-1 ? member + ', ' : member)}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '7%'
                   }}
                 >
                   Your turn to swipe movies!
                 </Text>
               </View>
           </View>
           <Pressable style={styles.heart} onPress={()=>handleAddFavoriteMWG(group.mwgId)}>
             <Image  source={emptyHeart} ></Image>
           </Pressable>
         </Pressable>
            )
          }
          if(group.areAllMembersDoneWithGenre == true && group.areAllMembersDoneWithSwipes == true)
          {
            return (
              <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId, 'userIsReadyToSeeFinalMovie')}>
              <View >
                <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                  <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 28,
                     fontWeight: 'bold',
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: 0,
                   }}
                   >
                   {group.mwgName}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     paddingTop:'2%',
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '10%'
                   }}
                 >
                    {group.membersNames.split(",").map((member:string, i:number) => i != group.membersNames.split(",").length-1 ? member + ', ' : member)}
                 </Text>
               </View>
               <View>
                 <Text
                   style={{
                     color: "#FFFFFF",
                     fontSize: 20,
                     justifyContent: "center",
                     textAlign: "center",
                     fontFamily:'Raleway_400Regular', 
                     marginBottom: '7%'
                   }}
                 >
                   {displayObject.movieName} was selected!
                 </Text>
               </View>
           </View>
           <Pressable style={styles.heart} onPress={()=>handleAddFavoriteMWG(group.mwgId)}>
             <Image  source={emptyHeart} ></Image>
           </Pressable>
         </Pressable>
            )
          }
        }
      })
    }
    </View>
  );
};

export default WaitingForYouComponent;

const styles = StyleSheet.create({
  wgButton: {
    borderWidth: 2,
    borderColor: "#4D4A4AD1",
    backgroundColor: "#4D4A4AD1",
    borderRadius: 25,
    alignItems: "center",
    width: '90%',
    justifyContent: "center",
    
  },
  container: {
    flex:1,
    alignItems: "center",
    paddingBottom:20,
    position: 'absolute', top: 260, left: 20, right: 20, bottom: 0,
  },
  heart:{
    position: 'absolute',
    left: '93%',
    bottom: '83%'
  },
  waitingTxt:{
    fontFamily:'Raleway_400Regular',
    fontSize:24,
    color:'#FFFFFF'
  }
});
