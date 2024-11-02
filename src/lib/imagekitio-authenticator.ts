const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const imagekitioAuthenticator = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error) {
    console.error("Authentication request failed =>", error);
    throw new Error("Authentication request failed");
  }
};
