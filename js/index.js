$(document).ready(function() {
    $.ajax({
        url: 'http://107.23.165.138:8080/product/get',
        method: 'GET',
        success: function(data) {
            var productHtml = '';
            data.forEach(function(producto) {



                productHtml += `
                    <div id="${producto.id}" class="carga">
                        <div class="flex flex-col gap-3 pb-3">
                            <div
                                    class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                                    style='background-image: url("${producto.image}");'
                            ></div>
                            <div>
                                <p class="text-[#171411] text-base font-medium leading-normal">${producto.name}</p>
                                <p class="text-[#877264] text-sm font-normal leading-normal"  >${producto.price}</p>
                            </div>
                        </div>
                    </div>
                `;
                let idElementoHtml = '#'+producto.id;
                $('body').on('click', idElementoHtml ,function(){
                    let elemento = producto.price
                    let id = producto.id
                    addElement(id, elemento)})


            });
            console.log(data)
            // Agregar tarjetas al contenedor de productos
            $('#product-container').html(productHtml);

            // Ocultar pantalla de carga y mostrar productos
            $('#carga').hide();
            $('#product-container').show();
        },
        error: function() {
            cpms
            $('#loading-screen').html('<p>Error al cargar los productos.</p>');
        }
    });


    let cantidadElementos = 0;
    $("#numero").text(cantidadElementos);
    $("#numero").text(cantidadElementos);
    if(localStorage.getItem("carro") !== undefined && localStorage.getItem("carro") !== null) {
        lista = JSON.parse(localStorage.getItem("carro"))
        console.log(lista)
        cantidadElementos = cantidadElementosCarro(lista);
        console.log(cantidadElementos);
        $("#numero").text(cantidadElementos);
    }else{
        $("#numero").text(cantidadElementos);
    }


}
);




let contador = 0;
let lista = new Array;
function Producto(id, price, count) {
    this.id = id;
    this.price = price;
    this.count = count;
}

function addElement(id, price){
    let producto = new Producto(id, price, 1)
    lista = lista == null ? [] : lista;
    let productoEncontrado = lista.find(producto => producto.id === id);
    console.log("se esta agregando el producto: "+ id)
    console.log("valor del producto: " + price)
    if(productoEncontrado == undefined){
        lista.push(producto);
        listastrig = JSON.stringify(lista)
        localStorage.setItem("carro",listastrig)
    }else{
        productoEncontrado.count = productoEncontrado.count + 1;
        let indice = lista.findIndex(producto => producto.id === id);
        lista[indice] = productoEncontrado;
        listastrig = JSON.stringify(lista)
        localStorage.setItem("carro",listastrig)
    }
    $("#numero").text(cantidadElementosCarro(lista));
    lista = JSON.parse(localStorage.getItem("carro"))

}

function cantidadElementosCarro(lista){
    let cantidadElementos = 0
    lista.forEach(element => {
        cantidadElementos = cantidadElementos + element.count;
    });

    return cantidadElementos

}

function calcularTotal(lista){
    let total = 0
    lista.forEach(element => {
        console.log(element.price)
        let priceNum = element.price.replace("$", "");
        total = total + (element.count * priceNum);
    });

    return total

}