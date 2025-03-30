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

export default function makeChart({ ctx, title, borderColor }: {
  ctx: HTMLCanvasElement;
  title: string;
  borderColor: string;
}) {
  const label = ctx.dataset.label;
  const dataJSON= ctx.dataset.data;
  if (!dataJSON) throw new Error('No data JSON');
  const data = JSON.parse(dataJSON);

  return new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label,
      data,
      borderWidth: 1.5,
      borderColor: borderColor,
    }]
  },
  options: {
    animation: false,
    plugins: {
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      x: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  }
  })};
