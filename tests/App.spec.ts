import { test, expect } from '@playwright/test';

test.describe('Aplicación Lo Jueve', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('debería crear tres equipos con un arquero cada uno', async ({ page }) => {
    // Ingresar 15 jugadores
    const jugadores = [
      'Jugador1', 'Jugador2', 'Jugador3', 'Jugador4', 'Jugador5',
      'Jugador6', 'Jugador7', 'Jugador8', 'Jugador9', 'Jugador10',
      'Jugador11', 'Jugador12', 'Jugador13', 'Jugador14', 'Jugador15'
    ];

    for (let i = 0; i < jugadores.length; i++) {
      await page.fill(`input[placeholder="Jugador ${i + 1}"]`, jugadores[i]);
    }

    // Seleccionar 3 arqueros
    await page.click('input[placeholder="Jugador 1"] + div >> nth=0');
    await page.click('input[placeholder="Jugador 2"] + div >> nth=0');
    await page.click('input[placeholder="Jugador 3"] + div >> nth=0');

    // Hacer clic en el botón de armar equipos
    await page.click('button[type="submit"]');

    // Esperar a que se creen los equipos
    await page.waitForSelector('p:has-text("Equipo 1")');

    // Verificar que se crearon tres equipos
    const equipos = await page.locator('p:has-text("Equipo")').count();
    expect(equipos).toBe(3);

    // Verificar que cada equipo tiene su arquero correspondiente
    for (let i = 1; i <= 3; i++) {
      const equipo = await page.locator(`div:has-text("Equipo ${i}")`).locator('ul div').allTextContents();
      expect(equipo.join('')).toContain('Jugador' + i);
    }
  });

  test('debería mostrar mensaje de error cuando no se seleccionan 3 arqueros', async ({ page }) => {
    // Ingresar 15 jugadores
    const jugadores = [
      'Jugador1', 'Jugador2', 'Jugador3', 'Jugador4', 'Jugador5',
      'Jugador6', 'Jugador7', 'Jugador8', 'Jugador9', 'Jugador10',
      'Jugador11', 'Jugador12', 'Jugador13', 'Jugador14', 'Jugador15'
    ];

    for (let i = 0; i < jugadores.length; i++) {
      await page.fill(`input[placeholder="Jugador ${i + 1}"]`, jugadores[i]);
    }

    // Seleccionar solo 2 arqueros
    await page.click('input[placeholder="Jugador 1"] + div >> nth=0');
    await page.click('input[placeholder="Jugador 2"] + div >> nth=0');

    // Hacer clic en el botón de armar equipos
    await page.click('button[type="submit"]');

    // Verificar mensaje de error
    const mensajeError = page.locator('div.bg-red-100:has-text("Debes seleccionar exactamente 3 arqueros")');
    await expect(mensajeError).toBeVisible();
  });
}); 