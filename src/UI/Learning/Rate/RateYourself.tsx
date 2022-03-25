import {useDispatch, useSelector} from 'react-redux';
import React, {FormEvent} from 'react';
import s from './Rate.module.scss';
import {setMyCurrentGradeAC} from '../../../BLL/cards/cards-reducer';
import {IAppStore} from '../../../BLL/store/store';


export const RateYourself = React.memo(() => {
    const dispatch = useDispatch()
    const grade = useSelector<IAppStore, number>(state => state.cards.myCurrentGrade)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return <div className={s.rateYourselfBlock}>
        <div className={s.title}>Rate yourself:</div>
        <div className={s.radioButtons}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input type={'radio'}
                               checked={grade === 1}
                               onChange={() => {
                                   dispatch(setMyCurrentGradeAC(1))
                               }}
                        />
                        <span>Did not know</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type={'radio'}
                               checked={grade === 2}
                               onChange={() => {
                                   dispatch(setMyCurrentGradeAC(2))
                               }}
                        />
                        <span>Forgot</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type={'radio'}
                               checked={grade === 3}
                               onChange={() => {
                                   dispatch(setMyCurrentGradeAC(3))
                               }}
                        />
                        <span>A lot of thoughts</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type={'radio'}
                               checked={grade === 4}
                               onChange={() => {
                                   dispatch(setMyCurrentGradeAC(4))
                               }}
                        />
                        <span>Confused</span>
                    </label>
                </div>
                <div>
                    <label>
                        <input type={'radio'}
                               checked={grade === 5}
                               onChange={() => {
                                   dispatch(setMyCurrentGradeAC(5))
                               }}
                        />
                        <span>Knew the answer</span>
                    </label>
                </div>
            </form>
        </div>
    </div>
})