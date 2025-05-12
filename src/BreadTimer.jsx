import { useEffect, useState } from "react";

export function BreadTimer() {
  const [wishTimer, setWishtimer] = useState("07:30");
  const [resultado, setResultado] = useState("10:00");

  function timeCalculation(targetTime) {
    // 1. Obter a data e hora atual
    const now = new Date();

    try {
      // 2. Extrair horas e minutos do horário alvo
      // exemplo: "07:30" -> ["07", "30"] e então é convertido para números
      // mesmo que targetHours = targetTime.split(":").map(Number)[0]
      const [targetHours, targetMinutes] = targetTime.split(":").map(Number);

      // 3. Validar os valores (hora 0-23, minutos 0-59)
      if (
        targetHours < 0 ||
        targetHours > 23 ||
        targetMinutes < 0 ||
        targetMinutes > 59
      ) {
        throw new Error("Horário inválido");
      }

      // 4. Criar objeto Date para o horário alvo (mesmo dia)
      const target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        targetHours,
        targetMinutes
      );

      // 5. Verificar se o horário já passou hoje
      if (target < now) {
        // Se passou, adicionar 1 dia
        target.setDate(target.getDate() + 1);
      }

      // 6. Calcular diferença em milissegundos
      const diferenceMiliseconds = target - now;

      // 7. Converter milissegundos para horas e minutos
      const hoursRemaining = Math.floor(
        diferenceMiliseconds / (1000 * 60 * 60)
      );
      const minutesRemaining = Math.floor(
        (diferenceMiliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );

      // 8. Formatar para HH:MM com 2 dígitos
      const formattedHours = hoursRemaining.toString().padStart(2, "0");
      const formattedMinutes = minutesRemaining.toString().padStart(2, "0");

      return `${formattedHours}:${formattedMinutes}`;
    } catch {
      return "Formato inválido. Use HH:MM (24h)";
    }
  }

  function mudarResultado() {
    const resultado = timeCalculation(wishTimer);
    setResultado(resultado);
  }

  useEffect(() => {
    mudarResultado();
  }, []);

  return (
    <div className="w-fit mx-auto flex flex-col rounded-3xl bg-[#FFF6E5] overflow-hidden shadow-2xl ">
      <header className="bg-[#FDEBC8] w-full p-4 flex gap-2 items-center text-2xl ">
        🥖
        <h1 className="font-bold">Pão na Hora </h1>
      </header>
      <div className="bg-[#FFF6E5] p-4">
        <h2 className="mb-2 text-xl font-semibold">
          A que horas você quer que o pão esteja pronto?
        </h2>
        <div className="text-base font-medium">
          <label className="block mb-1">Hora desejada</label>
          <input
            type="time"
            className="w-full px-4 py-2 rounded-md border border-[#FDEBC8]"
            onChange={(e) => setWishtimer(e.target.value)}
            value={wishTimer}
          />
        </div>
        <div className="bg-white p-4 text-2xl text-center white border-[#FDEBC8] rounded-2xl border my-4 text-amber-950">
          <h2>Você deve colocar o timer para:</h2>
          <p className="text-3xl font-bold">{resultado}</p>
        </div>
        <button
          className="bg-orange-400 text-white w-full py-2 rounded-xl font-bold px-4"
          onClick={mudarResultado}
        >
          Calcular nova hora
        </button>
      </div>
    </div>
  );
}
