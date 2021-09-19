import { useRef, useEffect } from 'react'

export const usePrevious = (value, initialValue = null) => {
  const ref = useRef(initialValue)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => { savedCallback.current = callback }, [callback])

  useEffect(() => {
    const tick = () => { savedCallback.current() }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
