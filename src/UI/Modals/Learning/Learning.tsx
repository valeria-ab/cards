import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {CardResponseType} from '../../../DAL/cards-api';
import {CardPacksType} from '../../../DAL/packs-api';
import {QuestionModal} from './QuestionModal';
import {CheckYourself} from '../Rate/CheckYourself';

export const Learning = () => {
    const {learningPackId} = useParams()
    const dispatch = useDispatch()
    const [card, setCard] = useState<CardResponseType>({} as CardResponseType);
    const [checkYourselfMode, setCheckYourselfMode] = useState<boolean>(false);
    const [questionMode, setQuestionMode] = useState<boolean>(true);

    const cards = useSelector<IAppStore, CardResponseType[]>(state => state.cards.cards)
    const pack = useSelector<IAppStore, CardPacksType | null>(state => state.cards.currentPack)
    const appLoading = useSelector<IAppStore, boolean>(state => state.app.isLoading)

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

    const checkYourselfModeOn = () => {
        setCheckYourselfMode(true)
        setQuestionMode(false)
    }
    const checkYourselfModeOff = () => {
        setCheckYourselfMode(false)
        setQuestionMode(true)
        setCard(getCard(cards))
    }


    useEffect(() => {
        setCard(getCard(cards))
    }, [])

    if (appLoading) return <div>loading...</div>

    return (
        <>
            {pack && questionMode && <QuestionModal card={card}
                                                    pack={pack}
                                                    checkYourselfModeOn={checkYourselfModeOn}
                                                    questionMode={setQuestionMode}/>}
            {pack && checkYourselfMode && <CheckYourself questionMode={setQuestionMode}
                                                         checkYourselfModeOff={checkYourselfModeOff}
                                                         card={card}
                                                         pack={pack}
            />}

        </>

    )


}
