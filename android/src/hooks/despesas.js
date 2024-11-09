import axios from "axios";

const useDespesas = () => {
  const getAllDespesas = async () => {
    try {
      const { data } = await axios.get("http://10.0.2.2:5000/api/despesas");
      return data;
    } catch (error) {
      console.log(error.message);
    }
    return;
  };
  const saveDespesa = async (date, amount, description) => {
    try {
      const payload = {
        date: date,
        amount: amount,
        description: description,
      };
      await axios.post("http://10.0.2.2:5000/api/despesas", { ...payload });
    } catch (error) {
      console.log(error.message);
    }
  };

  return { getAllDespesas, saveDespesa };
};

export default useDespesas;
export { useDespesas };
