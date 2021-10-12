import Plot from 'react-plotly.js';

function Graph({x, y, color, chartTitle}){
    return(<>
        <Plot
            data={[
              {
                x: x,
                y: y,
                type: 'scatter',
                mode: 'lines',
                marker: {color: color},
              },
            ]}
            layout={{width: 650, height: 600, title: chartTitle}}
          />
    </>)
}

export default Graph;