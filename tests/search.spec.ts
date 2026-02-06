import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/search.page';

test('deve realizar busca de produto com sucesso', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.searchFor('iPhone');
  
  await expect(searchPage.searchResultHeader).toContainText('Search - iPhone');
});

test('deve adicionar um iPhone ao carrinho e validar a inclusão', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.searchFor('iPhone');

  // Passo 1: Adicionar ao carrinho
  await searchPage.addFirstProductToCart();

  // Passo 2: Validar se o toast de sucesso apareceu (Boa prática!)
  await expect(searchPage.cartToast).toBeVisible();
  await expect(searchPage.cartToast).toContainText('Success: You have added');

  // Passo 3: Ir para o carrinho
  // Vamos clicar no ícone do carrinho para ver o resumo
  await searchPage.openCart();

  // Passo 4: Verificação final
  // Verificamos se dentro do mini-cart ou da página de checkout o item aparece
  const cartTable = page.locator('#checkout-cart'); 
  await expect(page).toHaveURL(/.*checkout\/cart/); // Valida se navegou para a página de carrinho
  await expect(page.locator('td.text-left', { hasText: 'iPhone' }).first()).toBeVisible();
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
});