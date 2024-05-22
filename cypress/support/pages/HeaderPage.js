export class HeaderPage {
  searchInput = "input[name='search']";
  searchButton = "button.search-button";
  searchInput = 'input[name="search"]';
  loginButton = 'a[href="/login"]';
  registerButton = 'a[href="/register"]';
  movieListButton = 'a[href="/"]';
  profileButton = 'a[href="/profile"]';
  raroLogo = "img.logo";
  homePageUrl = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/";

  visitHomePage() {
    cy.visit(this.homePageUrl);
  }

  getRaroLogo() {
    return cy.get(this.raroLogo);
  }

  getSearchInput() {
    return cy.get(this.searchInput);
  }

  getMovieListButton() {
    return cy.get(this.movieListButton);
  }

  getProfileButton() {
    return cy.get(this.profileButton);
  }

  getLoginButton() {
    return cy.get(this.loginButton);
  }

  getRegisterButton() {
    return cy.get(this.registerButton);
  }

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

  clickRaroLogo() {
    cy.get(this.raroLogo).click();
  }
}
