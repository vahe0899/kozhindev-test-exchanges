import {TailSpin} from "react-loader-spinner";
import { useSelector } from 'react-redux';

function Spin() {
    const spinner = useSelector(state => {
        return state.loading
    });
    
    return (
        <div className='loader-styles'>
            <TailSpin 
                color="#04AA6D"
                height={100}
                width={100}
                visible={spinner}
            />
        </div>
    )
}

export default Spin