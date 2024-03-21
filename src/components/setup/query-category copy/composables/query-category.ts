import { reactive, computed, onMounted } from "vue";
import { AxiosResponse } from "axios";

import { QueryCategory } from "../types/QueryCategory";
import {
  get,
  create,
  update,
  destroy,
  searchCategories,
  getSubthemes,
  sendPaymentNotification,
} from "../services/query-category.service";
import { printReportJasper } from "../../../report/services/report.services";
import { uploadFile } from "@/components/dashboard/services";

export const useQueryCategory = (): any => {
  const dataItems: Array<QueryCategory> = [];
  let documentCategoryData: QueryCategory;

  const data = reactive({
    selectedFile: "",
    openUploadDialogForm: false,
    selectedAB: "",
    path_file: "/Abstract Guide.odp",
    path_filew: "/Abstract Guide.docx",
    disableDate: new Date("2024-03-16"), // March 16, 2024
    subThemes: [],
    file: "",
    title: "Manage My Abstracts",
    modalTitle: "",
    headers: [
      {
        text: "Submitted by",
        align: "start",
        sortable: false,
        value: "fullName",
      },
      { text: "Author", align: "start", sortable: false, value: "author" },
      { text: "Date", align: "start", sortable: false, value: "createdAt" },
      {
        text: "Sub Theme",
        align: "start",
        sortable: false,
        value: "subTheme.name",
      },
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
      {
        text: "Status",
        align: "start",
        sortable: false,
        value: "rejectionComment",
      },

      { text: "Actions", value: "actions", sortable: false },
    ],
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
    rows: ["10", "20", "50", "100"],
    itemtodelete: "",
    response: {},
    searchTerm: "",
    search: "",
  });

  onMounted(() => {
    initialize();
    fetchSubthemes();
  });

  const fetchSubthemes = () => {
    getSubthemes().then((response) => {
      if (response.status >= 200 && response.status < 300) {
        data.subThemes = response.data; // Update this line
      }
    });
  };
  const printFromServer = (abstractId) => {
    const params = {
      abstract_id: abstractId,
    };
    printReportJasper("abstract", params);
  };

  const initialize = () => {
    get().then((response: AxiosResponse) => {
      console.log("res", response.data);
      const { from, to, total, current_page, per_page, last_page } =
        response.data;
      data.response = { from, to, total, current_page, per_page, last_page };
      data.items = response.data;
      data.itemsToFilter = response.data;
    });
    // get({ per_page: 10 }).then((response: AxiosResponse) => {
    //   console.log("res", response.data);
    //   const { from, to, total, current_page, per_page, last_page } =
    //     response.data;
    //   data.response = { from, to, total, current_page, per_page, last_page };
    //   data.items = response.data;
    //   data.itemsToFilter = response.data;
    // });
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
    data.modal = !data.modal;
  };
  const cancelDialogx = () => {
    data.formData = {};
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

  const openDialog1 = (formData?: any) => {
    if (formData.id) {
      data.formData = formData;
      data.modalTitle = "Update Your Abstract";
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
    // console.log("newwwww", newData);
    update(newData).then(() => {
      reloadData();
      cancelDialogx();
      data.modal = false;
      // cancelDialog();
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

  const getData = (params: any) => {
    console.log("res", params);
    data.response = params;
    get(params).then((response: AxiosResponse) => {
      data.response = response.data.data;
      data.items = response.data.data.data;
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

  const shouldShowRejectionComment = computed(() => {
    return (
      data.formData.status?.code === "RJ" ||
      data.formData.status?.code === "PAAC"
    );
  });
  const isButtonDisabled = computed(() => {
    const currentDate = new Date();
    return currentDate > data.disableDate;
  });

  const getFullFilePath = (path) => {
    // Assuming "uploads/path_file" is the prefix
    return `${path}`;
  };
  const getFullFilePathW = (pathW) => {
    // Assuming "uploads/path_file" is the prefix
    return `${pathW}`;
  };

  const fileUrl = computed(() => {
    return getFullFilePath(data.path_file);
  });

  const fileUrlWord = computed(() => {
    return getFullFilePathW(data.path_filew);
  });

  const openUploadDialog = (item) => {
    data.openUploadDialogForm = true;
    data.selectedAB = item;
  };

  const savePPT = () => {
    if (data.formData.id) {
      updateQueryCategory(data.formData);
    } else {
      createData(data.formData);
    }
  };

  const clearFile = () => {
    data.selectedFile = null; // Clear the selected file
  };
  const saveFile = (file) => {
    console.log("itemitem:", data.selectedAB);

    if (file) {
      // Check if the selected file is an ODP file
      if (file.type !== "application/vnd.oasis.opendocument.presentation") {
        // Inform the user that only ODP files are allowed
        alert("Only ODP files are allowed");
        clearFile();
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      // Append all items from data.selectedAB to formData
      for (const key in data.selectedAB) {
        if (data.selectedAB.hasOwnProperty(key)) {
          data.formData[key] = data.selectedAB[key];
        }
      }

      // Upload the formData as needed
      uploadFile(formData).then((response) => {
        const fileInfo = {
          file_path: response.data.current_name,
        };
        console.log("path:", data.formData);
        data.formData.path_file = response.data.current_name;
        //remove duplicates but keep the last updated score!
        // data.formData.files.reverse();
        // data.formData.files = _.uniqBy(data.formData, "current_name");
        // this.loading2 = false;
      });
    }
  };

  return {
    data,
    savePPT,
    saveFile,
    openUploadDialog,
    fileUrl,
    fileUrlWord,
    fetchSubthemes,
    openDialog,
    openDialog1,
    shouldShowRejectionComment,
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
    isButtonDisabled,
  };
};
