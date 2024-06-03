import { reactive, computed, onMounted } from "vue";
import { AxiosResponse } from "axios";

import { QueryCategory } from "../types/QueryCategory";
import {
  get,
  create,
  update,
  destroy,
  searchCategories,
  getStatuses,
  sendPaymentNotification,
  search,
  searchByStatus,
} from "../services/query-category.service";

import { uploadFile } from "@/components/dashboard/services";
import { getSubthemes } from "@/components/services";

export const useQueryCategory = (): any => {
  const dataItems: Array<QueryCategory> = [];
  let documentCategoryData: QueryCategory;

  const data = reactive({
    sortBy: ["title", "author", "url", "url", "createdAt", "subTheme.name"],
    sortDesc: false,
    meta: {
      currentPage: "",
      totalItems: "",
      itemCount: "",
      itemsPerPage: "",
      totalPages: "",
    },
    subThemes: [],
    selectedFile: "",
    formDataF: { urlToImage: "", display_path: "" },
    valid: true,
    openUploadDialogForm: false,
    statuses: [],
    file: "",
    title: "Manage News",
    modalTitle: "",
    headers: [
      {
        text: "Title",
        align: "start",
        sortable: true,
        width: "50%",
        value: "title",
      },
      {
        text: "Category",
        align: "start",
        sortable: true,
        width: "10%",
        value: "subTheme.name",
      },

      { text: "Author", align: "start", sortable: true, value: "author" },
      { text: "Date", align: "start", sortable: true, value: "createdAt" },

      {
        text: "External Link",
        align: "start",
        sortable: true,

        value: "url",
      },
      { text: "Description", value: "data-table-expand" },
      {
        text: "Actions",
        sortable: false,
        width: "8%",
        value: "actions",
        align: "end",
      }, // Actions column at the end
    ],
    expanded: [],
    singleExpand: true,

    modal: false,
    modal2: false,
    deletemodal: false,
    items: dataItems,
    itemsToFilter: [],
    formData: {
      status: null,
      rejectionComment: "",
    },
    formData2: {
      body: null,
    },
    documentcategories: [],
    rows: ["5", "10", "15", "20", "50", "100"],
    itemtodelete: "",
    response: {},
    searchTerm: "",
    searchTerm2: "",
    search: "",
    selectedAB: "",
  });

  onMounted(() => {
    initialize();
    fetchSubthemes();
    fetchSubthemese();
  });

  const fetchSubthemes = () => {
    getStatuses().then((response) => {
      if (response.status >= 200 && response.status < 300) {
        data.statuses = response.data; // Update this line
      }
    });
  };

  const fetchSubthemese = () => {
    getSubthemes().then((response) => {
      if (response.status >= 200 && response.status < 300) {
        data.subThemes = response.data; // Update this line
      }
    });
  };

  const filterDocument = (item: any) => {
    const regSearchTerm = item ? item : data.searchTerm;
    if (data.searchTerm) {
      search({ regSearchTerm }).then((response) => {
        console.log("res", response.data);
        const { from, to, total, current_page, per_page, last_page } =
          response.data;
        data.response = { from, to, total, current_page, per_page, last_page };
        data.items = response.data.items;
        data.itemsToFilter = response.data;
        data.meta = response.data.meta;
      });
    } else {
      initialize();
    }
  };
  const filterDocumentByStatus = (item: any) => {
    const regSearchTerm = item ? item : data.searchTerm2;
    searchByStatus({ regSearchTerm }).then((response) => {
      // console.log("itemitem response:", response.data);

      data.items = response.data;
    });
  };

  const clearFile = () => {
    data.selectedFile = null; // Clear the selected file
  };

  const saveFile = (file) => {
    console.log("itemitem:", data.selectedAB);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Append all items from data.selectedAB to formDataF
      for (const key in data.selectedAB) {
        if (data.selectedAB.hasOwnProperty(key)) {
          data.formDataF[key] = data.selectedAB[key];
        }
      }

      // Upload the formData as needed
      uploadFile(formData).then((response) => {
        const fileInfo = {
          file_path: response.data.current_name,
        };
        console.log("path:", data.formDataF);
        data.formDataF.urlToImage = response.data.current_name;
        data.formDataF.display_path = response.data.dispaly_path;
        //remove duplicates but keep the last updated score!
        // data.formData.files.reverse();
        // data.formData.files = _.uniqBy(data.formDataF, "current_name");
        // this.loading2 = false;
      });
    }
  };

  const getFullFilePath = (path) => {
    // Assuming "uploads/path_file" is the prefix
    return `uploads/${path}`;
  };

  const printFromServer = (abstractId) => {
    const params = {
      abstract_id: abstractId,
    };
    // printReportJasperWord("abstract", params);
  };

  const initialize = () => {
    data.items = [];
    get({ per_page: 10 }).then((response: AxiosResponse) => {
      console.log("res", response.data);
      const { from, to, total, current_page, per_page, last_page } =
        response.data;
      data.response = { from, to, total, current_page, per_page, last_page };
      data.items = response.data.items;
      data.itemsToFilter = response.data;
      data.meta = response.data.meta;
    });
  };

  const searchCategory = (item: string) => {
    if (item) {
      const regSearchTerm = item ? item : "";
      searchCategories({
        active: true,
        regSearch: regSearchTerm,
      }).then((response: AxiosResponse) => {
        data.documentcategories = response.data.data.data;
      });
    } else {
      reloadData();
    }
  };

  const reloadData = () => {
    get({ per_page: 10 }).then((response: AxiosResponse) => {
      const { from, to, total, current_page, per_page, last_page } =
        response.data;
      data.response = { from, to, total, current_page, per_page, last_page };
      data.items = response.data;
    });
  };

  const getDocument = () => {
    get(data).then((response) => {
      console.log("data", response.data);
    });
  };

  const cancelDialog = () => {
    data.formData = {};
    data.openUploadDialogForm = !data.modal;
    data.openUploadDialogForm = false;
    data.modal = false;
  };

  const cancelDialogx = () => {
    data.openUploadDialogForm = false;
  };
  const cancelDialog2 = () => {
    data.formData2 = {};
    data.modal2 = !data.modal2;
  };

  const cancelConfirmDialog = () => {
    data.formData = {} as QueryCategory;
    data.deletemodal = false;
  };

  const remove = () => {
    destroy(data.itemtodelete).then(() => {
      reloadData();
      data.deletemodal = false;
    });
  };

  const save = () => {
    if (data.formData.id) {
      updateQueryCategory(data.formData);
    } else {
      createData(data.formData);
    }
  };
  const savePPT = () => {
    if (data.formDataF.id) {
      updateQueryCategory(data.formDataF);
    } else {
      createData(data.formDataF);
    }
  };

  const save2 = () => {
    sendPaymentNotification(data.formData2).then((response: AxiosResponse) => {
      if (response) {
        cancelDialog2();
      }
    });
  };
  // const openDialog = (formData?: User) => {
  //   sendPaymentNotification(data.formData).then((response: AxiosResponse) => {});
  // };

  const openUploadDialog = (item) => {
    data.openUploadDialogForm = true;
    data.selectedAB = item;
  };

  const openDialog1 = (formData?: any) => {
    if (formData.id) {
      data.formData = formData;
      data.modalTitle = "Update News";
    } else {
      data.modalTitle = "Create News";
    }

    data.modal = !data.modal;
  };
  const openDialog = (formData?: any) => {
    if (formData.id) {
      data.formData = formData;
      data.modalTitle = "Send email";
    }
    data.modal2 = !data.modal2;
  };

  const updateQueryCategory = (data: any) => {
    const { fullName, ...newData } = data; // Create a new object without the 'fullName' key
    update(newData).then(() => {
      reloadData();
      cancelDialog();
    });
  };

  const createData = (data: any) => {
    create(data).then((response) => {
      if (response.status === 201) {
        reloadData();
        cancelDialog();
      }
    });
  };

  const getData = (dataz) => {
    get(dataz).then((response) => {
      data.meta.currentPage = dataz.page;
      data.meta.itemCount = response.data.meta.itemCount;
      data.meta.itemsPerPage = response.data.meta.itemsPerPage;
      data.meta.totalPages = response.data.meta.totalPages;
      data.items = response.data.items;
      console.log("dataz", response.data.meta);
    });
  };

  const deleteDialog = (deleteId: any) => {
    data.deletemodal = !data.modal;
    data.itemtodelete = deleteId;
    // console.log("delete year", data);
  };
  const users = computed(() => {
    return data.items
      .map((item: any) => {
        if (item.user) {
          return {
            ...item,

            fullName: `${item.user.first_name} ${item.user.middle_name}  ${item.user.last_name}`,
          };
        }
        return "";
      })
      .filter((x: any) => {
        return x.user != null;
      });
  });

  return {
    data,
    filterDocument,
    filterDocumentByStatus,
    saveFile,
    openUploadDialog,
    openDialog,
    openDialog1,
    cancelDialog,
    cancelDialogx,
    cancelDialog2,
    getDocument,
    updateQueryCategory,
    save,
    save2,
    reloadData,
    remove,
    cancelConfirmDialog,
    searchCategory,
    getData,
    deleteDialog,
    users,
    printFromServer,
    fetchSubthemes,
    savePPT,
    getFullFilePath,
    fetchSubthemese,
    initialize,
  };
};
