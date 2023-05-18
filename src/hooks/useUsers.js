import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'

export function useUsers () {
  const { isLoading: loading, isError: error, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['users'],
    fetchUsers,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }
  )
  return {
    loading,
    error,
    users: data?.pages?.flatMap(page => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage
  }
}
