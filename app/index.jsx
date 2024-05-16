import React from 'react'
import { useGlobalContext } from '../context/GlobalProvider'
import Home from './home'

const Index = () => {
	const { isLoading } = useGlobalContext()
	return (
		<>
		{!isLoading && <Home />}
		</>
	)
}

export default Index