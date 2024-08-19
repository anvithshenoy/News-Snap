import { useQuery } from '@tanstack/react-query'
import { fetchNews } from '../../utils/fetchNews'
import PropTypes from 'prop-types'
import { useState } from 'react'
import CategoryContext from './CategoryContext'

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['news', selectedCategory],
    queryFn: () => fetchNews(selectedCategory),
    enabled: !!selectedCategory,
    keepPreviousData: true,
    staleTime: 60000,
    cacheTime: 300000,
  })

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        articles,
        loading: isLoading,
        error: error ? error.message : null,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

CategoryProvider.propTypes = {
  children: PropTypes.node,
}
