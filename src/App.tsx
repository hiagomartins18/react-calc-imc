import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem/GridItem';
import { useState } from 'react';

import { levels, calculateImc, Level } from './helpers/imc';

export function App(){

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Digite todos os campos.");
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="Logo" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC.</h1>
          <p>IMC é a sigla para índice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>

          <input 
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em métros)" 
            value={heightField > 0 ? heightField : ''} 
            onChange={e => setHeightField(parseFloat(e.target.value))} // Value retorna String, ParseFloat para retornar como um number, so que com decimais. ParseInt retorna número inteiro.
            disabled={toShow ? true : false}
          />

          <input 
            type="number"
            placeholder="Digite o seu peso. Ex: 49.5" 
            value={weightField > 0 ? weightField : ''} 
            onChange={e => setWeightField(parseFloat(e.target.value))} // Value retorna String, ParseFloat para transformar a string em número decimal.
            disabled={toShow ? true : false} 
          />

          <button onClick={handleCalculateButton}>
            Calcular
          </button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key)=>(
              <GridItem key={key} item={item}/>
            ))}
          </div>}

          {toShow && 
            <div className={styles.rightBig}>
              <div className={styles.rightArrow}>
                <img src={leftArrowImage} alt="" width={25} onClick={handleBackButton}/>
              </div>
              <GridItem  item={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}