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
    // console.log(owner);

    const ownerContext = {
        onDetailsClick,
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