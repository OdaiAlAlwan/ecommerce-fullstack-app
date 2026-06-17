import { baseUrl } from "./Api"


export const UpdateProduct = async (id,formdata) => {
    try {
        const token = localStorage.getItem("Token");
        await baseUrl.put(
          `api/v1/products/${id}`, formdata ,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        return (error.response?.message || "An error occurred");
      }

}