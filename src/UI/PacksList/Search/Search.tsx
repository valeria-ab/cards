import {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useDebounce from './CustomHook';
import {getPacksTC, InitialStateType, setSearchPackNameAC} from '../../../BLL/packs/packs-reducer';
import {IAppStore} from '../../../BLL/store/store';

const Search = () => {
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const dispatch = useDispatch();
    const withMyId = useSelector<IAppStore, boolean>(
        (state) => state.packs.withMyId
    );
    const currentUserID = useSelector<IAppStore, string>((state) => state.profile._id);
    const debouncedSearch = useDebounce(() => dispatch(getPacksTC(withMyId
        ? {user_id: currentUserID}
        : {}
    )), 1000)
    const onKeyUpHandler = () => {
        debouncedSearch()
    }
    const setInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchPackNameAC(e.currentTarget.value))
    }
    return <div>
        <input
            type="text"
            value={packName}
            placeholder={'Search...'}
            onChange={setInputValueHandler}
            onKeyUp={onKeyUpHandler}
        />

    </div>
};

export default Search;
