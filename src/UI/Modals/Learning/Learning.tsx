import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import React, {useEffect, useState} from 'react';
import {CardResponseType} from '../../../DAL/cards-api';
import {CardPacksType} from '../../../DAL/packs-api';
import {QuestionModal} from './QuestionModal';
import {CheckYourself} from '../Rate/CheckYourself';
import waiting from '../../../image/cat-avatar.d04271ed.gif';
import quby from '../../../image/quby.gif';
import quby2 from '../../../image/quby(1).gif';
import {RequestStatusType} from '../../../BLL/app/app-reducer';
import {CircularProgress} from '@mui/material';
import {setCardsAC, getCardsTC} from '../../../BLL/cards/cards-reducer';
import {Navigate, useParams} from 'react-router-dom';

export const Learning = React.memo(() => {
    // console.log('lear')
    const {packId, packName} = useParams()

    const dispatch = useDispatch();
    const [card, setCard] = useState<CardResponseType | null>(null);
    const [checkYourselfMode, setCheckYourselfMode] = useState<boolean>(false);
    const [questionMode, setQuestionMode] = useState<boolean>(true);
    const isInitialized = useSelector<IAppStore, boolean>(state => state.app.isInitialized)
    const cards = useSelector<IAppStore, CardResponseType[]>(state => state.cards.cards)
    // const pack = useSelector<IAppStore, CardPacksType | null>(state => state.cards.currentPack)
    const status = useSelector<IAppStore, RequestStatusType>((state) => state.app.status);

    const getCard = (cards: CardResponseType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        // console.log('test: ', sum, rand, res)
        return cards[res.id + 1];
    }
    // const refresh = async () => {
    //     await dispatch(getPacksTC())
    // }


    useEffect(() => {

        if (packId && isInitialized) {
            dispatch(getCardsTC({cardsPack_id: packId}))
        }

        return () => {

            dispatch(setCardsAC({cards: []}))
        }

    }, [])


    const checkYourselfModeOn = () => {
        setCheckYourselfMode(true)
        setQuestionMode(false)
    }
    const checkYourselfModeOff = () => {
        setCheckYourselfMode(false)
        setQuestionMode(true)
    }

    useEffect(() => {
        cards && setCard(getCard(cards))
    }, [cards])


    if (!isInitialized) {
        return <Navigate to={'/login'}/>;
    }



    // if (status === 'loading') {
    //     return (
    //         <div
    //             style={{
    //                 position: 'fixed',
    //                 top: '30%',
    //                 textAlign: 'center',
    //                 width: '100%',
    //                 margin: 'auto',
    //                 borderRadius: '40%',
    //
    //             }}
    //         >
    //             <img src={quby2} height={'200px'} style={{
    //
    //
    //                 textAlign: 'center',
    //
    //                 margin: 'auto',
    //                 borderRadius: '40%',
    //
    //             }}/>
    //         </div>
    //     );
    // }

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: '30%',
                    textAlign: 'center',
                    width: '100%',
                    margin: 'auto',
                    borderRadius: '40%',
                }}
            >
                <img src={quby2} height={'200px'} style={{
                    textAlign: 'center',
                    margin: 'auto',
                    borderRadius: '40%',
                }}/>
            </div>

            {card && questionMode && <QuestionModal card={card}
                                                    packName={packName}
                                                    checkYourselfModeOn={checkYourselfModeOn}
                                                    questionMode={setQuestionMode}/>}
            {card && checkYourselfMode && <CheckYourself questionMode={setQuestionMode}
                                                         checkYourselfModeOff={checkYourselfModeOff}
                                                         card={card}
                                                         packName={packName}
            />}
        </>

    )


})
