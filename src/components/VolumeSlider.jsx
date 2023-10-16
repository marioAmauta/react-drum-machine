import PropTypes from 'prop-types'
import { elementClasses } from '../lib/constants'

export function VolumeSlider({ isDisabled, currentVolume, onVolumeChange }) {
  return (
    <input
      type='range'
      className={elementClasses.volumeSlider}
      disabled={isDisabled}
      value={currentVolume}
      onChange={onVolumeChange}
    />
  )
}

VolumeSlider.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  currentVolume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired
}
