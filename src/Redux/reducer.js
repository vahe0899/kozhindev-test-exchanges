import { REFRESH, VALUTES_LOAD, SET_MAIN_VALUTE, SET_CONVERTED_VALUTE, MAIN_INPUT, CONVERTED_INPUT } from "./types";

const initialState = {
    valute: [],
    mainValute: '',
    convertedValute: '',
    mainInputValue: '',
    convertedInputValue: '',
    time: ''
};

export const reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        // case REFRESH:
        //                 let newValute = [];
        //     for (let prop in action.data.Valute) {
        //         newValute.push(action.data.Valute[prop])
        //     };
        //     return {
        //         ...state,
        //         valute: newValute,
        //         time: time
        //     };


        case VALUTES_LOAD:
            let newValute = [];
            let date = new Date(action.data.Date);
            let dayOfMonth = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let hour = date.getHours();
            let minutes = date.getMinutes();

            //форматирование
            year = year.toString().slice(-2);
            month = month < 10 ? '0' + month : month;
            dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
            hour = hour < 10 ? '0' + hour : hour;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            let time = `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`

            for (let prop in action.data.Valute) {
                newValute.push(action.data.Valute[prop])
            };
            return {
                ...state,
                valute: newValute,
                time: time
            };

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