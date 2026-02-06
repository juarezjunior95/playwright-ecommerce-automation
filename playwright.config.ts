/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  
  /* Roda os testes dentro dos arquivos em paralelo */
  fullyParallel: true,
  
  /* Impede o commit de test.only acidentais no CI */
  forbidOnly: !!process.env.CI,
  
  /* Retentativas: apenas no CI para evitar falsos negativos (flakiness) */
  retries: process.env.CI ? 2 : 0,

  /* * OTIMIZAÇÃO DE TEMPO: 
   * No CI, aumentamos para 4 workers.
   */
  workers: process.env.CI ? 4 : undefined,

  /* CONFIGURAÇÃO DE REPORTERS:
   * Agora geramos HTML para depuração e JSON para o sumário do GitHub/Slack.
   */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }] 
  ],

  /* Configurações compartilhadas para os testes */
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off', 
    baseURL: 'https://ecommerce-playground.lambdatest.io/',
  },

  /* CONFIGURAÇÃO DE PROJETOS */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});