import React from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import Home from './home'
import Profile from './profile'

const Index = () => {
	const { isLoggedIn, isLoading } = useGlobalContext()
	return (
		<>
		{!isLoading && isLoggedIn ? <Profile /> : <Home />}
		</>
	)
}

export default Index