import {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useDebounce from './CustomHook';
import {getPacksTC, InitialStateType, setSearchPackNameAC, setWithMyIdAC} from '../../../BLL/packs/packs-reducer';
import {IAppStore} from '../../../BLL/store/store';
import s from './Search.module.scss';

const Search = () => {
    const [value, setValue] = useState("")
    const packName = useSelector<IAppStore, string>(state => state.packs.packName)
    const dispatch = useDispatch();
    // const withMyId = useSelector<IAppStore, boolean>(
    //     (state) => state.packs.withMyId
    // );
    // const currentUserID = useSelector<IAppStore, string>((state) => state.profile._id);
    // const debouncedSearch = useDebounce(() => dispatch(getPacksTC()) ,  1000)
    const onKeyUpHandler = useDebounce(() => dispatch(setSearchPackNameAC(value)) ,  1000)

    const setInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setValue(e.currentTarget.value))
    }
    return <div  className={s.Search}>
        <input  className={s.SearchInput}
            type="text"
            value={value}
            placeholder={'Search...'}
            onChange={setInputValueHandler}
            onKeyUp={onKeyUpHandler}
        />

    </div>
};

export default Search;
