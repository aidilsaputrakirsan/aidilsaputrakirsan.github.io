import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function SkillChart({ data }) {
  const options = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: '#F2F2F2',
          font: {
            size: 14,
          },
        },
        ticks: {
          color: '#A0A0B9',
          backdropColor: 'transparent',
          showLabelBackdrop: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#F2F2F2',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1A1A2E',
        titleColor: '#F2F2F2',
        bodyColor: '#A0A0B9',
        borderColor: '#7B68EE',
        borderWidth: 1,
        padding: 10,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="h-80 md:h-96">
      <Radar data={data} options={options} />
    </div>
  );
}

export default SkillChart;