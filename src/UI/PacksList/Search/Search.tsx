import {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchValue} from '../../../BLL/search/searchActions';
import useDebounce from './CustomHook';
import {getPacksTC} from '../../../BLL/packs/packs-reducer';
import {IAppStore} from '../../../BLL/store/store';
import {setSearchPackNameAC} from '../../../BLL/findAndPagination/findAndPaginationReducer';

const Search = () => {
    const [value, setValue] = useState('')
    const packName = useSelector<IAppStore, string>(state => state.findAndPagination.cardPacks.packName)
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
            // placeholder={'Search...'}
            // onChange={(e) => setValue(e.currentTarget.value)}
            type="text"

            value={packName}
            placeholder={'Type the name of an existing pack...'}
            onChange={setInputValueHandler}
            onKeyUp={onKeyUpHandler}
        />

    </div>
    {/*disabled={appStatus === 'loading'}*/
    }
};

export default Search;
