/// <reference types="cypress" />
import { elementClasses, elementIds, elementTestIds, modes } from '../../src/lib/constants'

describe('Drum Machine', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.viewport('iphone-x')
  })

  it('App renders correctly', () => {
    cy.get(`#${elementIds.drumMachine}`).as('drumMachine')
    cy.get('@drumMachine').should('exist')
  })

  it('Power switch toggles', () => {
    cy.get(`[data-cy=${elementTestIds.powerSwitch}] label`).click()
    cy.get(`[data-cy=${elementTestIds.powerSwitch}] input`).should('be.checked')
  })

  it('Display should be empty when app starts', () => {
    cy.get(`#${elementIds.display}`).as('display')
    cy.get('@display').should('have.text', '')
  })

  it('Display should be empty when isPowerOff is true', () => {
    cy.get(`[data-cy=${elementTestIds.powerSwitch}] label`).click()
    cy.get(`[data-cy=${elementTestIds.powerSwitch}] input`).should('be.checked')
    cy.get(`#${elementIds.display}`).as('display')
    cy.get('@display').should('have.text', '')
  })

  it('Drum pad buttons should be enabled when power is on', () => {
    cy.get(`[data-cy=${elementTestIds.powerSwitch}] input`).should('not.be.checked')
    cy.get(`.${elementClasses.drumPad}`).should('not.be.disabled')
  })

  it('Drum pad buttons should be disabled when power is off', () => {
    cy.get(`[data-cy=${elementTestIds.powerSwitch}] label`).click()
    cy.get(`[data-cy=${elementTestIds.powerSwitch}] input`).should('be.checked')
    cy.get(`.${elementClasses.drumPad}`).should('be.disabled')
  })

  it('Volume should start in 50%', () => {
    cy.get(`.${elementClasses.volumeSlider}`).should('have.value', 50)
    cy.get(`.${elementClasses.drumPad} audio`).should('have.prop', 'volume', 0.5)
  })

  it('Volume should be 0% when power is off', () => {
    cy.get(`[data-cy=${elementTestIds.powerSwitch}] label`).click()
    cy.get(`[data-cy=${elementTestIds.powerSwitch}] input`).should('be.checked')
    cy.get(`.${elementClasses.volumeSlider}`).should('be.disabled')
    cy.get(`.${elementClasses.drumPad} audio`).should('have.prop', 'volume', 0)
  })

  it('When sound bank is changed, the display should update', () => {
    cy.get(`#${elementIds.display}`).as('display')

    cy.get(`[data-cy="${elementTestIds.soundBankSwitch}"] label`).click()
    cy.get(`[data-cy="${elementTestIds.soundBankSwitch}"] input`).should('be.checked')
    cy.get('@display').should('have.text', modes[1])

    cy.get(`[data-cy="${elementTestIds.soundBankSwitch}"] label`).click()
    cy.get(`[data-cy="${elementTestIds.soundBankSwitch}"] input`).should('not.be.checked')
    cy.get('@display').should('have.text', modes[0])
  })
})
