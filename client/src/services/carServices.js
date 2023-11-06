import { get } from "./api";

const getAll = async () => {
    return await get('/jsonstore/cars/');
};

export {
    getAll,
};