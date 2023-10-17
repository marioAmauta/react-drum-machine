import PropTypes from 'prop-types'
import { elementClasses } from '../lib/constants'
import { useEffect } from 'react'
import { setVolume } from '../lib/utils'

export function DrumPad({ id, keyTrigger, url, isPowerOff, currentVolume, onClick }) {
  useEffect(() => {
    setVolume({ volume: currentVolume })
  }, [currentVolume])

  return (
    <button
      id={id}
      className={elementClasses.drumPad}
      onClick={onClick}
      disabled={isPowerOff}
    >
      {keyTrigger}
      <audio
        id={keyTrigger}
        src={url}
        className={elementClasses.clip}
      />
    </button>
  )
}

DrumPad.propTypes = {
  id: PropTypes.string.isRequired,
  keyTrigger: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isPowerOff: PropTypes.bool.isRequired,
  currentVolume: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export function DrumPadsContainer({ children }) {
  return <div className={elementClasses.drumPadsContainer}>{children}</div>
}

DrumPadsContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}
