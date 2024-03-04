import Bugsnag from '@bugsnag/js';

const asyncClient = async (
  url: string,
  body: any,
  method: string,
  headers: HeadersInit
) => {
  let data = null;
  let isLoading = true;
  let errorApi = null;
  try {
    const response = await fetch(url, {
      method: method,
      body,
      headers: headers,
    });
    const jsonResult = await response.json();
    data = jsonResult;
  } catch (error) {
    errorApi = error;
    Bugsnag.notify(`${url} ${error}`);
  } finally {
    isLoading = false;
  }

  return { data, isLoading, errorApi };
};

export default asyncClient;
