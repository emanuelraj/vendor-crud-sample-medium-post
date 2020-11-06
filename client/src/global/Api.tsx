// API clients to communicate with backend
const callApiEndpoint = (endpoint: string, options = {}) => {
  let status = 0;
  return fetch(endpoint, options)
    .then(res => {
      ({ status } = res);
      return res.json();
    })
    .then(
      result => {
        if (status !== 200 && status !== 201) {
          return { error: result };
        }
        return { response: result };
      },
      error => {
        // eslint-disable-next-line no-console
        console.log('Looks like there was a problem: \n', error);
        return { error };
      }
    );
};

const loadThreats = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const { pagination } = option;
  const endpoint = `${baseUrl}/api/threats`;
  const options = {
    headers: { 
      'current': pagination.current,
      'pageSize': pagination.pageSize,
      'authorization': localStorage.getItem('token')
    },
    mode: 'cors',
    method: 'GET'
  };
  return callApiEndpoint(endpoint, options);
};

const createThreat = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const {title, classification, impact, likelihood} = option;
  const endpoint = `${baseUrl}/api/threats`;
  const options = {
    headers: { 
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('token')
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({title, classification, impact, likelihood})
  };
  return callApiEndpoint(endpoint, options);
};

const deleteThreat = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const { id } = option;
  const endpoint = `${baseUrl}/api/threats/${id}`;
  const options = {
    headers: { 
      'authorization': localStorage.getItem('token')
    },
    mode: 'cors',
    method: 'DELETE'
  };
  return callApiEndpoint(endpoint, options);
};

const updateThreat = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const { id, title, classification, impact, likelihood } = option;
  const endpoint = `${baseUrl}/api/threats/${id}`;
  const options = {
    headers: { 
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('token')
    },
    mode: 'cors',
    method: 'PUT',
    body: JSON.stringify({ title, classification, impact, likelihood })
  };
  return callApiEndpoint(endpoint, options);
};

const userLogin = (option: any) => {
 //debugger;
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const { email, password } = option;
  const endpoint = `${baseUrl}/auth/login`;
  const options = {
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({ name: email, password })
  };
  return callApiEndpoint(endpoint, options);
}

const userSignup = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const { email, password } = option;
  const endpoint = `${baseUrl}/auth/register`;
  const options = {
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({ email, password })
  };
  return callApiEndpoint(endpoint, options);
}

export const apiCalls = {
  loadThreats,
  createThreat,
  deleteThreat,
  updateThreat,
  userLogin,
  userSignup
};
