import {View, Animated, TouchableOpacity, Text} from 'react-native'

const RightActions = (progress:number, dragX:any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
      extrapolate: 'clamp'
    })


    return (
      <>
      <TouchableOpacity onPress={() => alert('Delete button pressed')}>
        <View style={{flex:1, backgroundColor: 'red', width:'100%'}}>
          <Animated.View
            style={{
              transform: [{ scale }],
              flex:1,
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}><Text style={{color:'white', fontSize:35, fontFamily:'Raleway_400Regular', textAlign:'center'}}>

            Delete
            </Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
      </>
    )
   }

   export default RightActions;