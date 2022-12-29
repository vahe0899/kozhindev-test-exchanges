import { REFRESH, VALUTES_LOAD } from "./types";
import axios from 'axios';

export function refresh() {
    return {
        type: REFRESH
    }
};

export function valutesLoad() {
    return async dispatch => {
        const jsonData = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
        dispatch({
            type: VALUTES_LOAD,
            data: jsonData.data.Valute
        })
    }
};