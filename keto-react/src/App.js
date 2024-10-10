import React, { useState } from "react";
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

const notify = (orderId) => {
  toast(`Order ${orderId} has been found!`, {
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
  &::placeholder {
    color: #000 !important;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  width: 108%;
  max-width: 400px;
`;

function App() {
  const [orderId, setOrderId] = useState("");
  const [orderLink, setOrderLink] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const handleOrderLinkChange = (e) => {
    const link = e.target.value;
    setOrderLink(link);
    const orderIdMatch = link.match(/\/order\/(\d+)/);
    if (orderIdMatch) {
      const extractedOrderId = orderIdMatch[1];
      setOrderId(extractedOrderId);
      notify(extractedOrderId);
    }
  };

  const send = () => {
    toast("The form has been sent", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      setOrderId("");
      setOrderLink("");
      setPrice("");
      setStatus("");
    }, 3000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Form</h1>
        <FormContainer>
          <form>
            <Input
              type="text"
              placeholder="Order ID"
              value={orderId}
              readOnly
            />
            <Input
              type="text"
              placeholder="Order Link"
              value={orderLink}
              onChange={handleOrderLinkChange}
            />
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Status
              </option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Completed">Completed</option>
            </Select>
          </form>
        </FormContainer>
        <Button onClick={send}>Submit</Button>
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
