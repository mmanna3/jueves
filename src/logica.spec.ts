import { describe, expect, test } from 'vitest'
import { armarEquipos } from './logica';

describe("Test de la lógica", () => {

    test.skip("Dado que tengo jugadores con nombres repetidos, tira una excepción", () => {
        
    });

    test("Dado que hay 15 jugadores y 3 arqueros, se obtienen 3 equipos de 5 jugadores con un arquero cada uno", () => {        
        const CANTIDAD_DE_JUGADORES = 15;
        const jugadores = Array.from({ length: CANTIDAD_DE_JUGADORES }, (_, i) => `jugador${i + 1}`);
        const arqueros = ["jugador1", "jugador3", "jugador11"];

        const equipos = armarEquipos(jugadores, arqueros);
        
        console.log(equipos)
        expect(equipos.length).toBe(3);
        
        const jugadoresSinRepetidos = new Set(equipos.flat());
        expect(jugadoresSinRepetidos.size).toBe(CANTIDAD_DE_JUGADORES)

        expect(haySoloUnArqueroPorEquipo(equipos, arqueros)).toBe(true)
    })
})

function haySoloUnArqueroPorEquipo(equipos: string[][], arqueros: string[]): boolean {
    const elEquipoTieneArquero = [false, false, false];
    equipos.forEach((equipo, index) => {
        equipo.forEach(jugador => {
            if (arqueros.find(x => x === jugador)) {
                elEquipoTieneArquero[index] = true;
                arqueros = arqueros.filter(x => x !== jugador);
            }
        })
    });
    
    return elEquipoTieneArquero.every(e => e === true);
}


