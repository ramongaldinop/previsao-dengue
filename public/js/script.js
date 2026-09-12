this.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/casos/lista')
        const dados = await response.json()

        const semanas = dados.map(d => d.semana_epidemiologica);
        const temperatura = dados.map(d => d.temp_media);
        const casos = dados.map(d => d.num_casos);

        function corAlerta(nivel) {
            const cores = {
                0: 'rgba(46, 204, 113, 0.15)',
                1: 'rgba(241, 196, 15, 0.15)',
                2: 'rgba(230, 126, 34, 0.15)',
                3: 'rgba(231, 76, 60, 0.15)',
                4: 'rgba(155, 89, 182, 0.15)'
            };
            return cores[nivel] || 'rgba(150,150,150,0.1)';
        }

        const faixas = dados.map((d, i) => ({
            type: 'rect',
            xref: 'x',
            yref: 'paper',
            x0: i - 0.5,
            x1: i + 0.5,
            y0: 0,
            y1: 1,
            fillcolor: corAlerta(d.nivel_alerta),
            line: { width: 0 },
            layer: 'below'
        }));

        var traceTemp = {
            x: semanas,
            y: temperatura,
            mode: 'lines+markers',
            name: 'Temperatura média (°C)',
            yaxis: 'y',
            line: { color: '#1f77b4' }
        };

        var traceCasos = {
            x: semanas,
            y: casos,
            mode: 'lines+markers',
            name: 'Número de casos',
            yaxis: 'y2',
            line: { color: '#ff7f0e' }
        };

        const legendaAlerta = [0, 1, 2, 3, 4].map(nivel => ({
            x: [null],
            y: [null],
            mode: 'markers',
            marker: { size: 10, color: corAlerta(nivel).replace('0.15', '0.6') },
            name: `Nível ${nivel}`,
            legend: 'legend2',
            showlegend: true
        }));

        var layout = {
            title: { text: 'Temperatura, Casos e Nível de Alerta por Semana Epidemiológica' },
            xaxis: {
                title: { text: 'Semana epidemiológica' },
                type: 'category',
                domain: [0.1, 0.9],
                showgrid: false
            },
            yaxis: {
                title: { text: 'Temperatura (°C)', font: { color: '#1f77b4' } },
                tickfont: { color: '#1f77b4' },
                range: [Math.min(...temperatura) - 5, Math.max(...temperatura) + 5],
                showgrid: false
            },
            yaxis2: {
                title: { text: 'Número de casos', font: { color: '#ff7f0e' } },
                tickfont: { color: '#ff7f0e' },
                overlaying: 'y',
                side: 'right',
                showgrid: false
            },
            shapes: faixas,
            legend: {
                x: 1.15, y: 1,
                title: { text: 'Séries' }
            },
            legend2: {
                x: 1.15, y: 0.5,
                title: { text: 'Nível de alerta' }
            }
        };

        Plotly.newPlot('myDiv', [traceTemp, traceCasos, ...legendaAlerta], layout);

    } catch (err) {
        console.log(err)
    }
})