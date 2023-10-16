import { useEffect, useState } from 'react'
import { options } from '../lib/constants'
import { playSound } from '../lib/utils'

export function usePower({ setDisplayContent, currentSoundBank }) {
  const [isPowerOff, setIsPowerOff] = useState(false)

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key.toUpperCase()
      const isKeyValid = options[currentSoundBank].find(({ keyTrigger }) => keyTrigger === key)

      if (isKeyValid) {
        const selectedSoundName = isKeyValid.id.replaceAll('-', ' ')

        playSound({ id: key })
        setDisplayContent(selectedSoundName)
      }
    }

    if (isPowerOff) {
      setDisplayContent('')
      return () => document.removeEventListener('keydown', event => handleKeyDown(event))
    } else {
      document.addEventListener('keydown', event => handleKeyDown(event))
    }
  }, [isPowerOff, currentSoundBank, setDisplayContent])

  return {
    isPowerOff,
    setIsPowerOff
  }
}
