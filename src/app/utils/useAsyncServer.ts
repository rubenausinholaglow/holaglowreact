import Bugsnag from '@bugsnag/js';

const useAsyncServer = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    Bugsnag.notify(`${url} ${error}`);
  }
};

export default useAsyncServer;
