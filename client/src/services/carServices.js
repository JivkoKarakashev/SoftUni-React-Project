import { get, post } from "./api";

const getAll = async () => {
    const ads = await get('/jsonstore/cars');
    return ads;
};

const getOne = async (carId) => {
    const ad = await get(`/jsonstore/cars/${carId}`);
    return ad;
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