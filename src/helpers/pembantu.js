import { createContext } from "react";
import { useReducer } from "react";
const Dummy_expenses=[
    {description:'hhhc'},
    {description:'djjdjuj'}
]

export const pembantu=createContext({
    expenses:[],
    addExpense: ({description})=>{},
});
function expensesReducer(state, action) {
    switch (action.type) {
      case 'ADD':
        const id = new Date().toString() + Math.random().toString();
        return [{ ...action.payload, id: id }, ...state];
    default :
    return state;

    }
}


function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch]= useReducer(expensesReducer, Dummy_expenses);
    function addExpense(expenseData){
        dispatch({type:'Add', payload:expenseData});
    }

    const value={
        expenses:expensesState,
        addExpense:addExpense,
    };
    return(
        <pembantu.Provider value={value}>{children}</pembantu.Provider>
    )
}
export default ExpensesContextProvider;