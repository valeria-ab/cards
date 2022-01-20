import {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useDebounce from './CustomHook';
import {getPacksTC, setSearchPackNameAC} from '../../../BLL/packs/packs-reducer';
import {IAppStore} from '../../../BLL/store/store';

const Search = () => {
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const dispatch = useDispatch();
    const debouncedSearch = useDebounce(() => dispatch(getPacksTC()), 1000)
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
