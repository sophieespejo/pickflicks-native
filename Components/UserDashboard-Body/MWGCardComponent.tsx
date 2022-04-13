import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, Text, View, Image, TextInput,ScrollView } from "react-native";
import emptyHeart from "../../assets/emptyHeart.png";
import filledHeart from "../../assets/filledHeart.png";


//map through MWG created according to userID/logged in user
const MWGCardComponent: FC = () => {
  return (

    <View style={styles.container}>
      {/* <ScrollView>

      </ScrollView> */}
      <View style={[styles.wgButton, {marginTop:20}]}>
          <View style={{paddingBottom:30, paddingTop:7, flexDirection:'row'}}>

      <Text
          style={{
            color: "#FFFFFF",
            fontSize: 28,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          MovieGroup1
        </Text>
        <Image style={styles.heart} source={filledHeart}></Image>
          </View>
          <View>

        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Members: Sophie, Dylan, An
        </Text>
          </View>
      </View>

      <View style={[styles.wgButton, {marginTop:20}]}>
          <View style={{paddingBottom:30, paddingTop:7, flexDirection:'row'}}>

      <Text
          style={{
            color: "#FFFFFF",
            fontSize: 28,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          MovieGroup1
        </Text>
        <Image style={styles.heart} source={filledHeart}></Image>
          </View>
          <View>

        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Members: Sophie, Dylan, An
        </Text>
          </View>
      </View>
      <View style={[styles.wgButton, {marginTop:20}]}>
          <View style={{paddingBottom:30, paddingTop:7, flexDirection:'row'}}>

      <Text
          style={{
            color: "#FFFFFF",
            fontSize: 28,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          MovieGroup1
        </Text>
        <Image style={styles.heart} source={filledHeart}></Image>
          </View>
          <View>

        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Members: Sophie, Dylan, An
        </Text>
          </View>
      </View>
      <View style={[styles.wgButton, {marginTop:20}]}>
          <View style={{paddingBottom:30, paddingTop:7, flexDirection:'row'}}>

      <Text
          style={{
            color: "#FFFFFF",
            fontSize: 28,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          MovieGroup1
        </Text>
        <Image style={styles.heart} source={filledHeart}></Image>
          </View>
          <View>

        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Members: Sophie, Dylan, An
        </Text>
          </View>
      </View>
    </View>
  );
};

export default MWGCardComponent;

const styles = StyleSheet.create({
  wgButton: {
    // flexDirection: "row",
    borderWidth: 2,
    borderColor: "#4D4A4AD1",
    backgroundColor: "#4D4A4AD1",
    borderRadius: 25,
    alignItems: "center",
    width: "100%",

    // justifyContent: "center",
    height: 149,
    
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
    left: 230,
    bottom: 50
  }
});
