/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { AuthContext } from './authContext';

const OwnerContext = createContext();

const OwnerProvider = ({ children }) => {
    const [owner, setOwner] = useState(false);
    const { user } = useContext(AuthContext);

    const onDetailsClick = async (ownerId) => {
        setOwner(user['_id'] == ownerId);
    };
    // const onBuyClick = async (formData) => {

    // };
    // console.log(owner);

    const ownerContext = {
        onDetailsClick,
        // onBuyClick,
        isOwner: !!owner
    };

    return (
        <OwnerContext.Provider value={ownerContext}>
            {children}
        </OwnerContext.Provider>
    );
};

export {
    OwnerContext,
    OwnerProvider
};