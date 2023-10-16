import { useEffect, useState } from 'react'
import { modes } from '../lib/constants'

export function useSoundBank() {
  const [isSoundBankTwo, setIsSoundBankTwo] = useState(false)
  const [currentSoundBank, setCurrentSoundBank] = useState(modes[0])

  useEffect(() => {
    if (isSoundBankTwo) {
      setCurrentSoundBank(modes[1])
    } else {
      setCurrentSoundBank(modes[0])
    }
  }, [isSoundBankTwo])

  return {
    currentSoundBank,
    isSoundBankTwo,
    setIsSoundBankTwo
  }
}
