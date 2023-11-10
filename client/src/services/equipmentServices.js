import { get } from "./api";

const getAll = async () => {
    const equipment = await get('/jsonstore/equipment');
    return equipment;
};

const getByCarId = async (carId) => {
    try {
        const equipment = Object.values(await getAll()).filter(e => e['carId'].includes(carId));
        // const obj = Object.assign({}, equipment);
        // console.log(equipment);
        return equipment;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

export {
    getAll,
    getByCarId,
};