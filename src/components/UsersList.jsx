/* eslint-disable react/prop-types */
import React from 'react'
import { SortBy } from '../App'

export const UsersList = ({ changeSorting, handleDeleteUser, users, showColors }) => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Foto</th>
          <th className='pointer' onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
          <th className='pointer' onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
          <th className='pointer' onClick={() => changeSorting(SortBy.COUNTRY)}>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => {
          const backgraunColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgraunColor : 'transparent'
          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user?.picture.thumbnail} alt={`Imagen de ${user.name.last}`} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.login.uuid)}>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// table, thead , tbody
// tr ===> row
// td ===> celda
