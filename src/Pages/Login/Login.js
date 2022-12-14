import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const {signIn, googleSignIn} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();
    
    const from = location.state?.from?.pathname || '/';

    if(token){
        navigate(from, {replace: true});
    }

    const handleLogin = (data) => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                setLoginUserEmail(data.email);
            })
            .catch(err => {
                console.log(err);
                setLoginError(err.message);
            });
        }
        
        const handleGoogleLogin = () => {
            googleSignIn()
            .then(res => {
                const user = res.user;
                console.log(user.email);
                saveUser(user.displayName, user.email, 'buyer');
            })
            .catch(err => {
                console.log(err);
                setLoginError(err.message);
            });
    }

    const saveUser = (name, email, role) => {
        const user = {
            name: name,
            email: email,
            role: role
        }
        
        fetch('https://used-products-resale-market-server-side.vercel.app/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setLoginUserEmail(email);
        })

    }
    
    return (
        <div className='h-[540px] flex justify-center items-center'>
            <div className='w-96 p-8'>
                
                <h2 className='text-2xl text-center font-semibold'>Login</h2>
                
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control max-w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", {required: "Email Address is required"})} type="email" className="input input-bordered w-full"/>
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    
                    <div className="form-control max-w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password", 
                                    {
                                        required: "Password is required", 
                                        minLength: {value: 6, message: "Password must be atleast 6 characters"}
                                    })
                                } 
                        type="password" className="input input-bordered w-full"/>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                        
                        <input type="submit" value="Login" className="btn btn-accent my-4 text-base-100 w-full" />
                        {
                            loginError && <p className='text-red-600'>{loginError}</p>
                        }
                </form>
                
                    <p>Don't have an account? <Link to='/signup' className='text-secondary'>Create an Account</Link></p>
                    <div className='divider'>OR</div>
                    <button onClick={handleGoogleLogin} className='btn btn-outline w-full mt-4'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;