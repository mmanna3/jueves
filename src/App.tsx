import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Switch from './Switch';

const App: React.FC = () => {
  const [jugadores, setJugadores] = useState<string[]>(Array(15).fill(''));
  const [arqueros, setArqueros] = useState<string[]>([]);

  useEffect(() => {
    console.log(arqueros)
  }, [arqueros])

  const handleChange = (index: number, value: string) => {
    const nuevosJugadores = [...jugadores];
    nuevosJugadores[index] = value;
    setJugadores(nuevosJugadores);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    armarEquipos(jugadores);
  };

  const armarEquipos = (jugadores: string[]) => {
    // Aquí puedes implementar la lógica para armar los equipos
    console.log('Jugadores:', jugadores);
  };

  function agregarJugadorComoArquero(jugador: string) {
    if(arqueros.length === 3)
      return;

    arqueros.includes(jugador) ? 
      setArqueros(arquerosActuales => arquerosActuales.filter(arquero => arquero !== jugador)) : 
      setArqueros(arquerosActuales => [...arquerosActuales, jugador]);
  }

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Ingresar nombres de jugadores</h2>
        {jugadores.map((jugador, index) => (
          <div key={index} className="mb-4 gap-6 flex">
            <input
              type="text"
              value={jugador}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder={`Nombre del jugador ${index + 1}`}
            />
            <Switch sePuedenAgregarMasArqueros={arqueros.length < 2} onChange={() => agregarJugadorComoArquero(jugador)}/>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Armar Equipos
        </button>
      </form>
    </div>
  );
}

export default App;
