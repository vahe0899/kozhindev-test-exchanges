import { VALUTES_LOAD, SET_MAIN_VALUTE, SET_CONVERTED_VALUTE, CONVERTED_INPUT, MAIN_INPUT } from "./types";
import axios from 'axios';

export function setMainValute(data) {
    return {
        type: SET_MAIN_VALUTE,
        data: data
    }
};

export function setConvertedValute(data) {
    return {
        type: SET_CONVERTED_VALUTE,
        data: data
    }
};

export function mainInput(text) {
    return {
        type: MAIN_INPUT,
        text: text
    }
};

export function convertedInput(text) {
    return {
        type: CONVERTED_INPUT,
        text: text
    }
};

export function valutesLoad() {
    return async dispatch => {
        const jsonData = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
        dispatch({
            type: VALUTES_LOAD,
            data: jsonData.data
        })
    }
};