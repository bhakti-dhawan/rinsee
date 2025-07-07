import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/api'; // Change to your server if needed
const API_BASE_URL = 'http://194.164.151.48/rinsee/api'; // Change to your server if needed

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const token = localStorage.getItem("token");

export const fetchStores = async () => {
    const response = await api.get(`${API_BASE_URL}/store/myStores`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchAllEmployees = async () => {
    const response = await api.get(`${API_BASE_URL}/public/employees`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchAllStores = async () => {
    const response = await api.get(`${API_BASE_URL}/public/stores`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchAllUsers = async () => {
    const response = await api.get(`${API_BASE_URL}/public/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchOrderPikup = async () => {
    const response = await api.get(`${API_BASE_URL}/order/store/orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const updatePickupStatus = async (id: string, status:any) => {
    const response = await api.post(`${API_BASE_URL}/order/store/update/${id}`, {
        pickUpReqStatus: status
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {}
    });
    return response.data;
};

export const getUserOrder = async () => {
    const response = await api.get(`${API_BASE_URL}/order/user/orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchEmpListByStoreId = async (id: string) => {
    const response = await api.get(`${API_BASE_URL}/store/getEmpBystore/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {}
    });
    return response.data;
};

export const fetchStoreById = async (id: string) => {
    const response = await api.post(`${API_BASE_URL}/store/storeDetails`, {
        storeId: id,
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {}
    });
    return response.data;
};

export const getServicesById = async (id: string, key:string) => {
    const response = await api.get(`${API_BASE_URL}/service/storeServices/${id}/${key}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {}
    });
    return response.data;
};


export const deleteServiceById = async (id: any, key: any, index: number) => {
    const token = await localStorage.getItem('token');
    
    console.log('currentItemIndex=========================', index);
    const response = await api.post(
        `${API_BASE_URL}/service/item/delete/${id}/${key}/${index}`,
        {}, // <-- Empty payload since it's a POST request without body
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
};


export const getAllServices = async () => {
    const response = await api.get(`${API_BASE_URL}/service/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};


export const getStoreProfile = async () => {
    const response = await api.get(`${API_BASE_URL}/store/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

  export const CreateStore = async (store: any) => {
    const response = await api.post(`${API_BASE_URL}/store/createStore`, store , {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: store,
    });
    return response.data;
};

export const CreateOrUpdate = async (items: any) => {
    const response = await api.post(`${API_BASE_URL}/service/createOrUpdate`, items , {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    return response.data;
};

export const storeUpdate = async (items: any) => {
    const response = await api.post(`${API_BASE_URL}/store/updateStore`, items , {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    return response.data;
};

export const serviceUpdate = async (id: any, key: any, index: any, service: any) => {
    const token = await localStorage.getItem('token');
  
    const url = `${API_BASE_URL}/service/item/update/${id}/${key}/${index}`;
  
    const response = await api.post(
      url,
      service,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
  
    return response.data;
  };
  
export const updateStoreById = async (id: string, store: any) => {
    const token = localStorage.getItem('token');
  
    const response = await api.put(
      `${API_BASE_URL}/store/updateStore/${id}`, // check if this is correct
      store,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    );
  
    return response.data;
  };

export const createEmployee = async (store: any) => {
    const response = await api.post(`${API_BASE_URL}/store/createEmployee`, store , {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
    });
    return response.data;
};
  
  export const updateServiceById = async (id: string, store: any) => {
    const token = localStorage.getItem('token');
  
    const response = await api.put(
      `${API_BASE_URL}/store/updateStore/${id}`, // check if this is correct
      store,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    );
  
    return response.data;
  };
  
  

