import axios from "axios";
const ABSMENTnOTIFICATION = "/api/v1/abstarcts/abstract-mails";

const get = async () => {
  return await axios.get("/api/v1/abstarcts/myabstarcts");
};

const sendPaymentNotification = async (payload: any) => {
  return await axios.post(`${ABSMENTnOTIFICATION}`, payload);
};
const getSubthemes = async () => {
  return axios.get("/api/v1/subthemes");
};
// const get = async (payload: any) => {
//   return await axios.get("/api/v1/abstarcts", { params: payload });
// };
const search = async (payload: any) => {
  return await axios.get(`/api/v1/abstarcts/`, {
    params: {
      search: JSON.stringify(payload),
    },
  });
};
const searchCategories = async (payload: any) => {
  return await axios.get(`/api/v1/docabstracts/`, {
    params: {
      search: JSON.stringify(payload),
    },
  });
};

const find = async (id: string | number) => {
  return await axios.get(`/api/v1/abstarcts/${id}`);
};

const create = async (payload: any) => {
  return await axios.post(`/api/v1/abstarcts`, payload);
};

const update = async (payload: any) => {
  console.log("payload", payload);
  return await axios.patch(`/api/v1/abstarcts/` + payload.id, payload);
};
const destroy = async (payload: any) => {
  console.log("payload", payload);
  return await axios.delete(`/api/v1/abstarcts/` + payload);
};

export {
  get,
  find,
  create,
  update,
  destroy,
  search,
  searchCategories,
  getSubthemes,
  sendPaymentNotification,
};
