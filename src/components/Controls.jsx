import PropTypes from 'prop-types';
import { elementClasses } from '../lib/constants';

export function Controls({ children }) {
  return <header className={elementClasses.controls}>{children}</header>;
}

Controls.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export function ControlsSection({ children, title }) {
  return (
    <section className={elementClasses.controlsSection}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

ControlsSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};
