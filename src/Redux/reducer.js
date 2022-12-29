import { REFRESH, VALUTES_LOAD, SET_MAIN_VALUTE, SET_CONVERTED_VALUTE, MAIN_INPUT, CONVERTED_INPUT } from "./types";

const initialState = {
    valute: [],
    mainValute: '',
    convertedValute: '',
    mainInputValue: '',
    convertedInputValue: ''
};

export const reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case REFRESH:
            // return {
            //     ...state,
            //     lists: {
            //         ...state.lists,
            //         chest: true,
            //     }
            // }

        case VALUTES_LOAD:
            let newValute = [];
            for (let prop in action.data) {
                newValute.push(action.data[prop])
            }
            return {
                ...state,
                valute: newValute
            }

        case SET_MAIN_VALUTE:
            const mainValute = state.valute.find(item => item.Name == action.data);
            if (state.mainInputValue != '') {
                return {
                    ...state,
                    mainValute: mainValute.Value,
                    convertedInputValue: ((mainValute.Value/state.convertedValute) * state.mainInputValue).toFixed(3)
                }
            }
            return {
                ...state,
                mainValute: mainValute.Value
            }

        case SET_CONVERTED_VALUTE:

            const convertedValute = state.valute.find(item => item.Name == action.data);
            if (state.convertedInputValue != '') {
                return {
                    ...state,
                    convertedValute: convertedValute.Value,
                    mainInputValue: (state.convertedInputValue / (state.mainValute/convertedValute.Value)).toFixed(3)
                }
            }

            return {
                ...state,
                convertedValute: convertedValute.Value
            }

        case MAIN_INPUT:
        
            if (state.convertedValute == '' || state.mainValute == '') {
                alert("Выберите валюту")
                return state
            }

            const calculatedValue = ((state.mainValute/state.convertedValute) * action.text).toFixed(3)
            
            return {
                ...state,
                mainInputValue: action.text,
                convertedInputValue: calculatedValue
            }

        case CONVERTED_INPUT:
        
            if (state.convertedValute == '' || state.mainValute == '') {
                alert("Выберите валюту")
                return state
            }

            const calculatedReversedValue = (action.text/(state.mainValute/state.convertedValute)).toFixed(3)
            
            return {
                ...state,
                mainInputValue: calculatedReversedValue,
                convertedInputValue: action.text
            }

        default:
            return state
    }
}