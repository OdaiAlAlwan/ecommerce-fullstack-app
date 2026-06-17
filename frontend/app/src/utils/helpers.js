export const formatCurrency = (value) =>
    new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
      value
    );


  


// style BarLoader  in page Login
export const OverrideStyle = {
  display: 'flex',
  justifycontent: 'center',
  alignitems: 'center',
  width: '80px',
  
}