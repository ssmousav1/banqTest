import axios from "axios";

export const API = async (url, method, data = null, headers = null, context = null) => {

  try {
    const res = await axios({
      baseURL: `https://assignment.bunq.com/api`,
      // baseURL: `http://${window.location.hostname}:3000`,
      url,
      method,
      data,
      headers: { ...headers, AUTHORIZATION: 'Bearer gL4t9a0Asxu4caTxVtNxfyBD2YW7AkDL' }
    })

    // if (context && res.data.message) {
    //   context.addNotification({
    //     status: res.status < 300 ? "success" : "failure",
    //     message: res.data.message,
    //     time: 5000,
    //     action: res.data.action,
    //     show: true
    //   })

    // }
    return await res
  } catch (e) {
    console.error("there is an error with this API call :>>>>> ", e);
    // if (e && e.response && context && e.response.data.message) {
    //   console.log(e.response.status);
    //   if (e.response.status === 406) {
    //     context.logout()
    //   }
    //   context.addNotification({
    //     status: "failure",
    //     message: e?.response?.data?.message,
    //     time: 5000,
    //     action: e?.response?.data?.action,
    //     show: true
    //   })
    // }
    return e;
  }
};

