import { useEffect, useState } from "react";

const useToken = (email) => {
    const [token, setToken] = useState('');
    console.log('inside useToken', email);
    
    useEffect(() => {
        if(email){
            fetch(`https://used-products-resale-market-server-side.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if(data.accessToken){
                    localStorage.setItem('token', data.accessToken);
                    setToken(data.accessToken);
                }
            });
        }
    }, [email]);
    return [token];
}

export default useToken;