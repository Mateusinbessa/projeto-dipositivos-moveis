import axios from "axios";

const useReceitas = () => {
  const getAllReceitas = async () => {
    try {
      const { data } = await axios.get("http://10.0.2.2:5000/api/receitas");
      return data;
    } catch (error) {
      console.log(error.message);
    }
    return;
  };
  const saveReceita = async (date, amount, description) => {
    try {
      const payload = {
        date: date,
        amount: amount,
        description: description,
      };
      await axios.post("http://10.0.2.2:5000/api/receitas", { ...payload });
    } catch (error) {
      console.log(error.message);
    }
  };

  return { getAllReceitas, saveReceita };
};

export default useReceitas;
export { useReceitas };
