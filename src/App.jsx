import { useState } from "react";
import "./App.css";
import { FiSearch } from "react-icons/fi";
import api from "./services/Api";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [cepInfo, setCepInfo]= useState('')
  

 async function handleClickButtonSearch() {
    if (inputValue === "") {
      alert("[ ERROR: Digite um CEP ]");
      return;
    }
    try {
      const response = await api.get(`${inputValue}/json`)
      setCepInfo(response.data);
      setInputValue('')

    } catch {
      alert("Cep Inválido!!");
      setInputValue('')
    }
  }
  return (
    <div className="container">
      <h1 className="title">Informe CEP</h1>
      <div className="inputContainer">
        <input type="text"  placeholder="Digite número CEP" value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          />
        <button className="buttonSearch" onClick={handleClickButtonSearch}>
          <FiSearch size={25} color="#eee" />
        </button>
      </div>
      <main className="main">
        <h2 className="subtitle">{'CEP: '+cepInfo.cep}</h2>
        <span className="infoCep">{'Rua: '+cepInfo.logradouro}</span>
        <span className="infoCep">{'Prefixo: '+cepInfo.ddd}</span>
        <span className="infoCep">{'Bairro: '+cepInfo.bairro}</span>
        <span className="infoCep">{'Cidade/ Estado: '+cepInfo.localidade} - {cepInfo.uf}</span>
      </main>
    </div>
  );
}

export default App;
