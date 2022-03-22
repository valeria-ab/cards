import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import s from './Search.module.scss';
import {setSearchСardQuestionAC} from '../../../BLL/cards/cards-reducer';
import Search from './Search';
import React, {useCallback, useEffect} from 'react';
import {setSearchPackNameAC} from '../../../BLL/packs/packs-reducer';


const SearchCardsContainer = React.memo(() => {

    const cardQuestion = useSelector<IAppStore, string>(state => state.cards.cardQuestion)
    const dispatch = useDispatch();
    const onKeyUpHandler = useCallback((value: string) => dispatch(setSearchСardQuestionAC(value)), [])

    useEffect(() => {
        return () => {
            dispatch(setSearchСardQuestionAC(""))
        }
    }, [])

    return <div className={s.search}>
        <Search
            value={cardQuestion}
            onKeyUpHandler={onKeyUpHandler}
        />
    </div>
});

export default SearchCardsContainer;
