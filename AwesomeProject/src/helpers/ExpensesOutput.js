import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpensesList from "./Expenselist";
import ExpensesSummary from "./ExpenseSummary";
import { GlobalStyles } from "../components/style";


function Expensesoutput({expenses, expensesPeriod, fallbackText}){
let content=<Text style={styles.infotext}>{fallbackText}</Text>
if (expenses.length >0){
    content=<ExpensesList expenses={expenses} />
}
//console.log(expenses);

    return(
    <View style={styles.container}>
        {/* <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
        {content} */}
    </View>
    
    );
}
export default Expensesoutput;
const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.error50
    },
    infotext:{
        color:'white',
        fontSize:16,
        textAlign:'center',
        marginTop:32
    }
});