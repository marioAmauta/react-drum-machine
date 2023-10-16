import PropTypes from 'prop-types'
import { elementClasses, elementIds } from '../lib/constants'

export function Display({ displayContent }) {
  return (
    <div
      id={elementIds.display}
      className={elementClasses.display}
    >
      {displayContent}
    </div>
  )
}

Display.propTypes = {
  displayContent: PropTypes.string.isRequired
}
