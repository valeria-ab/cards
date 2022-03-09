import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import s from './Search.module.scss';
import Search from './Search';
import {setSearchPackNameAC} from '../../../BLL/packs/packs-reducer';
import React from 'react';


const SearchPacksContainer = React.memo(() => {
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const dispatch = useDispatch();
    const onKeyUpHandler = (value: string) => dispatch(setSearchPackNameAC(value))


    return <div className={s.Search}>
        <Search
            title={packName}
            onKeyUpHandler={onKeyUpHandler}
        />
    </div>
})

export default SearchPacksContainer;
