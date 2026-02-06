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
   * No CI, aumentamos para 4 workers (ou mais, dependendo da máquina).
   * Isso fará com que os testes rodem simultaneamente em vez de um por um.
   */
  workers: process.env.CI ? 4 : undefined,

  /* Reporter HTML para análise detalhada */
  reporter: 'html',

  /* Configurações compartilhadas para os testes */
  use: {
    /* * OTIMIZAÇÃO: Coleta o trace apenas na primeira retentativa de um erro.
     * Tirar prints e gravar vídeos de testes que PASSAM consome muito tempo e CPU.
     */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off', // Desligado para ganhar velocidade; ligue apenas se precisar depurar algo difícil.
    
    /* URL base para facilitar as navegações */
    baseURL: 'https://ecommerce-playground.lambdatest.io/',
  },

  /* * CONFIGURAÇÃO DE PROJETOS (NAVEGADORES):
   * Para máxima velocidade no dia-a-dia, mantemos o Chromium como principal.
   */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* * DICA: Se o seu tempo estiver muito alto, comente o Firefox e o Webkit 
     * e ative-os apenas em deploys para produção ou em pipelines específicas.
     */
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