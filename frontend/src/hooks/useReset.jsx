import { useEffect } from 'react';

const useReset = (user, reset) => {
    useEffect(() => {
        reset(user);
    }, []); 
};

export default useReset;
