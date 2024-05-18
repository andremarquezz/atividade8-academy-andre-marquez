export class HeaderPage {
  searchInput = "input[name='search']";
  searchButton = "button.search-button";
  loginButton = 'a[href="/login"]';
  registerButton = 'a[href="/register"]';
  movieListButton = 'a[href="/"]';

  searchMovie(movie) {
    cy.get(this.searchInput).type(movie);
    cy.get(this.searchButton).click();
  }

  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  clickRegisterButton() {
    cy.get(this.registerButton).click();
  }
}
