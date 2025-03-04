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
        // Tentukan rentang skala dari 0 hingga 100
        min: 0,
        max: 100,

        // Konfigurasi garis sudut (angle lines)
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        // Konfigurasi grid
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        // Label di sekitar chart (mis. Frontend, Backend, dll.)
        pointLabels: {
          color: '#F2F2F2',
          font: {
            size: 14,
          },
        },
        // Konfigurasi ticks
        ticks: {
          stepSize: 20,            // Interval garis bantu per 10
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
