const baseUrl = "http://172.20.10.14:8080";

export const getFoodByBarcode = async (barcode: string) => {
  try {
    const url = `${baseUrl}/food?barcode=${barcode}`;
    const res = await fetch(url, {
      method: 'GET',
    });
    // if (!res.ok) {
    //   throw new Error("Failed to fetch food item");
    // }

    return res.json();
  } catch (error) {
    throw error;
  }
};
