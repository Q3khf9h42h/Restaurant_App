// Function to save order
function saveOrder() {
    
    const table = document.getElementById('tableSelect').value;
    const prices = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
      prices.push(checkbox.value);
    });
    const dishes = [];
    const dishSelect = document.getElementById('dishSelect');
    for (let i = 0; i < dishSelect.options.length; i++) {
      if (dishSelect.options[i].selected) {
        dishes.push(dishSelect.options[i].value);
      }
    }
  
    const order = {
      table,
      prices,
      dishes
    };
    const data= axios.post("https://crudcrud.com/api/dcddf69ffaca44f78941aed68e4c589a/placed order")
      .then((response)=>{
          console.log(response)
         getorders(response.data[i])
     })
      .catch((error) =>{
          console.log(error)
      })
     console.log(data)
  
    let orders = getOrders();
    if (!orders) {
      orders = [];
    }
    orders.push(order);
  
    localStorage.setItem('restaurantOrders', JSON.stringify(orders));
  
    displayOrders();
    clearForm();
  }
  
  // Function to delete order
  function deleteOrder(index) {
    const data= axios.delete("https://crudcrud.com/api/dcddf69ffaca44f78941aed68e4c589a/appointmentdata")
     .then((response)=>{
          console.log(response)
          getorder(response.data[i])
  })
      .catch((error) =>{
          console.log(error)
      })
      console.log(data)
    let orders = getOrders();
    if (orders && orders.length > index) {
      orders.splice(index, 1);
      localStorage.setItem('restaurantOrders', JSON.stringify(orders));
      displayOrders();
    }
  }
  
  // Function to display orders

  function displayOrders() {
    const data= axios.get("https://crudcrud.com/api/dcddf69ffaca44f78941aed68e4c589a/appointmentdata")
     .then((response)=>{
          console.log(response)
          getorder(response.data[i])
  })
      .catch((error) =>{
          console.log(error)
      })
      console.log(data)
    const ordersList = document.getElementById('orders');
    ordersList.innerHTML = '';
  
    const orders = getOrders();
    if (orders) {
      orders.forEach((order, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Table: ${order.table}, Prices: ${order.prices.join(', ')}, Dishes: ${order.dishes.join(', ')}`;
  
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          editOrder(index);
        });
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteOrder(index);
        });
  
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
  
        ordersList.appendChild(listItem);
      });
    }
  }
  
  // Function to edit order
  function editOrder(index) {
    const data= axios.put("https://crudcrud.com/api/dcddf69ffaca44f78941aed68e4c589a/appointmentdata")
     .then((response)=>{
          console.log(response)
          getorder(response.data[i])
  })
      .catch((error) =>{
          console.log(error)
      })
      console.log(data)
    const orders = getOrders();
    if (orders && orders.length > index) {
      const order = orders[index];
  
      // Set the selected table
      const tableSelect = document.getElementById('tableSelect');
      tableSelect.value = order.table;
  
      // Set the selected prices
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = order.prices.includes(checkbox.value);
      });
  
      // Set the selected dishes
      const dishSelect = document.getElementById('dishSelect');
      for (let i = 0; i < dishSelect.options.length; i++) {
        dishSelect.options[i].selected = order.dishes.includes(dishSelect.options[i].value);
      }
  
      // Delete the existing order
      deleteOrder(index);
    }
  }
  
  // Function to clear form
  function clearForm() {
    document.getElementById('tableSelect').value = '';
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    const dishSelect = document.getElementById('dishSelect');
    for (let i = 0; i < dishSelect.options.length; i++) {
      dishSelect.options[i].selected = false;
    }
  }
  
  // Function to retrieve orders from local storage
  function getOrders() {
    const orders = localStorage.getItem('restaurantOrders');
    if (orders) {
      return JSON.parse(orders);
    } else {
      return null;
    }
  }
  
  // Display orders on page load
  displayOrders();
  
  // Add event listener to save order button
  document.getElementById('saveOrderBtn').addEventListener('click', saveOrder);
  