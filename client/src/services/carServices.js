import { get, post } from "./api";

const getAll = async () => {
    const ads = await get('/jsonstore/cars');
    return ads;
};

const getCarById = async (carId) => {
    try {
        const ad = await get(`/jsonstore/cars/${carId}`);
        return ad;        
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

const create = async (data) => {
    const { make, model, mileage, fuel, year, location, image, price } = data;

    if (make == '' || model == '' || mileage == '' || fuel == '' || year == '' || location == '' || image == '' || price == '') {
        return alert('All fields are required!')
    }
    const result = await post('/jsonstore/cars', { make, model, mileage, fuel, year, location, image, price });
    return result;
};

// const getEquipmentByCarId = async (carId) => {
//     try {
//         const equipmentIds = await get(`/jsonstore/cars/${carId}/equipmentId`);
//         // console.log(equipmentIds);
//         return equipmentIds;
//     } catch (err) {
//         console.log(err.message);
//         throw err;
//     }
// };

export {
    getAll,
    getCarById,
    create,
    // getEquipmentByCarId
};