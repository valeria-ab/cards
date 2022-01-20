import s from "./MainHeader.module.scss";
import PackListIcon from "../../image/PacksListImg.png"
import ProfileIcon from "../../image/ProfileImg.png"

export default function MainHeader() {


    return (
        <div className={s.MainHeader}>
                <div className={s.wrapper}>
                    <h1 className={s.title}>It-incubator</h1>
                    <div className={s.btnWrap}>
                        <button className={s.btn}>
                            <img className={s.btnImg} src={PackListIcon} alt='PacksListIcon'></img>
                            <span className={s.btnText}>Packs List</span>
                        </button>
                        <button className={s.btn}>
                            <img className={s.btnImg} src={ProfileIcon} alt='ProfileIcon'></img>
                            <span className={s.btnText}>Profile</span>
                        </button>
                    </div>
            </div>
        </div>
    );
};


