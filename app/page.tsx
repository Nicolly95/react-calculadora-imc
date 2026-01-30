"use client";
import styles from "./page.module.css";
import poweredImagem from "../assets/powered.png";
import leftArrow from "../assets/leftarrow.png"
import Image from "next/image";
import { useState } from "react";
import { levels, calculateImc, Level } from "@/helpers/imc";
import { GridItem } from "@/components/GridItem";



const Page = () => {

    const [ heightField, setHeightField ] = useState<number>(0);
    const [ weightField, setWeightField ] = useState<number>(0);
    const [ toShow, setToShow ] = useState<Level | null>();

    const handleCalculateButton = () => {
        if(heightField && weightField) {
            setToShow(calculateImc(heightField, weightField));
            //'calculateImc' obtem valores para height e weight, calcula o imc,
            // e manda o resultado para 'setToShow'
            // 'toShow' receberá estes valores e mandará para exibição de UM GridItem - 77
        } else {
            alert("Digite todos os campos.");
        }
    }

    const handleBackButton = () => {
        setHeightField(0);
        setWeightField(0);
        setToShow(null);
    }

    return(
        <div className={styles.main}>

            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <Image src={poweredImagem} alt="" width={150} className={styles.logo}/>
                </div>
            </header>

            <div className={styles.container}>

                <div className={styles.leftSide}>
                    <h1>Calcule o seu IMC </h1>
                    <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>
                
                    <div className={styles.containerInputs}>
                        <input 
                            type="number" 
                            placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
                            value={heightField > 0 ? heightField : ""}
                            onChange={event => setHeightField(parseFloat(event.target.value))}
                            disabled={toShow ? true : false}
                        />

                        <input 
                            type="number" 
                            placeholder="Digite o seu peso. Ex: 70.5 (em kg)"
                            value={weightField > 0 ? weightField : ""}
                            onChange={event => setWeightField(parseFloat(event.target.value))}
                            disabled={toShow ? true : false}
                        />
                    </div>

                    <button 
                        onClick={handleCalculateButton}
                        disabled={toShow ? true : false}
                    >
                        Calcular
                    </button>                   
                
                </div>


                <div className={styles.rightSide}>

                    {!toShow && 
                        <div className={styles.grid}>
                            {levels.map((item, key) => (
                                <GridItem key={key} item={item} />
                            ))}
                        </div>
                    }
                    {toShow && 
                        <div className={styles.rightBig}>
                            <div className={styles.rightArrow} onClick={handleBackButton}>
                                <Image src={leftArrow} alt="" width={25}/>
                            </div>
                            <GridItem item={toShow} />
                        </div>
                    }

                </div>
            </div>


        </div>
    );
}

export default Page;
