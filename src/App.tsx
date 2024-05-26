import { useState, ChangeEvent, FormEvent } from 'react';
import Switch from './Switch';
import { armarEquipos } from './logica';

const App: React.FC = () => {
  const [jugadores, setJugadores] = useState<string[]>(Array(15).fill(''));
  const [arqueros, setArqueros] = useState<string[]>([]);
  const [equipos, setEquipos] = useState<string[][]>();
  const [textoBoton, setTextoBoton] = useState<string>("Armar Equipos");

  const handleChange = (index: number, value: string) => {
    const nuevosJugadores = [...jugadores];
    nuevosJugadores[index] = value;
    setJugadores(nuevosJugadores);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {    
    event.preventDefault();
    console.log(jugadores.length)
    if (jugadores.length === 15 && arqueros.length === 3) {
      const nuevosEquipos = armarEquipos(jugadores, arqueros);
      setEquipos(nuevosEquipos)
      setTextoBoton("Armar de nuevo")
    }
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
        <h4 className="mb-6 text-3xl font-bold text-gray-800 text-center">Lo Jueve</h4>
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
        <div className=''>
          {equipos && equipos.map((equipo, i) => 
          <div key={i} className='mb-4'>
            <p className='font-bold'>Equipo {i+1}</p>
            <ul>
              {equipo.map(jug => <div key={jug}>{jug}</div>)}
            </ul>
          </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        >
          {textoBoton}
        </button>
      </form>
    </div>
  );
}

export default App;
