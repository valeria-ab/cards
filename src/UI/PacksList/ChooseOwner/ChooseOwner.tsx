import {useEffect} from 'react';
import {getPacksTC} from '../../../BLL/packs/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';

export const ChooseOwner = () => {
    const dispatch = useDispatch()
    const currentUserID = useSelector<IAppStore, string>((state) => state.profile._id);
    return <div>
        <div><b>Show packs cards</b></div>
        <button onClick={() => {
            dispatch(getPacksTC({user_id: currentUserID}))
        }
        }>My
        </button>
        <button onClick={() => {
            dispatch(getPacksTC())
        }}>All
        </button>
    </div>
}