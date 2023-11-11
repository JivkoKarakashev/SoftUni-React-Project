import { get } from "./api";

const getAllEquipment = async () => {
    const equipment = await get('/jsonstore/equipment');
    return equipment;
};

export {
    getAllEquipment,
};