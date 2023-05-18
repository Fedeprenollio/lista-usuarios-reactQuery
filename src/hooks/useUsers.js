import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'
import { useEffect, useRef, useState } from 'react'


export function useUsers () {
  const originalUsers = useRef([])
  const [users, setUsers] = useState([])
  const { isLoading: loading, isError: error, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['users'],
    fetchUsers,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }
  )

  useEffect(() => {
    setUsers(data?.pages?.flatMap(page => page.users) ?? [])
    originalUsers.current = data?.pages?.flatMap(page => page.users)
  }, [data])
  
  return {
    loading,
    error,
    users,
    refetch,
    fetchNextPage,
    hasNextPage,
    setUsers,
    originalUsers
    
  }
}
