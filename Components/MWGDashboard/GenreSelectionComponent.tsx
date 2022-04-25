import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import AppLoading from 'expo-app-loading';
import { Button } from "react-native-paper";
import {useNavigation} from '@react-navigation/native';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'

  


const GenreSelectionComponent: FC = () => {
    const navigation = useNavigation<any>();
    const [selectedTeam, setSelectedTeam] = useState({})
    const [selectedTeams, setSelectedTeams] = useState([])

    const K_OPTIONS = [
      {
        item: 'Drama',
        id: 'Drama',
      },
      {
        item: 'Action',
        id: 'Action',
      },
      {
        item: 'Biography',
        id: 'Biography',
      },
      {
        item: 'Musical',
        id: 'Musical',
      },
      {
        item: 'Adventure',
        id: 'Adventure',
      },
      {
        item: 'Fantasy',
        id: 'Fantasy',
      },
      {
        item: 'Animation',
        id: 'Animation',
      },
      {
        item: 'Horror',
        id: 'Horror',
      },
      {
        item: 'Comedy',
        id: 'Comedy',
      },
      {
        item: 'History',
        id: 'History',
      },
      {
        item: 'Western',
        id: 'Western',
      },
      {
        item: 'Thriller',
        id: 'Thriller',
      },
      {
        item: 'Documentary',
        id: 'Documentary',
      },
      {
        item: 'Science Fiction',
        id: 'Science Fiction',
      },
      {
        item: 'Mystery',
        id: 'Mystery',
      },
      {
        item: 'Romance',
        id: 'Romance',
      },
      {
        item: 'Family',
        id: 'Family',
      },
      {
        item: 'War',
        id: 'War',
      },
    ]

    function onMultiChange() {
      return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    }
  
    function onChange() {
      return (val) => setSelectedTeam(val)
    }


  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
      <View style={{flex: 1, alignItems:'center'}}>
        <View style={{ flex: 1, backgroundColor:'#DC1B21C4', borderRadius:30, width:'92%', marginTop:'8%',marginBottom:'8%', justifyContent:'center'}}>
            <View style={{flex:0.2}}>
                <Text style={styles.titleTxt}>Choose 5 Genres to rank</Text>
            </View>
            {/* <View style={{ flex: 0.7, backgroundColor: 'green' }} /> */}
              <View style={{flex:1, alignItems: 'center'}}>
                <SelectBox
                  label=""
                  options={K_OPTIONS}
                  selectedValues={selectedTeams}
                  onMultiSelect={onMultiChange()}
                  onTapClose={onMultiChange()}
                  isMulti
                  listOptionProps={{
                    style: { height: '80%', fontFamily:'Raleway_400Regular', },
                  }}
                  //ultiSelectInputFieldProps	= {{ style: {fontSize: 90}}}
                  searchInputProps= {{ style: {fontSize: 24, color: 'white',fontFamily:'Raleway_400Regular', padding: 5 }}}
                  inputPlaceholder = "Search for a genre..."
                  width = '90%'
                  multiOptionsLabelStyle = {{fontSize: 20, color: 'white',fontFamily:'Raleway_400Regular' }}
                  optionsLabelStyle = {{fontSize: 20, color: 'white',fontFamily:'Raleway_400Regular' }}
                  arrowIconColor = "white"
                  searchIconColor = 'white'
                  toggleIconColor = 'darkslategray'
                  multiOptionContainerStyle = {{height: 30,  width: 200,fontFamily:'Raleway_400Regular'}}
                />
              </View>
             <View style={{flexDirection:'row'}}>

               <View style={[{ flex:0.5, alignItems: "center", alignItems:'flex-start'}]}>
           <Button uppercase={false}  color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
               <Text style={styles.nextBtn}>{'\<'} Back </Text>
           </Button>
               </View>
               <View style={[{ flex:0.5, alignItems: "center", alignItems:'flex-end'}]}>
           <Button uppercase={false}  color='#FFFFFF' mode="text" onPress={() => {navigation.navigate()}}>
               <Text style={styles.nextBtn}>Next {'\>'}</Text>
           </Button>
               </View>
             </View>
            </View>


         </View>
  );
};

const styles = StyleSheet.create({
  titleTxt:{
      fontFamily:'Raleway_400Regular',
      fontSize: 30,
      textAlign:'center',
      marginTop:'4%',
      color: '#FFFFFF',
  },
  Dropdown:{
      borderRadius:25,
      width:'90%',
      fontFamily:'Raleway_400Regular'
  },
  nextBtn:{
    fontFamily: "Raleway_400Regular",
    fontSize: 25
  }
});

export default GenreSelectionComponent;
