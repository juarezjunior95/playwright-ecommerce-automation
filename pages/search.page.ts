import { expect, type Locator, type Page } from '@playwright/test';

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
  readonly removeBtn: Locator;
  readonly emptyCartMsg: Locator;
  readonly priceFilterMax: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Search For Products' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.searchResultHeader = page.locator('h1.h4');
    this.addToCartBtn = page.locator('button[title="Add to Cart"]').first();
    this.cartIcon = page.locator('#entry_217825'); // Ícone do carrinho no topo
    this.cartToast = page.locator('#notification-box-top');
    this.ipodTouchItem = page.locator('.product-layout', { hasText: 'iPod Touch' }).first();
    this.cartIcon = page.locator('#cart');
    this.removeBtn = page.getByRole('button', { name: 'Remove' });
    this.emptyCartMsg = page.getByText('Your shopping cart is empty!');
    this.priceFilterMax = page.locator('#input-price-top');
  

   this.availabilityStatus = page.locator('li', { hasText: 'Availability:' }).locator('span, div, b').last();

   this.availabilityStatus = page.getByText('Out Of Stock').first();


    



  }


  async removeProductFromCart() {
  await this.cartIcon.click();
  await this.removeBtn.click();
}

async filterByMaxPrice(price: string) {
  await this.priceFilterMax.fill(price);
  await this.priceFilterMax.press('Enter');
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
