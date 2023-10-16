import PropTypes from 'prop-types'
import { elementClasses } from '../lib/constants'

export function DrumPad({ id, keyTrigger, url, isPowerOff, onClick }) {
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
      />
    </button>
  )
}

DrumPad.propTypes = {
  id: PropTypes.string.isRequired,
  keyTrigger: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isPowerOff: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export function DrumPadsContainer({ children }) {
  return <div className={elementClasses.drumPadsContainer}>{children}</div>
}

DrumPadsContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}
