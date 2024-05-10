import { StyleSheet } from "react-native";
import { theme } from "../../core/theme";

export default StyleSheet.create({
    View:{
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.screen,
        padding: 20,
        alignSelf: 'center',
        justifyContent: 'center',
      },
      Text:{
        textAlign:'left',
        fontSize:20,
        fontWeight: '500',
        color:'#F9FBE7'
      },
      ScrollView:{
        flex:1,
        width:'100%',
        paddingBottom:1,
        backgroundColor:theme.colors.screen,
        marginTop:0
      },
      title:{
        color:'#000000'
      },
})