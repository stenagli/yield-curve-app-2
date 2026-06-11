import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function makeCombinedChart({ ctx }: { ctx: HTMLCanvasElement }) {
  const realLabel = ctx.dataset.realLabel;
  const nominalLabel = ctx.dataset.nominalLabel;

  if (realLabel !== nominalLabel) throw new Error('Mismatched labels');
  const realDataJSON = ctx.dataset.realData;
  const nominalDataJSON = ctx.dataset.nominalData;

  if (!realDataJSON || !nominalDataJSON) throw new Error('Missing data JSON');

  const realData = JSON.parse(realDataJSON);
  const nominalData = JSON.parse(nominalDataJSON);
  const breakevenData = realData.map((realPoint) => {
    const nominalPoint = nominalData.find((nPoint) => nPoint.x === realPoint.x);
    if (!nominalPoint) throw new Error('Missing nominal point');
    return { x: realPoint.x, y: nominalPoint.y - realPoint.y };
  });

  return new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: "Nominal Yield",
          data: nominalData,
          borderWidth: 1.5,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
        },
        {
          label: "Real Yield",
          data: realData,
          borderWidth: 1.5,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
        },
        {
          label: 'Breakeven Inflation Rate',
          data: breakevenData,
          borderWidth: 2,
          borderColor: 'rgb(255, 159, 64)',
          borderDash: [6, 4],
          pointRadius: 4,
        },
      ]
    },
    options: {
      animation: false,
      plugins: {
        title: {
          display: true,
          text: `Treasury Yield Curves ${realLabel}`
        },
        legend: {
          display: true,
        }
      },
      scales: {
        x: {
          type: 'linear' as const,
          title: {
            display: true,
            text: 'Maturity (Years)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Yield (%)'
          }
        }
      }
    }
  });
}
