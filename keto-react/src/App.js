import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const Button = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 100px;
  align-items: center;
`;
const notify = () => {
  toast("🦄 Wow so easy!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Form</h1>
        <FormContainer>
          <form>
            <Input type="text" placeholder="Order ID" />
            <Input type="text" placeholder="Order Link" />
            <Input type="number" placeholder="Price" />
            <Input type="text" placeholder="Status" />
          </form>
        </FormContainer>
        <Button onClick={notify}>Notify!</Button>
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
