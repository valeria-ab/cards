import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import s from './Search.module.scss';
import {InitialCardsStateType, setSearchСardQuestionAC} from '../../../BLL/cards/cards-reducer';
import Search from './Search';
import React, {useCallback, useEffect} from 'react';
import {setSearchPackNameAC} from '../../../BLL/packs/packs-reducer';
import {RequestStatusType} from '../../../BLL/app/app-reducer';


const SearchCardsContainer = React.memo(() => {
    const cardQuestion = useSelector<IAppStore, string>(state => state.cards.cardQuestion)
    const cardsLength = useSelector<IAppStore, number>(state => state.cards.cards.length)

    const disabled = (cardsLength: number) => {
       if( cardsLength === 0) {
           return true
       }
    }
    const withMyId = useSelector<IAppStore, boolean>(state => state.packs.withMyId)
    const dispatch = useDispatch();
    const onKeyUpHandler = useCallback((value: string) => dispatch(setSearchСardQuestionAC(value)), [])

    // useEffect(() => {
    //     return () => {
    //         dispatch(setSearchСardQuestionAC(""))
    //     }
    // }, [])

    return <div className={s.search}>
        <Search
            value={cardQuestion}
            onKeyUpHandler={onKeyUpHandler}
            disabled={withMyId && cardsLength === 0}
        />
    </div>
});

export default SearchCardsContainer;
