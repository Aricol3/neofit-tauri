import { useState, ChangeEvent } from "react";
import { createFood } from "../api/foodApi.ts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../store.ts";
import { addToast } from "@heroui/react";

const useFoodForm = () => {
  const navigate = useNavigate();

  const scannedBarcode = useSelector(
    (state: IRootState) => state.nutrition?.scannedBarcode
  );

  const parseServingSize = (s: string) => {
    if (!s) return null;
    const trimmed = s.trim();
    // number+unit glued (e.g., "100g")
    let m = trimmed.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
    // number + unit spaced (e.g., "250 ml")
    if (!m) m = trimmed.match(/^(\d+(?:\.\d+)?)\s+([a-zA-Z]+)$/);
    if (!m) return null;
    const value = Number(m[1]);
    const unit = m[2].toLowerCase();
    if (Number.isNaN(value)) return null;
    return { value, unit };
  };

  const toNumOrUndefined = (v?: string): number | undefined => {
    if (!v || v.trim() === "") return undefined;
    const n = Number(v.replace(",", ".")); // turn ",3" into ".3"
    return Number.isFinite(n) ? n : undefined;
  };


  const [form, setForm] = useState<Record<string, any>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const parsedServing = parseServingSize(form.serving_size || "");
    const serving_sizes = parsedServing
      ? [
        {
          value: parsedServing.value,
          unit: parsedServing.unit,
          nutrition_multiplier: 1,
          index: 0,
          default: true
        }
      ]
      : [];

    const payload = {
      barcode: scannedBarcode || undefined, // THIS CAN BE SET FROM A PREVIOUS ACTION !!!
      brand_name: form.brand_name,
      description: form.description,
      serving_sizes,
      nutritional_contents: {
        energy: {
          value: Number(form.calories),
          unit: "kcal"
        },
        protein: toNumOrUndefined(form.protein),
        fat: toNumOrUndefined(form.total_fat),
        carbohydrates: toNumOrUndefined(form.total_carbohydrates),
        saturated_fat: toNumOrUndefined(form.saturated_fat),
        polyunsaturated_fat: toNumOrUndefined(form.polyunsaturated_fat),
        monounsaturated_fat: toNumOrUndefined(form.monounsaturated_fat),
        trans_fat: toNumOrUndefined(form.trans_fat),
        cholesterol: toNumOrUndefined(form.cholesterol),
        sodium: toNumOrUndefined(form.sodium),
        potassium: toNumOrUndefined(form.potassium),
        fiber: toNumOrUndefined(form.fiber),
        sugar: toNumOrUndefined(form.sugar),
        added_sugars: toNumOrUndefined(form.added_sugars),
        sugar_alcohols: toNumOrUndefined(form.sugar_alcohols),
        vitamin_a: toNumOrUndefined(form.vitamin_a),
        vitamin_c: toNumOrUndefined(form.vitamin_c),
        vitamin_d: toNumOrUndefined(form.vitamin_d),
        calcium: toNumOrUndefined(form.calcium),
        iron: toNumOrUndefined(form.iron)
      },
      type: "food",
      public: true,
      deleted: false,
      country_code: "RO"
    };

    const prune = (obj: Record<string, unknown>): Record<string, unknown> => {
      return Object.fromEntries(
        Object.entries(obj)
          .filter(([, v]) => v !== undefined && v !== null && v !== "")
          .map(([k, v]) => [
            k,
            typeof v === "object" && v !== null && !Array.isArray(v)
              ? prune(v as Record<string, unknown>)
              : v
          ])
      );
    };

    const cleanPayload = prune(payload);
    console.log(cleanPayload);

    try {
      await createFood(cleanPayload);
      console.log("Food item created successfully");
      addToast({
        title: "Food Created",
        description: "Food item was successfully created",
        color: "success"
      });
      navigate("/nutrition");
    } catch (error) {
      console.error("Error creating food item:", error);
    }
  };

  return { form, handleInputChange, handleSubmit };
};

export default useFoodForm;
