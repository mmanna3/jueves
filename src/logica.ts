export const armarEquipos = (jugadores: string[], arqueros: string[]): string[][] => {
    
    // Chequear que sean 15 jugadores (distintos)
    // Chequear que sean 3 arqueros (distintos) (que estén en el array de jugadores)

    const equipo1 = [arqueros[0]]   
    const equipo2 = [arqueros[1]]   
    const equipo3 = [arqueros[2]]   
    
    const jugadoresSinArqueros = jugadores.filter(jugador => !arqueros.includes(jugador));
    const jugadoresSinArquerosYDesordenados = jugadoresSinArqueros.sort(() => Math.random() - 0.5);

    for(let i = 0; i <= 3; i++)
        equipo1.push(jugadoresSinArquerosYDesordenados[i])

    for(let i = 4; i <= 7; i++)
        equipo2.push(jugadoresSinArquerosYDesordenados[i])
    
    for(let i = 8; i <= 11; i++)
        equipo3.push(jugadoresSinArquerosYDesordenados[i])

    return [equipo1, equipo2, equipo3];
}