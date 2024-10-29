import { useState } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';

function App() {
  
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [history, setHistory] = useState([]);

  const calculateDiscount = () => {
    const discount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discount;
    const tax = (discountedPrice * taxRate) / 100;
    const finalItemPrice = discountedPrice + tax;
    
    setDiscountAmount(discount * quantity);
    setTaxAmount(tax * quantity);
    setFinalPrice(finalItemPrice * quantity);

    // Add to history
    setHistory([
      ...history,
      {
        originalPrice,
        discountPercentage,
        quantity,
        taxRate,
        discountAmount: (discount * quantity).toFixed(2),
        taxAmount: (tax * quantity).toFixed(2),
        finalPrice: (finalItemPrice * quantity).toFixed(2)
      }
    ]);
  };

  const resetCalculator = () => {
    setOriginalPrice(0);
    setDiscountPercentage(0);
    setQuantity(1);
    setTaxRate(0);
    setDiscountAmount(0);
    setTaxAmount(0);
    setFinalPrice(0);
    setHistory([]);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '100px', boxShadow: "0px 0px 4px 4px grey", margin: '60px 300px', padding: '50px', backgroundImage: 'url(https://i.gifer.com/origin/8c/8c3758d086d35a0be798f364582377d4_w200.gif)', backgroundRepeat: "no-repeat", backgroundSize: 'cover', borderRadius: '100px' }}>
        
        <div className='discount' style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
          <h1 className='pt-3' style={{ fontFamily: "IBM Plex Sans, sans-serif", fontWeight: "bolder" }}>DISCOUNT CALCULATOR</h1>
          <p className='pt-3 fs-5'>ORIGINAL PRICE (Per Item)</p>
          <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(Number(e.target.value))} />
          <p className='pt-3 fs-5'>DISCOUNT PERCENTAGE</p>
          <input type="number" value={discountPercentage} onChange={(e) => setDiscountPercentage(Number(e.target.value))} />
          <p className='pt-3 fs-5'>QUANTITY</p>
          <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          <p className='pt-3 fs-5'>TAX RATE (%)</p>
          <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
          <div className='p-5'>
            <Button className='p-3 fw-5 bg-light text-dark' style={{ fontFamily: "IBM Plex Sans, sans-serif", fontWeight: "bolder" }} onClick={calculateDiscount}>CALCULATE DISCOUNT</Button>
          </div>
        </div>

        <div className='result' style={{ display: 'flex', borderLeft: "1px solid gold", paddingTop: "80px", flexDirection: 'column', alignItems: 'center' }}>
          <h2 className='ms-5'>Total Discount Amount (Money Saved)</h2>
          <h1>{discountAmount.toFixed(2)}</h1>

          <h2 className='pt-5'>Total Tax Amount</h2>
          <h1>{taxAmount.toFixed(2)}</h1>

          <h2 className='pt-5'>Final Price for All Items</h2>
          <h1>{finalPrice.toFixed(2)}</h1>

          <div className='pt-5 mt-5'>
            <Button className='p-3 fw-bolder bg-light text-dark' onClick={resetCalculator}>RESET</Button>
          </div>
        </div>
      </div>

      <div className="history" style={{display:'flex',flexDirection:'column',alignItems:'center',background:"rgb(235, 170, 4)", margin: '10px 300px', padding: '20px', borderRadius:'100px', boxShadow: "0px 0px 4px 4px grey"}}>
        <h1 style={{
          color:'black',fontWeight:'bolder'
        }}>Calculation History</h1>
        {history.length > 0 ? (
          <ul style={{color:'black',fontSize:'20px'}}>
            {history.map((entry, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>Original Price:</strong> {entry.originalPrice}, <strong>Discount:</strong> {entry.discountPercentage}%, <strong>Quantity:</strong> {entry.quantity}, <strong>Tax Rate:</strong> {entry.taxRate}%<br />
                <strong>Discount Amount:</strong> ${entry.discountAmount}, <strong>Tax Amount:</strong> ${entry.taxAmount}, <strong>Final Price:</strong> ${entry.finalPrice}
              </li>
            ))}
          </ul>
        ) : (
          <p >No history yet.</p>
        )}
      </div>
    </>
  );
}

export default App;
