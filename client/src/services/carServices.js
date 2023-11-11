import { get, post, put } from "./api";

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

const updateEquipmentByCarId = async (carId, equipment) => {
    const result = await put(`/jsonstore/cars/${carId}/equipmentId`, [...equipment]);
    return result;
};

export {
    getAll,
    getCarById,
    create,
    updateEquipmentByCarId
};