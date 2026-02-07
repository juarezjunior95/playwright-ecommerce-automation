import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search.page';

test('deve realizar busca de produto com sucesso', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.searchFor('iPhone');
  
  await expect(searchPage.searchResultHeader).toContainText('Search - iPhone');
});

test('should verify product code of the first search result', async ({ page }) => {
  const searchPage = new SearchPage(page);

  // Step 1: Ir para a página inicial e buscar por iPhone
  await page.goto('/'); 
  await searchPage.searchFor('iPhone');

  // Step 2: Clicar no primeiro produto da lista
  await searchPage.clickFirstProduct();

  // Step 3: Validar que na tela de detalhes contém o texto esperado
  // O Playwright vai esperar o elemento aparecer automaticamente
  await expect(searchPage.productCode).toContainText('Product Code: product 11');
});

test('deve verificar que o iPod Touch está fora de estoque', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  
  // Passo 1: Buscar pelo item
  await searchPage.searchFor('iPod Touch');

  // Passo 2: Clicar no item da imagem
  // O Playwright vai rolar a página automaticamente até encontrar o elemento
  await searchPage.clickOnIpodTouch();

  // Passo 3: Validar o texto de "Out Of Stock"
  // Usamos uma expressão regular ou o texto exato
  const availabilityRow = page.locator('li', { hasText: 'Availability:' });
  
  // Valida que o texto esperado está presente nesse container
  await expect(availabilityRow).toContainText('Out Of Stock');
});


/**
 * Cenário 3: Deve remover um produto do carrinho com sucesso
 */
test('deve remover um produto do carrinho e validar que está vazio', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.searchFor('iPhone');
  await searchPage.addFirstProductToCart();
  
  // Ação: Remover o produto
  await searchPage.removeProductFromCart();

  // Validação: Mensagem de carrinho vazio deve aparecer
  // Usamos o snapshot da árvore de acessibilidade para confirmar o texto
  await expect(searchPage.emptyCartMsg).toBeVisible();
});

/**
 * Cenário 4: Deve validar que o título da página de busca está correto
 */
test('deve validar o título da página após buscar por Apple', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.searchFor('Apple');

  // Validação: O header de resultado deve conter o termo buscado
  // Baseado na linha 10 do seu código original
  await expect(searchPage.searchResultHeader).toContainText('Search - Apple');
});71