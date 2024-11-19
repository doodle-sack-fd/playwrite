import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Чтение переменных окружения из файла.
 * https://github.com/motdotla/dotenv
 */

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * См. https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	/* Запуск тестов в файлах параллельно */
	fullyParallel: false,
	/* Прервать сборку на CI, если случайно оставить test.only в исходном коде */
	forbidOnly: !!process.env.CI,
	/* Повторить попытку только на CI */
	retries: process.env.CI ? 2 : 0,
	/* Отключить параллельное выполнение тестов на CI */
	workers: 1,
	/* Репортер для использования. См. https://playwright.dev/docs/test-reporters */
	outputDir: './custom-reports/test-results', // Указываем путь для сохранения артефактов

	reporter: [
		['html', { outputFolder: './custom-reports/playwright-report' }], // Путь для HTML-отчета
		['json', { outputFile: './custom-reports/test-results.json' }], // JSON-отчет
	],
	/* Общие настройки для всех проектов ниже. См. https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Базовый URL для использования в действиях, таких как `await page.goto('/')`. */
		baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000',

		/* Сбор трассировки при повторе неудачного теста. См. https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	/* Настройка проектов для основных браузеров */
	projects: [
		{
			name: 'Google Chrome',
			use: {
				browserName: 'chromium',
				channel: 'chrome', // Указываем использовать установленный Google Chrome
				viewport: { width: 1280, height: 720 },
				headless: true, // Установите true, если хотите запускать в headless-режиме
			},
		},

		/* Тестирование на мобильных экранах. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Тестирование в брендированных браузерах. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Запуск локального сервера разработки перед началом тестов */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
