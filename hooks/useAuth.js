import React from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react/cjs/react.development'
import * as Google from 'expo-google-app-auth';
import {
    onAuthStateChanged,
    signInWithCredential,
    GoogleAuthProvider,
    signOut

} from 'firebase/auth'
import { auth } from '../Firebase';

const AuthContext = createContext({})

const config = {
    iosClientId: '558902605128-ecv88scmiu1uhc5g4dqf1p6ig5q0inkk.apps.googleusercontent.com',
    androidClientId: '558902605128-6l0dn9ffslm2lgj8n4dgbbe0str90ruv.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"]
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingState, setLoadingState] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() =>
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            setLoading(false)
        })
        , [])

    const signInWithGoogle = async () => {

        setLoadingState(true)

        await Google.logInAsync(config)
            .then(async (logInResult) => {
                if (logInResult.type === 'success') {

                    const { idToken, acessToken } = logInResult
                    const credential = GoogleAuthProvider.credential(idToken, acessToken)
                    await signInWithCredential(auth, credential)
                }

                return Promise.reject()

            }).catch((err) => setError(err))
            .finally(() => setLoadingState(false))
    }

    const logout = () => {
        setLoadingState(true)
        signOut(auth)
            .catch((err) => setError(err))
            .finally(() => setLoadingState(false))
    }

    const memoedValue = useMemo(() => ({
        user: user,
        loadingState,
        error,
        signInWithGoogle,
        logout,
    }), [user, loadingState, error])

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}