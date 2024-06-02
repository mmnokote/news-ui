<template>
  <v-row
    cols-lg="4"
    cols-md="12"
    cols-sm="12"
    align="center"
    class="d-flex justify-end align-center pagination-container"
  >
    <v-col lg="1" md="3" sm="3">Per Page</v-col>
    <v-col lg="1" md="3" sm="3" class="select-dropdown">
      <v-select
        @input="updateRowsPerPage($event)"
        :items="rows"
        v-model="data.selected"
        return-object
      >
      </v-select>
    </v-col>
    <!-- <v-col lg="1" md="3" sm="3" class="number-list">
      {{ params.itemCount }}-{{ params.itemsPerPage }} of
      {{ params.totalItems }}
    </v-col> -->
    <v-col lg="1" md="3" sm="3" class="number-list">
      {{ (params.currentPage - 1) * params.itemsPerPage + 1 }}-
      {{
        Math.min(params.currentPage * params.itemsPerPage, params.totalItems)
      }}
      of {{ params.totalItems }}
    </v-col>
    <v-col lg="1" md="3" sm="3" class="prev-next-buttons">
      <v-row>
        <v-btn :disabled="isPrevBtnDisabled" @click.native="previousPage" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn :disabled="isNextBtnDisabled" @click.native="nextPage" icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
export default defineComponent({
  name: "Pagination",
  props: {
    params: {
      type: Object,
      required: true,
    },
    onPageChange: {
      type: Function,
      required: false,
    },
    rows: {
      type: Array,
      required: false,
      default: () => ["5", "10", "15"],
    },
  },

  setup(props, { emit }) {
    let data = reactive({
      selected: props.rows[0],
    });

    const isPrevBtnDisabled = computed(() => {
      return props.params.currentPage === 1;
    });

    const isNextBtnDisabled = computed(() => {
      return props.params.currentPage === props.params.totalPages;
    });

    const currentPage = computed(() => {
      return props.params.currentPage;
    });

    const fetchData = (params: any) => {
      emit("onPageChange", params);
    };

    const nextPage = () => {
      let currentPage = props.params.currentPage + 1;
      let params = {
        limit: props.params.itemsPerPage, // Use the current limit value from props
        page: currentPage,
      };
      emit("onPageChange", params);
    };

    const previousPage = () => {
      let previousPage = props.params.currentPage - 1;
      let params = {
        limit: props.params.itemsPerPage, // Use the current limit value from props
        page: previousPage,
      };
      emit("onPageChange", params);
    };

    const updateRowsPerPage = (value: any) => {
      let params = {
        limit: parseInt(value),
        page: props.params.currentPage,
      };
      emit("onPageChange", params);
    };

    return {
      data,

      // computed
      isNextBtnDisabled,
      isPrevBtnDisabled,

      // methods
      nextPage,
      previousPage,
      updateRowsPerPage,
      fetchData,
      currentPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.prev-next-buttons {
}
.select-dropdown {
}
.number-list {
}
.pagination-container {
  height: 74px;
  border-top: 1px solid #e0e0e0;
  margin: 0 !important;
}
</style>
