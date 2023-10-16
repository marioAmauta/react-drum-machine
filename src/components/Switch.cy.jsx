import { elementClasses } from '../lib/constants';
import { Switch } from './Switch';

describe('<Switch />', () => {
  const testId = 'switch';

  beforeEach(() => {
    cy.mount(<Switch testId={testId} />);
    cy.get(`[data-cy=${testId}] label`).as('switch');
    cy.get(`[data-cy=${testId}] span`).as('switchIndicator');
    cy.get(`[data-cy=${testId}] input`).as('hiddenCheckbox');
  });

  it('mounts correctly', () => {
    cy.get('@switch').should('exist');
    cy.get('@switchIndicator').should('exist');
  });

  it('renders with the correct class when isInactive is false', () => {
    cy.get('@switch').should('have.class', elementClasses.switch);
    cy.get('@switchIndicator').should('have.class', elementClasses.switchIndicator);
  });

  it('renders with the correct class when isInactive is true', () => {
    cy.mount(
      <Switch
        testId={testId}
        isInactive
      />
    );
    cy.get('@switch').should('have.class', elementClasses.off);
    cy.get('@switchIndicator').should('have.class', elementClasses.off);
  });

  it('switch indicator is disabled when isDisabled is true', () => {
    cy.mount(
      <Switch
        testId={testId}
        isDisabled
      />
    );
    cy.get('@hiddenCheckbox').should('be.disabled');
  });
});
