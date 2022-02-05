import {setMyCurrentGradeAC, updateGradeTC} from '../../BLL/cards/cards-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {FormEvent, useState} from 'react';
import {GradeType} from '../../DAL/rateAPI';
import {IAppStore} from '../../BLL/store/store';
import styles from './Rate.module.scss';
import {signIn} from '../../BLL/login/loginThunk';


export const RateYourself = () => {
    const dispatch = useDispatch()
    const grade = useSelector<IAppStore, number>(state => state.cardsReducer.myCurrentGrade)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return <div className={styles.rateYourselfBlock}>
        <div className={styles.title}>Rate yourself:</div>
        <div className={styles.radioButtons}>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type={'radio'}
                           checked={grade===1}
                           onClick={() => {
                               dispatch(setMyCurrentGradeAC(1))
                           }}
                    />
                    <span>Did not know</span>
                </div>
                <div>
                    <input type={'radio'}
                           checked={grade===2}
                           onClick={() => {
                               dispatch(setMyCurrentGradeAC(2))
                           }}
                    />
                    <span>Forgot</span>
                </div>
                <div>
                    <input type={'radio'}
                           checked={grade===3}
                           onClick={() => {
                               dispatch(setMyCurrentGradeAC(3))
                           }}
                    />
                    <span>A lot of thoughts</span>
                </div>
                <div>
                    <input type={'radio'}
                           checked={grade===4}
                           onClick={() => {
                               dispatch(setMyCurrentGradeAC(4))
                           }}
                    />
                    <span>Confused</span>
                </div>
                <div>
                    <input type={'radio'}
                           checked={grade===5}
                           onClick={() => {
                               dispatch(setMyCurrentGradeAC(5))
                           }}
                    />
                    <span>Knew the answer</span>
                </div>
            </form>
        </div>
        {/*<button onClick={() => {*/}
        {/*    console.log(grade)*/}
        {/*    dispatch(updateGradeTC(grade, '61efb97f07698b170caca2f2'))*/}
        {/*}*/}
        {/*}>send*/}
        {/*</button>*/}
    </div>
}
