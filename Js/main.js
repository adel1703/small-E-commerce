
var ProductNAmeInput = document.getElementById("ProductNAme");
var ProductPriceInput = document.getElementById("ProductPrice");
var ProductCategoryInput = document.getElementById("ProductCategory");
var ProductDescriptionInput = document.getElementById("ProductDescription");


var allProducts = [];

if(localStorage.getItem('products') != null){
    allProducts = JSON.parse(localStorage.getItem('products'));
    displayAllProducts()
}

function AddNewProduct(){    

    var product = {
        Name: ProductNAmeInput.value,
        Price: Number(ProductPriceInput.value),
        Category: ProductCategoryInput.value,
        Description: ProductDescriptionInput.value
    }

    allProducts.push(product);
    localStorage.setItem('products', JSON.stringify(allProducts) );
    console.log( allProducts );
    clearValues();
    displayAllProducts();

}

function clearValues(){
    ProductNAmeInput.value="",
    ProductPriceInput.value="",
    ProductCategoryInput.value="",
    ProductDescriptionInput.value=""
}

function displayAllProducts(){

    var listOfProducts = "" ;    
    for( var i = 0 ; i < allProducts.length ; i++ ){
        listOfProducts += `<tr>
        <td>`+ allProducts[i].Name +`</td>
        <td>`+ allProducts[i].Price +`</td>
        <td>`+ allProducts[i].Category +`</td>
        <td> ${allProducts[i].Description} </td>
        <td> <button  onclick="updateProduct(${i})" class="btn btn-outline-success" > Update Product </button> </td>
        <td> <button  onclick="deleteProduct(${i})" class="btn btn-outline-danger" > Delete Product </button> </td>
    </tr>`
    }  
    document.getElementById("tbody").innerHTML = listOfProducts;
}

function deleteProduct( idx ){
    allProducts.splice(idx , 1);
    displayAllProducts();
    localStorage.setItem('products', JSON.stringify(allProducts) );
}

var addBtn = document.getElementById("addButton");
var updateBtn = document.getElementById("updateButton");

var tmp ;

function updateProduct(index){
    addBtn.classList.replace('d-block' , 'd-none')
    updateBtn.classList.replace('d-none' , 'd-block')

    ProductNAmeInput.value = allProducts [index].Name;
    ProductPriceInput.value = allProducts [index].Price;
    ProductCategoryInput.value = allProducts [index].Category;
    ProductDescriptionInput.value = allProducts [index].Description;

    tmp = index;

    scroll({top:0})
}

function onClickUpdate(){
    addBtn.classList.replace('d-none' , 'd-block');
    updateBtn.classList.replace('d-block' , 'd-none');
}


function Update(){

    var product = {
        Name: ProductNAmeInput.value,
        Price: Number(ProductPriceInput.value),
        Category: ProductCategoryInput.value,
        Description: ProductDescriptionInput.value
    }
    allProducts[ tmp ] = product;
    displayAllProducts();
    onClickUpdate()    
    clearValues()
    localStorage.setItem('products', JSON.stringify(allProducts) );

}

var searchInPUt= document.getElementById('search');

function searchItem( term ){

    var cartoona = "";

    for(  var i=0 ; i   < allProducts.length ; i++  ){
        
        if(  allProducts[i].Name.toLowerCase().includes( term.toLowerCase() )  ){
        
            cartoona+=`<tr>
            <td>`+ allProducts[i].Name +`</td>
            <td>`+ allProducts[i].Price +`</td>
            <td>`+ allProducts[i].Category +`</td>
            <td> ${allProducts[i].Description} </td>
            <td> <button  onclick="updateProduct(${i})" class="btn btn-outline-success" > Update Product </button> </td>
            <td> <button  onclick="deleteProduct(${i})" class="btn btn-outline-danger" > Delete Product </button> </td>
        </tr>`;
        }

    }

    document.getElementById("tbody").innerHTML=cartoona;

}