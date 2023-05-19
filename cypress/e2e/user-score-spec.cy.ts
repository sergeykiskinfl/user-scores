// @ts-nocheck
describe("user-score stub", () => {
  const sizes = [
    [375, 670],
    [390, 844],
  ];

  beforeEach(() => {
    cy.intercept("https://random-data-api.com/api/users/random_user?size=3", {
      fixture: "random_user.json",
    }).as("getUsers");

    cy.viewport(1920, 1080);
    cy.visit("http://localhost:4173/");
  });

  it("Screen resolution test", () => {
    cy.log("Pass main page");
    cy.wait("@getUsers");
    cy.wait(1000);
    for (let i = 0; i < sizes.length; i++) {
      cy.viewport(sizes[i][0], sizes[i][1]);
      cy.wait(1000);
    }
  });

  it("Users' list render", () => {
    cy.wait("@getUsers");
    cy.wait(1000);
    cy.get('[data-cy*="username-4912"]')
      .should("have.text", "mauro.legros")
      .parent()
      .should("have.attr", "data-cy", "list-item-4912")
      .parent()
      .should("have.attr", "data-cy", "main-list");
    cy.get('[data-cy*="username-2761"]')
      .should("have.text", "tyson.waters")
      .parent()
      .should("have.attr", "data-cy", "list-item-2761")
      .parent()
      .should("have.attr", "data-cy", "main-list");
    cy.get('[data-cy*="username-7608"]')
      .should("have.text", "fermin.teller")
      .parent()
      .should("have.attr", "data-cy", "list-item-7608")
      .parent()
      .should("have.attr", "data-cy", "main-list");
  });

  it("Refresh list", () => {
    cy.get('[data-cy*="refresh-users"]')
      .click()
      .then(() => {
        cy.wait("@getUsers");
      })
      .then(() => {
        cy.wait(1000);
      })
      .then(() => {
        cy.get('[data-cy*="username-4912"]')
          .should("have.text", "mauro.legros")
          .parent()
          .should("have.attr", "data-cy", "list-item-4912")
          .parent()
          .should("have.attr", "data-cy", "main-list");
        cy.get('[data-cy*="username-2761"]')
          .should("have.text", "tyson.waters")
          .parent()
          .should("have.attr", "data-cy", "list-item-2761")
          .parent()
          .should("have.attr", "data-cy", "main-list");
        cy.get('[data-cy*="username-7608"]')
          .should("have.text", "fermin.teller")
          .parent()
          .should("have.attr", "data-cy", "list-item-7608")
          .parent()
          .should("have.attr", "data-cy", "main-list");
      });
  });

  it("Increase rating", () => {
    cy.get('[data-cy*="increase-rating-btn-4912"]')
      .click()
      .then(() => {
        cy.get('[data-cy*="score-4912"]')
          .should("have.text", "1")
          .parent()
          .parent()
          .should("have.attr", "data-cy", "list-item-4912")
          .parent()
          .should("have.attr", "data-cy", "respectable-list");
      })
      .then(() => {
        cy.get('[data-cy*="increase-rating-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="increase-rating-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="increase-rating-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="increase-rating-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="score-4912"]').should("have.text", "5");
        cy.get('[data-cy*="increase-rating-btn-4912"]').should('be.disabled');
      })
      .then(() => {
        cy.get('[data-cy*="modal-text-4912"]').should(
          "have.text",
          "Нужно вознаградить mauro.legros. Сделать это?"
        );
      })
      .then(() => {
        cy.get('[data-cy*="modal-confirm-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="list-item-4912"]')
          .parent()
          .should("have.attr", "data-cy", "main-list");
      });      
  });

  it("Deacrease rating", () => {
    cy.get('[data-cy*="deacrease-rating-btn-4912"]')
      .click()
      .then(() => {
        cy.get('[data-cy*="score-4912"]')
          .should("have.text", "-1")
          .parent()
          .parent()
          .should("have.attr", "data-cy", "list-item-4912")
          .parent()
          .should("have.attr", "data-cy", "bully-list");
      })
      .then(() => {
        cy.get('[data-cy*="deacrease-rating-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="deacrease-rating-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="deacrease-rating-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="deacrease-rating-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="score-4912"]').should("have.text", "-5");
        cy.get('[data-cy*="deacrease-rating-btn-4912"]').should('be.disabled');
      })
      .then(() => {
        cy.get('[data-cy*="modal-text-4912"]').should(
          "have.text",
          "Пора забанить mauro.legros. Сделать это?"
        );
      })
      .then(() => {
        cy.get('[data-cy*="modal-confirm-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="list-item-4912"]')
          .parent()
          .should("have.attr", "data-cy", "main-list");
      });
  });

  it("Return btn", () => {
    cy.get('[data-cy*="increase-rating-btn-4912"]')
      .click()
      .then(() => {
        cy.get('[data-cy*="score-4912"]').should("have.text", "1");
      })
      .then(() => {
        cy.get('[data-cy*="deacrease-rating-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="score-4912"]').should("have.text", "0");
      })
      .then(() => {
        cy.get('[data-cy*="return-user-btn-4912"]').click();
      })
      .then(() => {
        cy.get('[data-cy*="list-item-4912"]')
          .parent()
          .should("have.attr", "data-cy", "main-list");
      });
  });
});
