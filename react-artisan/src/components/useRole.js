import {useState} from 'react';

export default function useRole() {
    const [role, setRole] = useState(null);
    
    const saveRole = (userRole) => {
        setRole(userRole);
    }
    return {
        setRole: saveRole,
        role
    }
}