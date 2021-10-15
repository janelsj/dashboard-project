import Plot from 'react-plotly.js';
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

function Graph({x, y, color, chartTitle, isLoaded}){
  
  const override = css`
  display: block;
  margin: 0 auto;
  padding-top: 20px;
  border-color: ${color};
`;

  return(<div className="graph">
    {isLoaded ? 
      <Plot data={[
            {
              x: x,
              y: y,
              type: 'scatter',
              mode: 'lines',
              marker: {color: color},
            },
          ]}
          layout={{width: 700, height: 550, title: chartTitle}}
      /> 
      : <ScaleLoader color={color} loading={!isLoaded} css={override} height={70} width={10} radius={30} margin={5}/>
      }
    </div>)
}

export default Graph;