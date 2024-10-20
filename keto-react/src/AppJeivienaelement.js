import React, { useState, useEffect } from "react";
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
    autoClose: 4000,
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

  const [data, setData] = useState(null); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State for loading

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
      autoClose: 4000,
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

  useEffect(() => {
    fetch("books")
      .then((response) => response.text())
      .then((xmlString) => {
        //parse the xml string
        console.log(xmlString);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        // Extract desired data from the XML document
        const titles = xmlDoc.getElementsByTagName("title");
        const titlesArray = Array.from(titles).map(
          (title) => title.textContent
        );

        setData(titlesArray);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching xml:", error);
        setLoading(false);
      });
  }, []);

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
        <h1>Fetched Data from XML</h1>
        {/* Display loading message or data */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data && data.length > 0 ? (
              <ul>
                {data.map((title, index) => (
                  <li key={index}>{title}</li>
                ))}
              </ul>
            ) : (
              <p>No data found</p>
            )}
          </div>
        )}
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
