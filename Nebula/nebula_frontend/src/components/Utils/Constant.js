export const colorSchema = {
  WORK: 0xabdde7,
  MEET: 0xb7f0d9,
  OPERATE: 0xe2e2e2,
  SERVE: 0xffd26a,
  WE: 0xffd26a,
  CIRCULATE: 0xfff7df,
  WASH: 0xc3c3c3,
};

export const serverAPI = {
  getProject: "http://100.94.29.214/api/v1/project/",
  getFloorsByProject: "http://100.94.29.214/api/v1/floor/?project_id=",
  getAllFloors: "http://100.94.29.214/api/v1/floor/",
  getRoomsByFloor: "http://100.94.29.214/api/v1/room/?floor_id=",
};

export const localAPI = {
  getProject: "http://127.0.0.1:8000/api/v1/project/",
  getFloorsByProject: "http://127.0.0.1:8000/api/v1/floor/?project_id=",
  getAllFloors: "http://127.0.0.1:8000/api/v1/floor/",
  getRoomsByFloor: "http://127.0.0.1:8000/api/v1/room/?floor_id=",
};

const ServerRoot = "https://api.c3plus.top/nebula/v1/";

export const ProjectsURL = ServerRoot + "projects/";
