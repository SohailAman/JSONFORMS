import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import Layout from './layout'
import AddUsers from './users/add'
import Users from './users/listing'
import AddSchema from './schema/add'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<App />} />
                <Route path="/users" element={<Users />} />
                <Route path="/:type/add" element={<AddUsers />} />


                <Route path="/schema/add" element={<AddSchema />} />

            </Route>
        </Routes>
    )
}
