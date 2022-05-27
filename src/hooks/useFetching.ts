import {useEffect, useState} from 'react'

export const useFetching = <T>(callback: () => Promise<T>)  => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<T | []>([])

  const fetching= async () => {
    try {
      setIsLoading(true)
      setData(await callback())
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetching()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [data, isLoading, error]
}