import { useState, ChangeEvent, FormEvent } from 'react';
import Switch from './Switch';

const App: React.FC = () => {
  const [jugadores, setJugadores] = useState<string[]>(Array(15).fill(''));
  const [arqueros, setArqueros] = useState<string[]>([]);

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
    if (jugador === '')
      return;

    if (arqueros.includes(jugador)) {
      setArqueros(arquerosActuales => {
        const arquerosSinElJugador = arquerosActuales.filter(arquero => arquero !== jugador)
        return arquerosSinElJugador
      })
    } else
      if (arqueros.length < 3)
        setArqueros(arquerosActuales => [...arquerosActuales, jugador]);
  }

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full p-8 bg-white rounded shadow-md">
        <div className='w-full flex justify-end'>
          <h4 className="mb-6 text-gray-600">¿Arquero?</h4>
        </div>
        {jugadores.map((jugador, index) => (
          <div key={index} className="mb-4 gap-6 flex items-center">
            <input
              type="text"
              value={jugador}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
              className="w-full px-3 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder={`Jugador ${index + 1}`}
            />
            <div className='flex items-center'>
              <Switch 
              onChange={() => agregarJugadorComoArquero(jugador)} 
              isEnabled={arqueros.includes(jugador)}/>
            </div>  
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        >
          Armar Equipos
        </button>
      </form>
    </div>
  );
}

export default App;
