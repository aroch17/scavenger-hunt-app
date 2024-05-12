import React from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import Home from './home'
import Hunts from './(host-view)/hunts'
import Profile from './(host-view)/profile'

const Index = () => {
	const { isLoggedIn, isLoading } = useGlobalContext()
	return (
		<>
		{!isLoading && isLoggedIn ? <Profile /> : <Home />}
		</>
	)
}

export default Index