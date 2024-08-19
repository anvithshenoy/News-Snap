import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { searchNews } from '../../utils/fetchNews'
import SearchContext from './SearchContext'
import PropTypes from 'prop-types'

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: searchResults = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => searchNews(searchQuery),
    enabled: !!searchQuery,
    keepPreviousData: true,
    staleTime: 60000,
    cacheTime: 300000,
  })

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        loading: isLoading,
        error: error ? error.message : null,
        refetch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

SearchProvider.propTypes = {
  children: PropTypes.node,
}
