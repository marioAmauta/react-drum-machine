import PropTypes from 'prop-types';

export function Switch({ isInactive, handleChange, id, isDisabled }) {
  return (
    <form className='switch'>
      <label
        htmlFor={id}
        className={`switch ${isInactive ? 'off' : ''}`}
      >
        <span className={`switch-indicator ${isInactive ? 'off' : ''}`} />
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
  id: PropTypes.string.isRequired,
  isInactive: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
};
