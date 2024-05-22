import { faker } from "@faker-js/faker";
const apiUrl = Cypress.env("API_URL");

Cypress.Commands.add("createRandomUser", () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "123456",
  };
});

Cypress.Commands.add("registerUser", (user) => {
  if (user) {
    cy.request("POST", `${apiUrl}/users`, user).then(() => {
      Cypress.env("CURRENT_USER", user);
    });
  } else {
    cy.createRandomUser().then((randomUser) => {
      cy.request("POST", `${apiUrl}/users`, randomUser).then(() => {
        Cypress.env("CURRENT_USER", randomUser);
      });
    });
  }
});
