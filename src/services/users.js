export const fetchUsers = async ({ pageParam }) => {
  return await fetch(`https://randomuser.me/api?results=10&seed=semilla&page=${pageParam}`)
    .then(async res => {
      if (!res.ok) {
        throw new Error('Error en la petición')
      }
      return await res.json()
    })
    .then(data => {
      console.log(data)
      const currentPage = data.info.page
      console.log(currentPage)
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1
      return {
        users: data.results,
        nextCursor
      }
    })
}
