const searchInput = document.getElementById("searchInput");
const dataTable = document.getElementById("dataTable");
const dataBody = document.getElementById("dataBody");
const headers = dataTable.querySelectorAll(".sortable");
let currentSortColumn = -1;
let currentSortOrder = 1;
// let data = []; // შეგიძლია მონაცმები შეინახო აქ და მერე გამოიყენო,

// Function to fetch and display data
async function fetchData() {
  try {
    const response = await fetch('assets/js/json/data.json'); // Replace with your data source URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
   
    displayData();
   
  } catch (error) {
    console.log('Error fetching data:',error);
    
  }
}

// Function to display data in the table
function displayData() {
  dataBody.innerHTML = "";
  data.data.forEach(function (rowData) {
    const row = document.createElement("tr");
    
    headers.forEach((header, index) => {
    
      const cell = document.createElement(index === 0 ? "th" : "td");
      cell.textContent = rowData[index];
      row.appendChild(cell);
    });
    dataBody.appendChild(row);
  });
}

// Add event listener for search input
searchInput.addEventListener("keyup", function() {
  const filter = searchInput.value.toLowerCase();
  dataBody.innerHTML = ""; // Clear the table body
  data.data.forEach(rowData => {
    if (rowData.some(cellData => cellData.toLowerCase().includes(filter))) {
      const row = document.createElement("tr");
      headers.forEach((header, index) => {
        const cell = document.createElement(index === 0 ? "th" : "td");
        cell.textContent = rowData[index];
        row.appendChild(cell);
      });  
      dataBody.appendChild(row);
    } 
  });  
});
var bt1=document.querySelector('.bt1')


// Add event listener for column header clicks (sorting)
headers.forEach((header, index) => {
  header.addEventListener("click", function() {
    const column = parseInt(header.getAttribute("data-column"), 10);
    if (column === currentSortColumn) {
      currentSortOrder *= -1;
    } else {
      currentSortColumn = column;
      currentSortOrder = 1;
    }

    headers.forEach((h, i) => {
      h.classList.remove("sorted-asc", "sorted-desc");
    });

    data.data.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      return aValue.localeCompare(bValue) * currentSortOrder;
    });

    header.classList.add(currentSortOrder === 1 ? "sorted-asc" : "sorted-desc");

    displayData();
  });
});


fetchData();


 //---------   აქ ვქმნი ინფუთებს და გადვცემ მათ ძებნის ფუნქციებს        ---------------

 var input_byname=document.createElement("input"); 
 input_byname.type= 'text';  //ტიპს თუ გინდა არ განუსაზღვრავ მუშაობს ისედაც
 input_byname.placeholder = 'search by name';
 input_byname.setAttribute('class', 'searchInput');
 input_byname.addEventListener('change', function() {
  avtosearch() ;})

 var input_byprofesii=document.createElement("input");
 input_byprofesii.placeholder = 'search by profesii';
 input_byprofesii.setAttribute('class', 'searchInput2');
 input_byprofesii.addEventListener('change', function() {
  avtosearch2() ;}) 

 var input_byadgili=document.createElement("input");
 input_byadgili.type= 'text'; 
 input_byadgili.placeholder = 'search by place';
 input_byadgili.setAttribute('class', 'searchInput3');
 input_byadgili.addEventListener('change', function() {
  avtosearch3() ;})
 

 var input_byzip=document.createElement("input");
 input_byzip.placeholder = 'search by zip ';
 input_byzip.type= 'number'; 
 input_byzip.setAttribute('class', 'searchInput4');
 input_byzip.addEventListener('change', function() {
  avtosearch4() ;})

 var input_bydawyeba=document.createElement("input");
 input_bydawyeba.placeholder = 'search by Date ';
 input_bydawyeba.type= 'number'; 
 input_bydawyeba.setAttribute('class', 'searchInput5');
 input_bydawyeba.addEventListener('change', function() {
  avtosearch5() ;})
 

 var input_byxelfasi=document.createElement("input");
 input_byxelfasi.placeholder = 'search by salary ';
 input_byxelfasi.setAttribute('class', 'searchInput6');
 input_byxelfasi.addEventListener('change', function() {
  avtosearch6() ;})

 //აქ დავამთავრე ინფუთების შექმნა----------------------------------------------  

//  აქ ინფუთებს გადავცემ ტჰ შებს
 var th01=document.querySelector(".th01")
 var th02=document.querySelector(".th02")
 var th03=document.querySelector(".th03")
 var th04=document.querySelector(".th04")
 var th05=document.querySelector(".th05")
 var th06=document.querySelector(".th06")

th01.appendChild(input_byname)
th02.appendChild(input_byprofesii); 
th03.appendChild(input_byadgili);
th04.appendChild(input_byzip);
th05.appendChild(input_bydawyeba);
th06.appendChild(input_byxelfasi);
 //აქ დავამთავრე




 

// -----------------------------------------  ძებნა ------------------------------------------------


async  function avtosearch()  { //ეს ფნქცია იყო ღილაკზე მიბმული, მივაბი input change-ზე
  const keyword = document.querySelector('.searchInput').value;

  if (keyword.trim() === '') {
    alert('Please enter a search keyword.');
    return;
  }

  try {
    const data = await fetchJSON();

    if (data) {
      const searchResults = searchByName(data, keyword);
      displayResults(searchResults);
    }
  } catch (error) {
    console.error('Error fetching or processing JSON:', error);
  }
};


  async function fetchJSON() {
    try {
      const response = await fetch('./assets/js/json/data.json');
      const jsonData = await response.json();
      
      return jsonData.data; 
      
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return null;
    }
  }
 // ეს ფუნქცია ცვლადი  გადამრვლედება ძებნის მიხედვით
 
 function searchByName(data, keyword) {
    const results = [];

    for (const entry of data) {
      const name = entry[0].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
      
      
      if (name.includes(keyword)) {  
        results.push(entry);
        
       
        var tbodymonacemebi=document.querySelector('.tbodymonacemebi')  //აქ ქრება body , რადგან დასერჩილი გამოვაჩინო
        tbodymonacemebi.style.display="none"
      }
    }
    return results;
  }
  
  function displayResults(results) {
   

    if (results.length === 0) {
      resultsList.innerHTML = '<li>No results found.</li>';
    } else {
      for (const entry of results) {
        
        var row=document.createElement("tr") //ყოველ ჯერზე შემქნის tr ყოველ 6 ინფოზე, სხვგან რო შექმნა ურევს 
       var dataBody2=document.createElement('tbody');
        entry.forEach((elementx=>{
         
         var tdx=document.createElement("td")
         tdx.textContent=elementx

         
          row.appendChild(tdx)
          
          dataBody2.appendChild(row)

        }
        
        ))

        dataTable.appendChild(dataBody2)
      }
    }
  }
 // search by profesii---------------

  async  function avtosearch2()  { //ეს ფნქცია იყო ღილაკზე მიბმული, მივაბი input change-ზე
    const keyword = document.querySelector('.searchInput2').value;
  
    if (keyword.trim() === '') {
      alert('Please enter a search keyword.');
      return;
    }
  
    try {
      const data = await fetchJSON();
  
      if (data) {
        const searchResults = searchByprofesii(data, keyword); // აქ იცვლბა ფუნქცის სახელი
        displayResults(searchResults);
      }
    } catch (error) {
      console.error('Error fetching or processing JSON:', error);
    }
  };
  
    function searchByprofesii(data, keyword) {
      const results = [];
  
      for (const entry of data) {
       
        const name2 = entry[1].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
        
        if (name2.includes(keyword)) {  
          results.push(entry);
          var tbodymonacemebi=document.querySelector('.tbodymonacemebi')  //აქ ქრება body , რადგან დასერჩილი გამოვაჩინო
          tbodymonacemebi.style.display="none"
        }
      }

      return results;
    }
   
    

  //------------------------ძებნა დაბადების ადგილით-------------------------

  async  function avtosearch3()  { 
    const keyword = document.querySelector('.searchInput3').value;
  
    if (keyword.trim() === '') {
      alert('Please enter a search keyword.');
      return;
    }
  
    try {
      const data = await fetchJSON();
  
      if (data) {
        const searchResults = searchBadgili(data, keyword); // აქ იცვლბა ფუნქცის სახელი
        displayResults(searchResults);
      }
    } catch (error) {
      console.error('Error fetching or processing JSON:', error);
    }
  };
  
    function searchBadgili(data, keyword) {
      const results = [];
  
      for (const entry of data) {
       
        const name2 = entry[2].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
        
        if (name2.includes(keyword)) {  
          results.push(entry);
          var tbodymonacemebi=document.querySelector('.tbodymonacemebi')  //აქ ქრება body , რადგან დასერჩილი გამოვაჩინო
          tbodymonacemebi.style.display="none"
        }
      }

      return results;
    }


    

//-------------------------- seaarc by zip kod----------------------------------

async  function avtosearch4()  { 
  const keyword = document.querySelector('.searchInput4').value;

  if (keyword.trim() === '') {
    alert('Please enter a search keyword.');
    return;
  }

  try {
    const data = await fetchJSON();

    if (data) {
      const searchResults = searchByzip(data, keyword); // აქ იცვლბა ფუნქცის სახელი
      displayResults(searchResults);
    }
  } catch (error) {
    console.error('Error fetching or processing JSON:', error);
  }
};

  function searchByzip(data, keyword) { //აქ იცვლება ფუნქციის სახელი 
    const results = [];

    for (const entry of data) {
     
      const name2 = entry[3].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
      
      if (name2.includes(keyword)) {  
        results.push(entry);
        var tbodymonacemebi=document.querySelector('.tbodymonacemebi')  //აქ ქრება body , რადგან დასერჩილი გამოვაჩინო
          tbodymonacemebi.style.display="none"
      }
    }

    return results;
  }


  
//-------------------------- seaarc by zip kod----------------------------------

async  function avtosearch4()  {  // აქ ცვლი ფუნქცის სახელს ინპუთზე რაც გაქ მიბმული 
  const keyword = document.querySelector('.searchInput4').value; //აქ ცვლი კლასს
  
  if (keyword.trim() === '') {
    alert('Please enter a search keyword.');
    return;
  }
  
  try {
    const data = await fetchJSON();
  
    if (data) {
      const searchResults = searchByzip(data, keyword); // აქ იცვლბა ფუნქცის სახელი
      displayResults(searchResults);
    }
  } catch (error) {
    console.error('Error fetching or processing JSON:', error);
  }
  };
  
  function searchByzip(data, keyword) { //აქ იცვლება ფუნქციის სახელი 
    const results = [];
  
    for (const entry of data) {
     
      const name2 = entry[3].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
      
      if (name2.includes(keyword)) {  
        results.push(entry);
        var tbodymonacemebi=document.querySelector('.tbodymonacemebi')  //აქ ქრება body , რადგან დასერჩილი გამოვაჩინო
          tbodymonacemebi.style.display="none"
        
      }
    }
  
    return results;
  }

  
//-------------search by Date -----------------------------------------------------

async  function avtosearch5()  {  // აქ ცვლი ფუნქცის სახელს ინპუთზე რაც გაქ მიბმული 
  const keyword = document.querySelector('.searchInput5').value; //აქ ცვლი კლასს რაც ინპუთს აქ 

  if (keyword.trim() === '') {
    alert('Please enter a search keyword.');
    return;
  }

  try {
    const data = await fetchJSON();

    if (data) {
      const searchResults = searchbydate(data, keyword); // აქ იცვლბა ფუნქცის სახელი
      displayResults(searchResults);
    }
  } catch (error) {
    console.error('Error fetching or processing JSON:', error);
  }
};

  function searchbydate(data, keyword) {
    const results = [];

    for (const entry of data) {
     
      const name2 = entry[4].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
      
      if (name2.includes(keyword)) {  
        results.push(entry);
        var tbodymonacemebi=document.querySelector('.tbodymonacemebi')  //აქ ქრება body , რადგან დასერჩილი გამოვაჩინო
        tbodymonacemebi.style.display="none"
      }
    }

    return results;
  }

  
  //----------------------------searc  by salary------------------------------------

  async  function avtosearch6()  {  // აქ ცვლი ფუნქცის სახელს ინპუთზე რაც გაქ მიბმული 
    const keyword = document.querySelector('.searchInput6').value; //აქ ცვლი კლასს რაც ინპუთს აქ 
  
    if (keyword.trim() === '') {
      alert('Please enter a search keyword.');
      return;
    }
  
    try {
      const data = await fetchJSON();
  
      if (data) {
        const searchResults = searchbysalary(data, keyword); // აქ იცვლბა ფუნქცის სახელი
        displayResults(searchResults);
      }
    } catch (error) {
      console.error('Error fetching or processing JSON:', error);
    }
  };
  
    function searchbysalary(data, keyword) {
      const results = [];
  
      for (const entry of data) {
       
        const name2 = entry[5].toLowerCase(); // ამ ადგილას წვდება ძებნას სახელით [0]
        
        if (name2.includes(keyword)) {  
          results.push(entry);
          var tbodymonacemebi=document.querySelector('.tbodymonacemebi')  //აქ ქრება body , რადგან დასერჩილი გამოვაჩინო
          tbodymonacemebi.style.display="none"
        }
      }
  
      return results;
    }


    //--            add table new data/      დაამტე თეიბლს ახალი დატა --------------------------------


    function addData() {
     
      const column1Value = document.getElementById('column1').value;
      const column2Value = document.getElementById('column2').value;
      const column3Value = document.getElementById('column3').value;
      const column4Value = document.getElementById('column4').value;
      const column5Value = document.getElementById('column5').value;
      const column6Value = document.getElementById('column6').value;

      // Create a new row for the table
      const tableBody = document.getElementById('dataBody');
      const newRow = document.createElement('tr');

      // Create cells for each column and set their values
      const cell1 = document.createElement('td');
      cell1.textContent = column1Value;
      newRow.appendChild(cell1);

      const cell2 = document.createElement('td');
      cell2.textContent = column2Value;
      newRow.appendChild(cell2);

      const cell3 = document.createElement('td');
      cell3.textContent = column3Value;
      newRow.appendChild(cell3);

      const cell4 = document.createElement('td');
      cell4.textContent = column4Value;
      newRow.appendChild(cell4);

      const cell5 = document.createElement('td');
      cell5.textContent = column5Value;
      newRow.appendChild(cell5);

      const cell6 = document.createElement('td');
      cell6.textContent = column6Value;
      newRow.appendChild(cell6);

      // Append the new row to the table
      tableBody.appendChild(newRow);

      // Clear input fields
      document.getElementById('column1').value = '';
      document.getElementById('column2').value = '';
      document.getElementById('column3').value = '';
      document.getElementById('column4').value = '';
      document.getElementById('column5').value = '';
      document.getElementById('column6').value = '';
  }
  // acardeon --- add file ფაილის დამატების acardeon ტოგლეს მსგავსი//

  const zoro=document.querySelector('.acardion-header');

  zoro.addEventListener('click', () => {
      zoro.nextElementSibling.classList.toggle('active');
  });

  function toggleButtonText() {
    const toggleButton = document.getElementById("toggleButton");

    if (toggleButton.textContent === "close") {
      toggleButton.textContent = "Add new data";
  } else {
      toggleButton.textContent = "close";
  }
}