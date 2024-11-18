import React from 'react';
import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import './PieGraph.css'

const PieGraph = () => {

  const valorArm = 80

  const getData = (valor) => {
    return [
      ["Label", "Value"],
      ["Armaz.", valor],
    ]
  }

  const [data, setData] = useState(getData(valorArm));
  const [options, setOptions] = useState({
    min: 0,
    max: 100,
    width: 200,
    height: 170,
    greenFrom: 0,
    greenTo: 0, // Começa com 0 para introduzir o atraso
    redColor: '#808080',
    redFrom: 0, // Começa com 0 para introduzir o atraso
    redTo: 100,
    minorTicks: 1,
    majorTicks: [0, 100],
    animation: {
      duration: 1000, // Define a duração da animação para o ponteiro
      easing: 'linear'
    },
  });

  useEffect(() => {
    // Atualiza o ponteiro de imediato
    setData(getData(valorArm));

    // Introduz um atraso antes de atualizar as cores
    const colorTimeout = setTimeout(() => {
      setOptions((prevOptions) => ({
        ...prevOptions,
        greenTo: valorArm,
        redFrom: valorArm,
      }));
    }, 150); // Define o atraso em milissegundos

    return () => {
      clearTimeout(colorTimeout);
    };
  }, [valorArm]);

  return (
    <div className="background-pie">
      <Chart
        chartType="Gauge"
        width="100%"
        height="100%"
        data={data}
        options={options}
    />
    </div>
  );
};

export default PieGraph;
