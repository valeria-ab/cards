
import Search from './Search/Search';
import {ChooseOwner} from './ChooseOwner/ChooseOwner';
import {Pagination} from './Pagination/Pagination';
import {Table} from '../Table/Table';
import RangeSlider from './Range/RangeSlider';


export const PacksList = () => {
    return <div>
        <ChooseOwner/>
        <RangeSlider/>
        <Search/>
        <Table onClickCardsHandler={() => {} } />

    </div>
}