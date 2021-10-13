import Plot from 'react-plotly.js';

function Graph({x, y, color, chartTitle}){
    return(<div className="graph">
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
            layout={{width: 600, height: 550, title: chartTitle}}
          />
    </div>)
}

export default Graph;