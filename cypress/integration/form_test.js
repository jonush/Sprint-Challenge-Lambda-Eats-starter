describe('test for pizza form', () => {
    it('should load the webpage', () => {
        cy.visit('http://localhost:3000/pizza')
    })

    it('should allow for adding text to the input', () => {
        cy.get('input["name: name"]')
    })
})