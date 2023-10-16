import { elementClasses, modes, options } from '../lib/constants'
import { DrumPad } from './DrumPad'

describe('<DrumPad />', () => {
  const option1 = options[modes[0]][0]

  const DrumPadData = {
    id: option1.id,
    keyTrigger: option1.keyTrigger,
    url: option1.url,
    isPowerOff: false,
    onClick: () => {}
  }

  it('mounts correctly', () => {
    cy.mount(<DrumPad {...DrumPadData} />)
    cy.get(`.${elementClasses.drumPad}`).should('exist')
  })

  it('should have the correct id', () => {
    cy.mount(<DrumPad {...DrumPadData} />)
    cy.get(`.${elementClasses.drumPad}`).should('have.id', option1.id)
  })

  it('audio element should have the correct id', () => {
    cy.mount(<DrumPad {...DrumPadData} />)
    cy.get(`.${elementClasses.drumPad} audio`).should('have.id', option1.keyTrigger)
  })

  it('should be enabled when isPowerOff is false', () => {
    cy.mount(<DrumPad {...DrumPadData} />)
    cy.get(`.${elementClasses.drumPad}`).should('not.be.disabled')
  })

  it('should be disabled when isPowerOff is true', () => {
    cy.mount(
      <DrumPad
        {...DrumPadData}
        isPowerOff
      />
    )
    cy.get(`.${elementClasses.drumPad}`).should('be.disabled')
  })
})
