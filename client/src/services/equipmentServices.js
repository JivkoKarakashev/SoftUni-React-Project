import { get } from "./api";

const getAllEquipment = async () => {
    const equipment = await get('/jsonstore/equipment');
    return equipment;
};

// const getByCarId = async (carId) => {
//     try {
//         const equipment = Object.values(await getAll()).filter(e => e['carId'].includes(carId));
//         // const obj = Object.assign({}, equipment);
//         // console.log(equipment);
//         return equipment;
//     } catch (err) {
//         console.log(err.message);
//         throw err;
//     }
// };

// const updateByCarId = async (carId, data) => {
//     const car = await get(``)
//     const result = await put(`/jsonstore/cars`, { make, model, mileage, fuel, year, location, image, price });
//     return result;
// };

export {
    getAllEquipment,
    // getByCarId,
    // updateByCarId,
};