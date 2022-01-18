import {CardsRange} from './Range/CardsRange';
import Search from './Search/Search';
import {ChooseOwner} from './ChooseOwner/ChooseOwner';
import {Pagination} from './Pagination/Pagination';
import {Table} from '../Table/Table';

export const PacksList = () => {
    return <div>
        <ChooseOwner/>
        <CardsRange/>
        <Search/>
        <Table/>
        <Pagination/>
    </div>
}