import { Chart } from "react-google-charts";
import './BarGraph.css';

const BarGraph = () => {
  
  const data = [
    ["Arquivo", "Quantidade", "Ano", {role: "style"}],
    ["IP", 21, 2024, "#ED4D41"],
    ["TC", 29, 2024, "#36A7D9"],
    ["PAI", 13, 2024, "#81C163"],
    ["Carta Prec", 34, 2024, "#F7CD5A"],
    ["Outros", 5, 2024, "#F47140"],
    ["IP", 29, 2023, "#ED4D41"],
    ["TC", 19, 2023, "#36A7D9"],
    ["PAI", 17, 2023, "#81C163"],
    ["Carta Prec", 4, 2023, "#F7CD5A"],
    ["Outros", 7, 2023, "#F47140"],
  ];

  return (
    <div className="background-bar">
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={data}
        chartPackages={["corechart", "controls"]}
        controls={[
          {
            controlType: "CategoryFilter",
            options: {
              filterColumnIndex: 2, // Filtro de ano
              state: 2024,
              ui: {
                label: "",
                allowNone: false,
                allowMultiple: false,
                allowTyping: false
              },
            },
          },
        ]}
        options={{
          seriesType: "bars",
          legend: { position: "none" }, // Remove a legenda padrão
          hAxis: {
            showTextLabels: false, // Remove as legendas do eixo X
          },
        }}
        chartWrapperParams={{
          view: { columns: [0, 1, 3] }, // Mostra apenas "Arquivo" e "Quantidade" e "cores"
        }}
      />
        <div className="legenda">
          <h2>Legenda</h2>
          <div className="linha"></div>
            <div className="itens">
              <div className="descricao">
                <span className="legend-color" style={{ backgroundColor: "#ED4D41" }}></span>
                <p>IP</p>
              </div>
              <div className="descricao">
                <span className="legend-color" style={{ backgroundColor: "#36A7D9" }}></span>
                <p>TC</p>
              </div>
              <div className="descricao">
                <span className="legend-color" style={{ backgroundColor: "#81C163" }}></span>
                <p>PAI</p>
              </div>
              <div className="descricao">
                <span className="legend-color" style={{ backgroundColor: "#F7CD5A" }}></span>
                <p>Carta Precatoria</p>
              </div>
              <div className="descricao">
                <span className="legend-color" style={{ backgroundColor: "#F47140" }}></span>
                <p>Outros Documentos</p>
              </div>
            </div>
        </div>
    </div>
  );
};

export default BarGraph;

