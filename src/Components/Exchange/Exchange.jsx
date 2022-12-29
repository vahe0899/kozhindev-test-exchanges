import '../Exchange/_Exchange.css'
import { useDispatch, useSelector } from 'react-redux';
import { refresh, valutesLoad, setMainValute, setConvertedValute, convertedInput, mainInput } from '../../Redux/actions';
import { useEffect } from 'react';
import TableRow from '../TableRow/TableRow';
import SelectItem from '../SelectItem/SelectItem';
import Spin from '../Spin/Spin';

function Exchange() {
    function validation(event) {
        if (/\+|-/.test(event.key)) {
            event.preventDefault();
        }
    }

    const dispatch = useDispatch();

    const valute = useSelector(state => {
        return state.valute
    });

    const time = useSelector(state => {
        return state.time
    });

    const mainInputValue = useSelector(state => {
        return state.mainInputValue
    });

    const convertedInputValue = useSelector(state => {
        return state.convertedInputValue
    });

    const euro = useSelector(state => {
        return state.valute.find(item => item.CharCode == 'EUR')
    });

    const dollar = useSelector(state => {
        return state.valute.find(item => item.CharCode == 'USD')
    });

    const yuan = useSelector(state => {
        return state.valute.find(item => item.CharCode == 'CNY')
    });

    const refreshHandler = () => {
        dispatch(refresh());
    };  

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
        <Spin />
        <div className="header">
            <h2 className="title">
                Currency Converter by Vahe Galstyan
            </h2>
            <div className="valute-refresh">
                <div className="time">
                    Последнее обновление базы данных: {time}
                </div>
                <button className="refresh" onClick={refreshHandler}>
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
                {valute.map((item) => <TableRow data={item} id={valute.indexOf(item) + 1} dollar={dollar} euro={euro} yuan={yuan} key={valute.indexOf(item)}/>)}
            </tbody>
        </table>
        <div className="converter">
                <div className="dropdown">
                    <select className="dropbtn" onChange={mainValuteHandler}>
                        <option disabled selected value> -- Выберите валюту -- </option>
                        {valute.map((item) => <SelectItem data={item} id={valute.indexOf(item) + 1} key={valute.indexOf(item)}/>)}
                    </select>   
                    <input onKeyPress={validation} type="number" placeholder='Введите значение...' onChange={mainInputHandler} value={mainInputValue}></input>
                </div>    
                <div className="dropdown">
                    <input onKeyPress={validation} type="number" placeholder='Введите значение...' onChange={convertedInputHandler} value={convertedInputValue}></input>
                    <select className="dropbtn" onChange={convertedValuteHandler}>
                        <option disabled selected value> -- Выберите валюту -- </option>
                        {valute.map((item) => <SelectItem data={item} id={valute.indexOf(item) + 1} key={valute.indexOf(item)}/>)}
                    </select>   
                </div>     
        </div>
    </div>
    )
}

export default Exchange 