export const asyncRequest = async (actionService, servicePayload) => {
  const response = await actionService(servicePayload);
  console.log(response.data);
  if (response.ok) {
    console.log(response.json());
  }
  return response.data;
};
