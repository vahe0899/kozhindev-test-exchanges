import { REFRESH, VALUTES_LOAD } from "./types";

const initialState = {
    valute: [],
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
            console.log(initialState.valute)

        case VALUTES_LOAD:
            let newValute = [];
            for (let prop in action.data) {
                newValute.push(action.data[prop])
            }
            return {
                ...state,
                valute: newValute
            }

        default:
            return state
    }
}