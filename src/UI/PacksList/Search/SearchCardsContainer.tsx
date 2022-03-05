import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import s from './Search.module.scss';
import {setSearchСardQuestionAC} from '../../../BLL/cards/cards-reducer';
import Search from './Search';


const SearchCardsContainer = () => {

    const cardQuestion = useSelector<IAppStore, string>(state => state.cards.cardQuestion)
    const dispatch = useDispatch();
    const onKeyUpHandler = (value: string) => dispatch(setSearchСardQuestionAC(value))


    return <div className={s.Search}>
        <Search
            title={cardQuestion}
            onKeyUpHandler={onKeyUpHandler}
        />
    </div>
};

export default SearchCardsContainer;
