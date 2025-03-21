import { test, expect } from '@playwright/test';

test.describe('Lo Jueve App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should create three teams with one goalkeeper each', async ({ page }) => {
    // Fill in 15 players
    const jugadores = [
      'Jugador1', 'Jugador2', 'Jugador3', 'Jugador4', 'Jugador5',
      'Jugador6', 'Jugador7', 'Jugador8', 'Jugador9', 'Jugador10',
      'Jugador11', 'Jugador12', 'Jugador13', 'Jugador14', 'Jugador15'
    ];

    for (let i = 0; i < jugadores.length; i++) {
      await page.fill(`input[placeholder="Jugador ${i + 1}"]`, jugadores[i]);
    }

    // Select 3 goalkeepers
    await page.click('input[placeholder="Jugador 1"] + div >> nth=0');
    await page.click('input[placeholder="Jugador 2"] + div >> nth=0');
    await page.click('input[placeholder="Jugador 3"] + div >> nth=0');

    // Click submit button
    await page.click('button[type="submit"]');

    // Wait for teams to be created
    await page.waitForSelector('p:has-text("Equipo 1")');

    await page.waitForTimeout(1000*30);

    // Verify that three teams are created
    const equipos = await page.locator('p:has-text("Equipo")').count();
    expect(equipos).toBe(3);

    // Verify each team has a goalkeeper
    for (let i = 1; i <= 3; i++) {
      const equipo = await page.locator(`div:has-text("Equipo ${i}")`).locator('ul div').allTextContents();
      expect(equipo.join('')).toContain('Jugador' + i); // Each goalkeeper should be in their respective team
    }
  });

  test('should show error message when not selecting 3 goalkeepers', async ({ page }) => {
    // Fill in 15 players
    const jugadores = [
      'Jugador1', 'Jugador2', 'Jugador3', 'Jugador4', 'Jugador5',
      'Jugador6', 'Jugador7', 'Jugador8', 'Jugador9', 'Jugador10',
      'Jugador11', 'Jugador12', 'Jugador13', 'Jugador14', 'Jugador15'
    ];

    for (let i = 0; i < jugadores.length; i++) {
      await page.fill(`input[placeholder="Jugador ${i + 1}"]`, jugadores[i]);
    }

    // Select only 2 goalkeepers
    await page.click('input[placeholder="Jugador 1"] + div >> nth=0');
    await page.click('input[placeholder="Jugador 2"] + div >> nth=0');

    // Click submit button
    await page.click('button[type="submit"]');

    // Verify error message
    const errorMessage = page.locator('div.bg-red-100:has-text("Debes seleccionar exactamente 3 arqueros")');
    await expect(errorMessage).toBeVisible();
  });
}); 