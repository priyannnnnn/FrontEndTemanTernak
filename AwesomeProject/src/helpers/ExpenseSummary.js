import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../components/style";
function ExpensesSummary({expenses, periodName}){
    const expensesSum=expenses.reduce((sum,expense)=>{return sum + expense.description;},0);
    console.log(expenses)
    return(
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum}</Text>
        </View>
    )
}

export default ExpensesSummary;
const styles= StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:GlobalStyles.colors.primary50,
        borderRadius:6,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    period:{
        fontSize:18,
        color:GlobalStyles.colors.primary400
    },
    sum:{
        fontSize:16,
        fontWeight:'bold',
        color:GlobalStyles.colors.primary500
    }
});