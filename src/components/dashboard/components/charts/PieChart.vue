<template>
  <Pie
    :chart-options="data.chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Pie } from "vue-chartjs";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "PieChart",
  components: { Pie },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 500,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
    chartData: {
      default: () => ({}),
    },
  },
  setup() {
    const data = reactive({
      chartOptions: {
        plugins: {
          title: {
            display: true,
            text: "Pie chart showing Number of queries based on claimer Nature", // Add your title here
            fontSize: 16, // Customize the font size if needed
          },
        },
        responsive: true,
        maintainAspectRatio: true,
        backgroundColor: ["#A5D6A7", "#4DD0E1"],
      },
    });
    return {
      data,
    };
  },
});
</script>
