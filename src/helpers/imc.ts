// Typagem sobre o que cada item deve ser. 
export interface Level {
  title: string;
  color: string;
  icon: 'down' | 'up';
  imc: number[];
  yourImc?: number; // Opcional
}

// Objeto com dados sobre o IMC já com a tipagem setada.
export const levels: Level[] = [
  { title: "Magreza", color: "#96A3AB", icon: "down", imc: [0, 18.5] },
  { title: "Normal", color: "#0EAD69", icon: "up", imc: [18.6, 24.9] },
  { title: "Sobrepeso", color: "#E2B036", icon: "down", imc: [25, 30] },
  { title: "Obesidade", color: "#C3423F", icon: "down", imc: [30.1, 99] },
];


// Funcção Para Calcular IMC.
export const calculateImc = (height: number, weight: number) => {
  const imc = weight / (height * height);

  // Loop para percorrer cada objeto do array de levels.
  for(let i in levels) {
    if (imc >= levels[i].imc[0] && imc < levels[i].imc[1]) {
      let levelCopy: Level = {...levels[i]};
      levelCopy.yourImc = parseFloat(imc.toFixed(2));
      return levelCopy;
    }
  }

  return null;
};