import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import Layout from './layout'
import EntityAddEdit from './entity/add_edit'
import EntityListing from './entity/listing'
import AddSchema from './schema/add'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<App />} />
                <Route path="/:entityType/listing" element={<EntityListing />} />
                <Route path="/:type/add" element={<EntityAddEdit />} />
                <Route path="/:type/edit/:id" element={<EntityAddEdit />} />


                <Route path="/schemas/add" element={<AddSchema />} />
                <Route path="/schemas/edit/:id" element={<AddSchema />} />

            </Route>
        </Routes>
    )
}
