import axios from "axios";

export default {
  login: function () {
    axios.get("localhost:4000/admin/login");
  },
};
