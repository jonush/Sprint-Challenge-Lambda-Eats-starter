import { v4 as uuid } from 'uuid'

const name = uuid().slice(0, 5);
const size = 'large';
const special = 'Extra sauce please';

describe('test for pizza form', () => {
    it('should load the webpage', () => {
        cy.visit('http://localhost:3000/pizza')
        cy.url().should('include', 'localhost')
    })

    it('should allow for adding text to the input', () => {
        cy.get('input[name="name"]')
            .type(name)
            .should('have.value', name)
        
        cy.get('select[name="size"]')
            .select(size)
            .should('have.value', size)
        
        cy.get('input[name="cheese"]')
            .check()

        cy.get('input[name="bacon"]')
            .check()

        cy.get('input[name="special"]')
            .type(special)
            .should('have.value', special)

        cy.contains('Submit Order')
            .click()
    })
})