import { type Locator, type Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResultHeader: Locator;
  readonly addToCartBtn: Locator;
  readonly cartIcon: Locator;
  readonly cartToast: Locator;
  readonly ipodTouchItem: Locator;
  readonly availabilityStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Search For Products' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.searchResultHeader = page.locator('h1.h4');
    this.addToCartBtn = page.locator('button[title="Add to Cart"]').first();
    this.cartIcon = page.locator('#entry_217825'); // Ícone do carrinho no topo
    this.cartToast = page.locator('#notification-box-top');
    this.ipodTouchItem = page.locator('.product-layout', { hasText: 'iPod Touch' }).first();
  

   this.availabilityStatus = page.locator('li', { hasText: 'Availability:' }).locator('span, div, b').last();

   this.availabilityStatus = page.getByText('Out Of Stock').first();

  }

 async addFirstProductToCart() {
  await this.addToCartBtn.hover(); // Algumas vezes o botão só aparece no hover
  await this.addToCartBtn.click();
}
  async clickOnIpodTouch() {
  // scrollIntoViewIfNeeded() é automático no click(), 
  // mas podemos garantir a rolagem se necessário:
  await this.ipodTouchItem.scrollIntoViewIfNeeded();
  await this.ipodTouchItem.click();

}

async openCart() {
  await this.cartIcon.click();
}
  async goto() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/');
  }

  async searchFor(product: string) {
    await this.searchInput.fill(product);
    await this.searchButton.click();
  }
}
