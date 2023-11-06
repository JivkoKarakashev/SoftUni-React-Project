import { get, post } from "./api";

const getAll = async () => {
    return await get('/jsonstore/cars');
};

const getOne = async (carId) => {
    return await get(`/jsonstore/cars/${carId}`)
};

const create = async (data) => {
    const { make, model, mileage, fuel, year, location, image, price } = data;

    if (make == '' || model == '' || mileage == '' || fuel == '' || year == '' || location == '' || image == '' || price == '') {
        return alert('All fields are required!')
    }
    const result = await post('/jsonstore/cars', { make, model, mileage, fuel, year, location, image, price });
    return result;
};

export {
    getAll,
    getOne,
    create,
};