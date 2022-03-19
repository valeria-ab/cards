import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import s from './Search.module.scss';
import Search from './Search';
import {setSearchPackNameAC, setSortPacksValueAC} from '../../../BLL/packs/packs-reducer';
import React, {useEffect} from 'react';


const SearchPacksContainer = React.memo(() => {
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const dispatch = useDispatch();
    const onKeyUpHandler = (value: string) => dispatch(setSearchPackNameAC(value))

    useEffect(() => {
        return () => {
            dispatch(setSearchPackNameAC(""))
        }
    }, [])

    return <div className={s.Search}>
        <Search
            value={packName}
            onKeyUpHandler={onKeyUpHandler}
        />
    </div>
})

export default SearchPacksContainer;
