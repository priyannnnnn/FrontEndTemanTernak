import Input from "../components/input";
import { pembantu } from "./pembantu";
import { useState } from "react";
import { StyleSheet, View,Text } from "react-native";
import Button1 from "./Buttonpembantu";

function Manageexpense({submitButtonHandler, onSubmit,oncacel, defaultValues}){
    const [inputnilai, setInputValues]=useState({
        description:'',
      });
  
      function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues)=> {
            return{
                ...curInputValues,
                [inputIdentifier]: enteredValue
            };
        });
    }
  
    function submid(){
      const expenseData={
        description:inputnilai.description
      };
      onSubmit(expenseData);
    }

    return(<View>
        <Text style={styles.hjjj}>hggdg</Text>
    <Input label="y" textInputConfig={{
        multiline:true,
        onChangeText:inputChangeHandler.bind(this, 'description'),
        value:inputnilai.description,
      }}/>
      <Button1 style={styles.button}
      onPress={submid}
      >{submitButtonHandler}</Button1>
      </View>
    )
}
export default Manageexpense;

const styles=StyleSheet.create({
    button:{
        minWidth:120,
        marginHorizontal:20,
    },
    hjjj:{
        fontSize:30
    }
    
})