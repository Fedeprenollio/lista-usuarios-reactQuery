/* eslint-disable react/react-in-jsx-scope */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { useUsers } from './hooks/useUsers'
import { Results } from './components/Results'

export const SortBy = {
  NONE: 'none',
  NAME: 'name',
  LAST: 'last',
  COUNTRY: 'country'

}

function App () {
  const { loading, error, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  // ESTO LO EVITO AL USAR REAC QUERIES
  // const [error, setError] = useState(false)
  // const [loading, setLoading] = useState(false)
  // const [users, setUsers] = useState([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState(null)
  // const originalUsers = useRef([])
  const [currentePage, setCurrentePage] = useState(1)

  // CON QUERY REACT YA NO NECESITO EL USE EFECT
  // useEffect(() => {
  //   setLoading(true)
  //   setError(false)

  //   fetchUsers(currentePage)
  //     .then(users => {
  //       setUsers(prevState => {
  //         const newUsers = prevState.concat(users)
  //         originalUsers.current = newUsers
  //         return newUsers
  //       })
  //     })
  //     .catch(error => {
  //       setError(error)
  //       console.error(error)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [currentePage])

  const handleChangeSort = (sort) => {
    setSorting(sort)
  }
  const toogleColors = () => {
    setShowColors(!showColors)
  }
  const toogleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
    // setSorting(prevState => !prevState)
  }

  const handleDeleteUser = (uuid) => {
    // const newList = users.filter(user => user.login.uuid !== uuid)
    // setUsers(newList)
  }
  const handleReset = async () => {
    // setUsers(originalUsers.current)
    await refetch()
  }

  const handleFilterCountries = (e) => {
    const value = e.target.value
    setFilterCountry(value)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry?.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  // MODO INCORRECTO PORQUE SORT DEVUELVE UN NUEVO ARRAY, MUTA EL ORIGNAL
  // const sortedUsersByCountry = sortByCountry
  //   ? users.sort((a, b) => {
  //     return a.location.country.localeCompare(b.location.country)
  //   })
  //   : users

  // ES BUENA OPCION; ÞERO HACE UNA COPIA PROFUNDA CON EL STRUCTURECLONE
  // const sortedUsersByCountry = sortByCountry
  //   ? structuredClone(users).sort((a, b) => {
  //     return a.location.country.localeCompare(b.location.country)
  //   })
  //   : users

  // const sortedUsersByCountry = sortByCountry
  //   ? [...users].sort((a, b) => {
  //       return a.location.country.localeCompare(b.location.country)
  //     })
  //   : users

  // MODO CORRECTO
  // A DIFERENCIA DEL SORT, TOSORTED no muta el array original
  // const sortedUsersByCountry = sortByCountry
  //   ? filteredUsers.toSorted((a, b) => {
  //     return a.location.country.localeCompare(b.location.country)
  //   })
  //   : users

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers
    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    }
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.first.localeCompare(b.name.first)
      })
    }
    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.last.localeCompare(b.name.last)
      })
    }
  }, [filteredUsers, sorting])
  return (
    <>
      <h1>Buscador de usuarios</h1>
      <Results />
      <header>
        <button onClick={toogleColors}>Colorear filas</button>
        <button onClick={toogleSortByCountry}>{sorting === SortBy.COUNTRY ? 'No ordenar por pais' : 'Ordenar por pais'}</button>
        <button onClick={handleReset}>Restaurar lista original</button>
        <input placeholder='Escribe un pais' onChange={handleFilterCountries} type='search' />
      </header>
      <main>
        {users?.length > 0 &&
          <UsersList changeSorting={handleChangeSort} handleDeleteUser={handleDeleteUser} showColors={showColors} users={sortedUsers} />}
        {loading && <p>Cargando...</p>}
        {error && <p>Error en la carga.  </p>}
        {!loading && !error && users.length === 0 && <p> No hay usuarios por mostrar</p>}

        {!loading && !error && users.length > 0 && hasNextPage &&
          <button onClick={() => fetchNextPage()}>Cargar mas usuarios</button>}
        {/* <button onClick={() => setCurrentePage(prevState => prevState + 1)}>Cargar mas usuarios</button>} */}

      </main>
    </>
  )
}

export default App
