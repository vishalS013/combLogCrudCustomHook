import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';

const Login = () => {
    const { userLoggedIn } = useAuth();
    const [isSigningIn, setIsSigningIn] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            if (!isSigningIn) {
                setIsSigningIn(true);
                try {
                    await doSignInWithEmailAndPassword(values.email, values.password);
                } catch (error) {
                    setErrorMessage(error.message);
                    setIsSigningIn(false);
                }
            }
        },
    });

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="w-full h-screen flex self-center place-content-center place-items-center bg-gray-700">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl bg-slate-50">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Welcome Back</h3>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="space-y-5 ">
                        <div>
                            <label className="text-sm text-gray-600 font-extrabold">Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                {...formik.getFieldProps('email')}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-extrabold">Password</label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                {...formik.getFieldProps('password')}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    
                    <p className="text-center text-sm">Don't have an account? <Link to={'/register'} className="hover:underline font-extrabold">Sign up</Link></p>
                    <div className='flex flex-row text-center w-full'>
                        <div className='border-b-2 mb-2.5 mr-2 w-full'></div>
                        <div className='text-sm font-bold w-fit'>OR</div>
                        <div className='border-b-2 mb-2.5 ml-2 w-full'></div>
                    </div>
                    <button
                        disabled={isSigningIn}
                        onClick={onGoogleSignIn}
                        className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}>
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;
