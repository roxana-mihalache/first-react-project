import { useRecoilState } from 'recoil';
import { useIntl } from 'react-intl';
import { searchAtom } from '../searhAtom';


export const Search = () => {
    const intl = useIntl();
    const [searchTerm, setSearchTerm] = useRecoilState(searchAtom);

    return (
        <input
            type="text"
            placeholder={intl.formatMessage({ id: 'search' })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
                padding: '8px',
                width: '100%',
                maxWidth: '300px',
                borderRadius: '4px',
                border: '1px solid #ccc',
            }}
        />
    );
};