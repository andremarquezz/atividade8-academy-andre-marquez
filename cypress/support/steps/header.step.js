import {
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { HeaderPage } from "../pages/HeaderPage";
import { UserRegistrationPage } from "./UserRegistrationPage";

const headerPage = new HeaderPage();
const userRegistrationPage = new UserRegistrationPage();

Before(() => {
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();
  cy.viewport("macbook-16");
  cy.intercept("POST", "/api/auth/login").as("authUser");
});

Given("que estou na pagina inicial", () => {
  headerPage.visitHomePage();
});

Given("que estou na pagina de cadastro", () => {
  userRegistrationPage.visit();
});

When("realizar o cadastro com sucesso", () => {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const password = "123456";

  userRegistrationPage.register(name, email, password);

  cy.wait("@authUser");
});

When("clicar no logo da Raro", () => {
  headerPage.clickRaroLogo();
});

Then("devo ver no header o botão Registre-se ser alterado para Perfil", () => {
  headerPage.getRegisterButton().should("not.exist");
  headerPage.getProfileButton().should("be.visible");
});

Then("não deve ter a opção de Login", () => {
  headerPage.getLoginButton().should("not.exist");
});

Then("devo ser redirecionado para a página inicial", () => {
  cy.url().should("eq", headerPage.homePageUrl);
});

Then(
  "devo ver o header com o logo da empresa e o input de busca de filmes",
  () => {
    headerPage.getRaroLogo().should("be.visible");
    headerPage.getSearchInput().should("be.visible");
  }
);

Then(
  "devo ver o menu de navegacao com as opcoes: Filmes, Login, Registre-se",
  () => {
    headerPage.getMovieListButton().should("be.visible");
    headerPage.getLoginButton().should("be.visible");
    headerPage.getRegisterButton().should("be.visible");
  }
);
