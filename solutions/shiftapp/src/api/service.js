import Shift from './shiftAPI';


const getShifts = async () => {
    const response = await Shift.get('/shifts');
    return response;
}

const bookShift = async (id, ) => {
    const response = await Shift.post(`/shifts/${id}/book`);
    return response;
}

const cancelShift = async (id) => {
    const response = await Shift.post(`/shifts/${id}/cancel`);
    return response;
}

export { getShifts, bookShift, cancelShift };