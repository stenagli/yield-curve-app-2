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
  const realDataJSON = ctx.dataset.realData;
  const nominalDataJSON = ctx.dataset.nominalData;

  if (!realDataJSON || !nominalDataJSON) throw new Error('Missing data JSON');

  return new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: `Nominal ${nominalLabel}`,nominalLabel,
          data: JSON.parse(nominalDataJSON),
          borderWidth: 1.5,
          borderColor: 'rgb(255, 99, 132)',
        },
        {
          label: `Real ${realLabel}`,
          data: JSON.parse(realDataJSON),
          borderWidth: 1.5,
          borderColor: 'rgb(75, 192, 192)',
        },
      ]
    },
    options: {
      animation: false,
      plugins: {
        title: {
          display: true,
          text: 'Treasury Yield Curves'
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
