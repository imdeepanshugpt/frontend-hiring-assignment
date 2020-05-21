
import { getShifts } from '../../api/service';


export const getData = () => async (dispatch) => {
    const response = await getShifts();
    dispatch({
        type: 'GET_SHIFTS',
        payload: response.data
    });
}