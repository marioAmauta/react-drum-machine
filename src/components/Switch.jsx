import PropTypes from 'prop-types';
import { elementClasses } from '../lib/constants';

export function Switch({ testId, id, isInactive, isDisabled, handleChange }) {
  return (
    <form data-cy={testId}>
      <label
        htmlFor={id}
        className={`${elementClasses.switch} ${isInactive ? elementClasses.off : ''}`}
      >
        <span
          className={`${elementClasses.switchIndicator} ${isInactive ? elementClasses.off : ''}`}
        />
      </label>
      <input
        disabled={isDisabled}
        type='checkbox'
        id={id}
        onChange={handleChange}
      />
    </form>
  );
}

Switch.propTypes = {
  testId: PropTypes.string,
  id: PropTypes.string.isRequired,
  isInactive: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
};
