import {sendCardGradeTC} from '../../BLL/cards/cards-reducer';
import {useDispatch} from 'react-redux';

export const RateYourself = () => {
    const dispatch = useDispatch()
    return <div>
        <div>Rate yourself</div>
        <div><input type={'radio'}/><span>Did not know</span></div>
        <div><input type={'radio'}/><span>Forgot</span></div>
        <div><input type={'radio'}/><span>A lot of thoughts</span></div>
        <div><input type={'radio'}/><span>Confused</span></div>
        <div><input type={'radio'}/><span>Knew the answer</span></div>
        <button onClick={() => dispatch(sendCardGradeTC(2, "61efb97f07698b170caca2f2"))}>send</button>
    </div>
}

// token: "a69a45b0-7ddf-11ec-ad9b-3d93d14abfb7"
// tokenDeathTime: 1643126806795
// updatedGrade:
// updatedGrade:



//     card_id: "61efb97f07698b170caca2f2"
// cardsPack_id: "61e948fe5ecaae38609a5f59"
// created: "2022-01-25T13:06:47.072Z"
// grade: 2
// more_id: "61dd727f9723a50004d2f82a"
// shots: 1
// updated: "2022-01-25T13:06:47.072Z"
// user_id: "61dd727f9723a50004d2f82a"
// __v: 0
// _id: "61eff5e7c2f82900045142f9"