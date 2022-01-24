import { setWithMyIdAC} from '../../../BLL/packs/packs-reducer';
import {useDispatch} from 'react-redux';

export const ChooseOwner = () => {
    const dispatch = useDispatch()

    return <div>
        <div><b>Show packs cards</b></div>
        <button onClick={() => {
            dispatch(setWithMyIdAC(true))
        }
        }>My
        </button>
        <button onClick={() => {
            dispatch(setWithMyIdAC(false))
        }}>All
        </button>
    </div>
}