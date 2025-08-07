import Server from "../config/constants/server";
import CryptoJS from "crypto-js";
import { useRequest } from "../hooks/useRequest";

/**
 * Retrieves a value from local storage using the provided key.
 * The value is decrypted with the aes secret provided in the server constants.
 * If the value is not found, null is returned.
 * @param key The key to retrieve the value from local storage
 * @returns The decrypted value from local storage or null if the value is not found
 */
// export const getStorageData = (key: string) => {
//   const data = localStorage.getItem(key) ?? localStorage.getItem(key);
//   // Decrypt
//   if (data) {
//     const bytes = CryptoJS.AES.decrypt(data, Server.crypto.AES_SECRET);
//     const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//     return !decryptedData ? {} : decryptedData;
//   }
//   return null;
// };

export const getStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  // Decrypt
  if (data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, Server.crypto.AES_SECRET);
      const decryptedDataString = bytes.toString(CryptoJS.enc.Utf8);
      if (decryptedDataString) {
        const decryptedData = JSON.parse(decryptedDataString);
        return !decryptedData ? {} : decryptedData;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error decrypting data: ${error}`);
      return null;
    }
  }
  return null;
};

export const encryptData = (data: string): string => {
  try {
    let key = CryptoJS.enc.Utf8.parse(Server.crypto.AES_SECRET);
    let iv = CryptoJS.enc.Utf8.parse(Server.crypto.AES_IV);
    let ciphertext = CryptoJS.AES.encrypt(data, key, { iv: iv }).toString();

    return ciphertext;
  } catch (error) {
    console.error("Error during encryption:", error);
    return ""; // Return an empty string or handle the error as needed
  }
};

/**
 * Stores a value in local storage under the specified key.
 * The value is encrypted using AES encryption with the secret provided in server constants.
 *
 * @param key - The key under which the value will be stored in local storage
 * @param value - The value to be stored, which will be encrypted before storage
 */
export const setStorageData = <T,>(key: string, value: T) => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    Server.crypto.AES_SECRET
  ).toString();
  localStorage.setItem(key, ciphertext);
};

/**
 * Removes the value stored in local storage under the specified key.
 *
 * @param key The key of the value to be removed from local storage
 */
export const removeStorageData = (key: string) => {
  localStorage.removeItem(key);
};

export const optionpPicker = (
  data: any[],
  valuekey: string = "id",
  labelkey: string = "name"
) => {
  return data.map((item: any) => ({
    value: item[valuekey],
    label: item[labelkey],
    // data: {
    //   _id: item[valuekey],
    //   name: item[labelkey],
    //   image_url: item?.image_url,
    //   slug: item?.slug,
    // },
  }));
};

export const updateState = (prev: any[], payload: any, update: boolean) => {
  return update
    ? prev.map((item) => (item._id === payload._id ? payload : item))
    : [...prev, payload];
};

export const handleFormSubmit = (
  payload: any,
  record: any,
  createFn: (params: any) => void,
  updateFn: (params: any) => void,
  setData: (fn: (prev: any) => any) => void,
  onClose: () => void
) => {
  const action = record ? updateFn : createFn;
  action({
    body: { ...payload, has_children: false },
    routeParams: record?._id,
    cbSuccess: (res: any) => {
      setData((prev: any) => updateState(prev, res.data, !!record));
      onClose();
    },
  });
};
export const useHandleDeleted = (path: any, setData?: any) => {
  const { execute } = useRequest(path?.url, path?.method, {
    type: "delay",
  });

  const handleDeleted = (id: string) => {
    execute({
      routeParams: id,
      cbSuccess: () => {
        setData((p: any) => p.filter((item: { _id: any }) => item._id !== id));
      },
    });
  };

  return handleDeleted;
};
