describe('Login', () => {
    it('POST - Authentication', () => {
      cy.request({
        method: 'POST',
        url: '/auth/login',
        body: {
            email: "cartos@admin.com",
            password: "admin"
        },
        headers: { 
            origin: 'https://backoffice.dev.cartos.solutions'}
      }).then((response ) => {
        expect(response.status).to.eq(200)
        expect(response.body.token).to.exist
        Cypress.env('access_token', response.body.token)
      })
    })
    it('GET - List User', () => {
        const token = Cypress.env('access_token')
        cy.request({
          method: 'GET',
          url: '/digital-account/v1/backoffice/users?bankId=001',
          headers: { 
              Authorization: `Bearer ${token}`
            }
        }).then((response ) => {
          expect(response.status).to.eq(200)
         expect(response.body).to.exist
        })
      })
  })