import { StyleSheet } from "react-native";

export default StyleSheet.create({
    View:{
        flex: 1,
        width: '100%',
        backgroundColor:'#FAEBD7',
        padding: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop:20,
      },

      container: {
        paddingHorizontal: 20
      },
      title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 30,
        color:'#000000'
      },
      Text: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom:-10,
        color:'#000000'
      },
})