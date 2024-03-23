import { useEffect, useState } from 'react';
import BabNavbar from '../components/BabNavbar';
import dummy from '../db/waitdata.json';
import WaitBox from '../components/WaitBox';
import { useSelector } from 'react-redux';
import { selectId, selectToken } from '../redux/userSlice.js';
import { getBablist } from '../api/bablist.js';

function ConfirmBab() {
    const token = useSelector(selectToken);
    const userId = useSelector(selectId);

    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            if (token === null || userId === null) {
                return;
            }

            let response;

            try {
                response = await getBablist({
                    token,
                    userId,
                    state: 'PENDING',
                });
            } catch (e) {}

            setData(response);
        })();
    }, [token, userId]);

    return (
        <div>
            <BabNavbar />
            {data.map((item) => (
                <WaitBox key={item.id} event={item} />
            ))}
        </div>
    );
}

export default ConfirmBab;
