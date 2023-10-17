/// <reference types="cypress" />
import { elementClasses, elementIds, elementTestIds, modes, options } from '../../src/lib/constants'

describe('Drum Machine', () => {
  const defaultMode = modes[0]
  const optionOne = options[defaultMode]
  const lettersOrder = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']

  beforeEach(() => {
    cy.visit('/')
    cy.viewport('iphone-x')
  })

  it('App renders correctly', () => {
    cy.get(`#${elementIds.drumMachine}`).should('exist')
  })

  it('Should be able to see an outer container with a corresponding id="drum-machine" that contains all other elements', () => {
    cy.get(`#${elementIds.drumMachine}`).should('exist')
  })

  it('Within #drum-machine there should be an element with a corresponding id="display"', () => {
    cy.get(`#${elementIds.display}`).should('exist')
  })

  it(' Within #drum-machine I can see 9 clickable drum pad elements, each with a class name of drum-pad, a unique id that describes the audio clip the drum pad will be set up to trigger, and an inner text that corresponds to one of the following keys on the keyboard: Q, W, E, A, S, D, Z, X, C. The drum pads MUST be in this order', () => {
    cy.get(`.${elementClasses.drumPad}`).should('have.length', 9)

    cy.get(`.${elementClasses.drumPad}`).each(($el, index) => {
      cy.wrap($el).should('have.attr', 'id', optionOne[index].id)
      cy.wrap($el).should('have.text', lettersOrder[index])
    })
  })

  it('Within each .drum-pad, there should be an HTML5 audio element which has a src attribute pointing to an audio clip, a class name of clip, and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.)', () => {
    cy.get(`.${elementClasses.drumPad}`).each(($el, index) => {
      cy.wrap($el).children('audio').should('have.attr', 'src', optionOne[index].url)
      cy.wrap($el).children('audio').should('have.attr', 'class', elementClasses.clip)
      cy.wrap($el).children('audio').should('have.attr', 'id', $el.text())
    })
  })

  it('When I click on a .drum-pad element, the audio clip contained in its child audio element should be triggered.', () => {
    cy.get(`.${elementClasses.drumPad}`).each($el => {
      cy.wrap($el).click()
      cy.wrap($el).children('audio').should('have.prop', 'paused', false)
    })
  })

  it('When I press the trigger key associated with each .drum-pad, the audio clip contained in its child audio element should be triggered (e.g. pressing the Q key should trigger the drum pad which contains the string Q, pressing the W key should trigger the drum pad which contains the string W, etc.)', () => {
    lettersOrder.forEach(letter => {
      cy.get('body').trigger('keydown', {
        key: letter
      })
      cy.get(`#${letter}`).should('have.prop', 'paused', false)
    })
  })

  it(' When a .drum-pad is triggered, a string describing the associated audio clip is displayed as the inner text of the #display element (each string must be unique).', () => {
    cy.get(`.${elementClasses.drumPad}`).each(($el, index) => {
      const formattedText = optionOne[index].id.replaceAll('-', ' ')

      cy.wrap($el).click()
      cy.get(`#${elementIds.display}`).should('have.text', formattedText)
    })
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
