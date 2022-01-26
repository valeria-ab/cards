import { setMyCurrentGradeAC, updateGradeTC} from '../../BLL/cards/cards-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {GradeType} from '../../DAL/rateAPI';
import {IAppStore} from '../../BLL/store/store';


export const RateYourself = () => {
    const dispatch = useDispatch()
    const grade = useSelector<IAppStore, number>(state => state.cardsReducer.myCurrentGrade)
    return <div>
        <div>Rate yourself</div>
        <div><input type={'radio'} onClick={() => {
            dispatch(setMyCurrentGradeAC(1))
            console.log(grade)
        }}/><span>Did not know</span></div>
        <div><input type={'radio'}
                    onInput={() => {
                        dispatch(setMyCurrentGradeAC(2))
                        console.log(grade)
                    }}
        /><span>Forgot</span></div>
        <div><input type={'radio'}
                    onInput={() => {
                        dispatch(setMyCurrentGradeAC(3))
                        console.log(grade)
                    }}
        /><span>A lot of thoughts</span></div>
        <div><input type={'radio'} onInput={() => {
            dispatch(setMyCurrentGradeAC(4))
            console.log(grade)
        }}/><span>Confused</span></div>
        <div><input type={'radio'} onInput={() => {
            dispatch(setMyCurrentGradeAC(5))
            console.log(grade)
        }}/><span>Knew the answer</span></div>
        <button onClick={() => {
            console.log(grade)
            dispatch(updateGradeTC(grade, '61efb97f07698b170caca2f2'))
        }
        }>send</button>
    </div>
}
