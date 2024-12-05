const baseUrl = "http://192.168.100.77:8080";

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
