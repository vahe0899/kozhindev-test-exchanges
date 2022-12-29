import '../Exchange/_Exchange.css'
import { useDispatch, useSelector } from 'react-redux';
import { refresh, valutesLoad } from '../../Redux/actions';
import { useEffect } from 'react';
import TableRow from '../TableRow/TableRow';

function Exchange() {
    const dispatch = useDispatch();

    const valute = useSelector(state => {
        return state.valute
    });

    const refreshHandler = () => {
        dispatch(valutesLoad());
    };  

    useEffect(() => {
        dispatch(valutesLoad())
    }, [1]);

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
                {valute.map((item) => <TableRow data={item} id={valute.indexOf(item) + 1}/>)}
            </tbody>
        </table>
        <div className="converter">
            <div className="inputs">
                <input placeholder='INPUT'></input>
                <input placeholder='INPUT'></input>
            </div>
            <div className="dropdowns">
                <input placeholder='DROPDOWN'></input>
                <input placeholder='DROPDOWN'></input>
            </div>
        </div>

    </div>
    )
}

export default Exchange 