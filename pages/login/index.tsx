import React from 'react';
import authentication from '../../api/client/authApi';
import momoAuthApi from '../../api/client/_momoAuthApi';

function index(props) {
    const handleLogin = async () => {
        try {
            const res = await momoAuthApi.login({
                name: "n",
                email: "ngoctoan06011998@gmail.com",
                phone: "0392645745"
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            index
        </div>
    );
}

export default index;