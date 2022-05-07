import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput,Pressable, Button} from "react-native";
import emptyHeart from "../../assets/emptyHeart.png";
import filledHeart from "../../assets/filledHeart.png";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { GetUserByUsername, GetAllMWGAUserIsMemberOfuserId, AddFavoriteMWG, RemoveFavoriteMWG, GetMWGStatusByUserId } from '../../Service/DataService'
import {useNavigation} from '@react-navigation/native';
//import { Avatar } from "react-native-paper";
import { Avatar } from "native-base";
import UserContext from '../../Context/UserContext';



interface IMWGCardComponent {
  username: string,
  userId: number
}

//map through MWG created according to userID/logged in user
const WaitingForYouComponent: FC = () => {
  let { username, setUsername, userId, setUserId, allMWG, setAllMWG, setMWGname, MWGname, setMWGId, MWGId, setUserIsAdmin, setUserIsReadyForGenres,  setUserIsReadyForSwipes,  setUserIsReadyToSeeFinalMovie,setUserIsWaiting } = useContext(UserContext)

  //const [allMWG, setAllMWG] = useState<any>([]);
  const [allFaveMWG, setAllFaveMWG] = useState<any>([]);
  //const [favorite, setFavorite] = useState(0);

  const navigation = useNavigation<any>();

  
  useEffect(  () => {
      // setAllFaveMWG([]);
      async function fetchUserData() {
            setUsername(username);
            setUserId(userId)
            // setUserIsAdmin(false);
            // setUserIsReadyForGenres(false);
            // setUserIsReadyForSwipes(false);
            // setUserIsReadyToSeeFinalMovie(false);
            // setUserIsWaiting(false);
          
      let response = await GetUserByUsername(username);
      let favoritedMWGArray = response.favoritedMWGId.split(',');
      console.log(favoritedMWGArray);

      for (var i of favoritedMWGArray) {
        allFaveMWG.push(parseInt(i));
      }
      // allFaveMWG.push(parseInt(favoritedMWGArray));
      setAllFaveMWG([...allFaveMWG]);
      console.log(allFaveMWG);

      if(response != null)
        {
          let userMWG = await GetMWGStatusByUserId(response.id);
          setAllMWG(userMWG);
          console.log(userMWG);
        }
      }
      fetchUserData();
    },
   []);

    const handleAddFavoriteMWG = async (groupId:number) =>{
      let result = await AddFavoriteMWG(userId,groupId);
      let userData = await GetUserByUsername(username);
      // console.log(result);
      console.log(userData);
      console.log(groupId);
      allFaveMWG.push(groupId);
      setAllFaveMWG([...allFaveMWG]);
      console.log(allFaveMWG);
      if(userData != null)
        {
          let userMWG = await GetMWGStatusByUserId(userData.id);
          setAllMWG(userMWG);
        }
    }

    const handleRemoveFavoriteMWG = async (groupId:number) =>{
      let result = await RemoveFavoriteMWG(userId,groupId);
      let userData = await GetUserByUsername(username);
      console.log(result);
      console.log(userData);
      let indexGroupId = allFaveMWG.indexOf(groupId);
      allFaveMWG.splice(indexGroupId,1);
      setAllFaveMWG([...allFaveMWG]);
      console.log(allFaveMWG);
      if(userData != null)
        {
          let userMWG = await GetMWGStatusByUserId(userData.id);
          setAllMWG(userMWG);
          console.log(userMWG);
        }
    }

    const handlePress = (MWGname:string, MWGId:number, whatIsUser:string) => {
      console.log(MWGname);
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
      //navigation.navigate('MovieCard');
    }




  
  return (

    <View style={{ flex:1, alignItems:'center', backgroundColor: '#1E1A1A'}}>
      
    {

      //all MWGstatus that the user has, this correlates with whatever MWG user is in  
      allMWG.map((group:any, i:number) => 
      
      { //checks to see if its in the favorite list       
        //check to see if not deleted
        //check to see if isStarted is false -> indicates that admin hasn't started process yet, so have to wait for them

        //if isStarted is true then check to see if user is done with genre ranking
        //if userdonewithgenreranking is false AND isStarted is true -> must go in waiting for you
        //if userdonewithgenreranking is true AND endpoint that returns if all other members are done is false, then must be in waiting for others component

        //if isStarted is true AND userdonewithgenreranking is true AND all other members are done and returned true -> must go to waiting for you component

        //if isStarted is true AND userdonewithswipes is true AND bool that returns if other members are done swiping is false -> waiting for others

        //if isStarted is true AND userdonewithswipes is true AND everyone else is done -> waiting for you (click to see the highest movie!)

        //reset all values after the process is done (isStarted, userisdoneswipes, userisdonegenre) --> MWG should move back to waiting for others since admin hasn't started

        //ugh gotta think about how it would look for admin... if groupCreatorId == userId AND isStarted is false then place in waiting for you component

        //if isStarted is true then check to see if user is done with genre ranking
        //if userdonewithgenreranking is false AND isStarted is true -> must go in waiting for you
        //if userdonewithgenreranking is true AND endpoint that returns if all other members are done is false, then must be in waiting for others component

        //maps through favorites
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
                   // justifyContent: "center",
                   // textAlign: "center",
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
        //should areAllMembersDoneWithGenre be another property on the MWGStatus model
        //can we link the endpoint i made in the backend to it somehow?
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
                     // justifyContent: "center",
                     // textAlign: "center",
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
                     // justifyContent: "center",
                     // textAlign: "center",
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
                     // justifyContent: "center",
                     // textAlign: "center",
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
                   Check out the movie chosen!
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
        //maps thru nonfavorites
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
                   // justifyContent: "center",
                   // textAlign: "center",
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
        //should areAllMembersDoneWithGenre be another property on the MWGStatus model
        //can we link the endpoint i made in the backend to it somehow?
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
                     // justifyContent: "center",
                     // textAlign: "center",
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
                     // justifyContent: "center",
                     // textAlign: "center",
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
                     // justifyContent: "center",
                     // textAlign: "center",
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
                   Check out the chosen movie!
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

      {/* {
        allMWG.map((group:any, i:number) => {if(!allFaveMWG.includes(parseInt(group.mwgId)) && !group.isDeleted && group.userDoneWithGenreRankings == false && group.userDoneWithSwipes == false)
          {
            {
              if(group.userDoneWithGenreRankings == false && group.areAllMembersDoneWithGenre == false)
              {
                return (
                  <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId)}>
                  <View >
                    <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                      <Text
                       style={{
                         color: "#FFFFFF",
                         fontSize: 28,
                         fontWeight: 'bold',
                         // justifyContent: "center",
                         // textAlign: "center",
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
                       You need to start ranking genres/swiping movies!
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
                  <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId)}>
                  <View >
                    <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                      <Text
                       style={{
                         color: "#FFFFFF",
                         fontSize: 28,
                         fontWeight: 'bold',
                         // justifyContent: "center",
                         // textAlign: "center",
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
                       You need to start ranking genres/swiping movies!
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
                  <Pressable key={group.id} style={[styles.wgButton, {flex:1, marginTop:'5%'}]} onPress={()=> handlePress(group.mwgName, group.mwgId)}>
                  <View >
                    <View  style={{marginTop: '3%', flexDirection:'row', alignItems:'flex-start', justifyContent:'center'}}>
                      <Text
                       style={{
                         color: "#FFFFFF",
                         fontSize: 28,
                         fontWeight: 'bold',
                         // justifyContent: "center",
                         // textAlign: "center",
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
                       You need to start ranking genres/swiping movies!
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
          }})
      } */}

    </View>
  );
};

export default WaitingForYouComponent;

const styles = StyleSheet.create({
  wgButton: {
    // flexDirection: "row",
    borderWidth: 2,
    borderColor: "#4D4A4AD1",
    backgroundColor: "#4D4A4AD1",
    borderRadius: 25,
    alignItems: "center",
    width: '90%',
    justifyContent: "center",
    //height: '20%',
    
  },
  container: {
    flex:1,
    alignItems: "center",
    // paddingTop: 20,
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
