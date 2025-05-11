import { useState } from "react";

export function BreadTimer() {
  const [wishTimer, setWishtimer] = useState("00:00");
  const [resultado, setResultado] = useState("---");

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

  return (
    <div className="max-w-sm mx-auto flex flex-col px-4 py-6 bg-[#FFF6E5] rounded-2xl shadow-2xl ">
      <header className="bg-[#FDEBC8] mx-auto">
        <img src="" alt="" />
        <h1 className="text-brown-900">Pão na Hora </h1>
      </header>
      <div>
        <label>Selecione a hora que deseja que o pão esteja pronto</label>
        <input
          type="time"
          onChange={(e) => setWishtimer(e.target.value)}
          value={wishTimer}
        />
      </div>
      <div>
        <h2>
          Você deve colocar o timer para:
          <strong>{resultado}</strong>
        </h2>
        <button onClick={mudarResultado}>Calcular novo timer</button>
      </div>
    </div>
  );
}
