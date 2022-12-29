import '../Exchange/_Exchange.css'
import { useDispatch, useSelector } from 'react-redux';
import { refresh, valutesLoad, setMainValute, setConvertedValute, convertedInput, mainInput } from '../../Redux/actions';
import { useEffect } from 'react';
import TableRow from '../TableRow/TableRow';
import SelectItem from '../SelectItem/SelectItem';

function Exchange() {
    const dispatch = useDispatch();

    const valute = useSelector(state => {
        return state.valute
    });

    const mainInputValue = useSelector(state => {
        return state.mainInputValue
    });

    const convertedInputValue = useSelector(state => {
        return state.convertedInputValue
    });

    // const mainValute = useSelector(state => {
    //     return state.convertedValute
    // });

    const euro = useSelector(state => {
        return state.valute.find(item => item.CharCode == 'EUR')
    });

    const dollar = useSelector(state => {
        return state.valute.find(item => item.CharCode == 'USD')
    });

    const yuan = useSelector(state => {
        return state.valute.find(item => item.CharCode == 'CNY')
    });

    // const refreshHandler = () => {
    //     dispatch(valutesLoad());
    // };  

    const mainValuteHandler = (event) => {
        dispatch(setMainValute(event.target.value));
    }; 

    const convertedValuteHandler = (event) => {
        dispatch(setConvertedValute(event.target.value));
    };

    const mainInputHandler = (event) => {
        dispatch(mainInput(event.target.value));
    };

    const convertedInputHandler = (event) => {
        dispatch(convertedInput(event.target.value));
    };

    useEffect(() => {
        dispatch(valutesLoad())
    }, []);

    return(
    <div className="container">
        <div className="header">
            <h2 className="title">
                Currency Converter by Vahe Galstyan
            </h2>
            <div className="valute-refresh">
                <div className="time">
                    Обновлено в последний раз: СЕЙЧАС
                </div>
                <button className="refresh">
                    Обновить
                </button>
            </div>
        </div>
        <table>
            <tbody>
                <tr>
                    <th>№</th>
                    <th>Код</th>
                    <th>Название валюты</th>
                    <th>Курс к Рублю</th>
                    <th>Курс к Доллару</th>
                    <th>Курс к Евро</th>
                    <th>Курс к Юаню</th>
                </tr>
                {valute.map((item) => <TableRow data={item} id={valute.indexOf(item) + 1} dollar={dollar} euro={euro} yuan={yuan}/>)}
            </tbody>
        </table>
        <div className="converter">
                <div className="dropdown">
                    <select className="dropbtn" onChange={mainValuteHandler}>
                        <option disabled selected value> -- Выберите валюту -- </option>
                        {valute.map((item) => <SelectItem data={item} id={valute.indexOf(item) + 1}/>)}
                    </select>   
                    <input type="number" placeholder='Введите значение...' onChange={mainInputHandler} value={mainInputValue}></input>
                </div>    
                <div className="dropdown">
                    <input type="number" placeholder='Введите значение...' onChange={convertedInputHandler} value={convertedInputValue}></input>
                    <select className="dropbtn" onChange={convertedValuteHandler}>
                        <option disabled selected value> -- Выберите валюту -- </option>
                        {valute.map((item) => <SelectItem data={item} id={valute.indexOf(item) + 1}/>)}
                    </select>   
                </div>     
        </div>
    </div>
    )
}

export default Exchange 