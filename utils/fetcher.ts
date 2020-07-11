const allowedStatusCodes = [200];

const fetcher = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<any> => {
  const res = await fetch(input, init);

  if (!allowedStatusCodes.includes(res.status)) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }

  const data = res.json();

  return data;
};

export default fetcher;
