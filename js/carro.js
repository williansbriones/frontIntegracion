$(document).ready(function () {

    let lista = JSON.parse(localStorage.getItem("carro"))
    console.log(lista)
    lista.forEach(async Producto => {
        //let precio = Producto.price.replace("$", "")
        //console.log(precio)
        total_price = total_price + (Producto.price + Producto.count)
        let pro = await getNombreasync(Producto.id)
        console.log(pro)
        $("#container").append(`
            <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
                <div class="flex items-center gap-4">
                    <div
                            class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                            style='background-image: url(${pro.image});'
                    ></div>
                    <div class="flex flex-col justify-center">
                        <p class="text-[#171411] text-base font-medium leading-normal line-clamp-1">${pro.name}</p>
                        <p class="text-[#877264] text-sm font-normal leading-normal line-clamp-2">${pro.description}</p>
                    </div>
                </div>
                <div class="shrink-0">
                    <div class="flex items-center gap-2 text-[#171411]">
                        <button class="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer">-</button>
                        <input
                                class="text-base font-medium leading-normal w-4 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:appearance-none"
                                type="number"
                                value="${Producto.count}"
                        />
                        <button class="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer">+</button>
                    </div>
                </div>
            </div>
            `)
    });

    $("#total-price").text(calcularTotal(lista));
    console.log(total_price)

});
let total_price = 0;

function invoice(DateShopping, products, idUser,total){
    this.DateShopping = DateShopping
    this.products = products
    this.idUser = idUser,
        this.total = total
}

$('#pagar').on('click', function() {
    let listacondolar = JSON.parse(localStorage.getItem("carro"))
    let lista = quitarSimboloDolar(listacondolar)
    console.log(lista)
    let user = JSON.parse(localStorage.getItem("user"))
    console.log(total_price)
    let invo = new invoice(null, lista, 2, calcularTotal(lista))
    createinvoice(invo);
});

function quitarSimboloDolar(lista) {
    lista.forEach(producto => {
        producto.price = producto.price.toString().replace("$", "");
    });
    return lista
}

function createinvoice(invoice){
    console.log(invoice);
    $.ajax({
        url: 'http://107.23.165.138:8080/invoice/create', // Reemplaza con la URL de tu API
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(invoice),
        success: function(response) {
            console.log(response)
            localStorage.removeItem("carro")
            console.log(localStorage.getItem("carro"))
            window.open(response)
        },
        error: function(error) {
            console.error('inicio se sesion fallido:', error);
        }
    });
}


function getNombre(id){
    return new Promise((resolve, reject) => {
            $.ajax({
                url: 'http://107.23.165.138:8080/product/get/'+id, // Reemplaza con la URL de tu API
                type: 'GET',
                success: function(response) {
                    resolve(response);
                },
                error: function(error) {
                    console.error('inicio se sesion fallido:', error);
                    reject(error);
                }
            });
        }
    )}

async function getNombreasync(id) {
    try {
        let elemento = await getNombre(id);
        //console.log(elemento)
        return elemento

    } catch (error) {
        console.error(error);
        // Puedes manejar el error aquí, por ejemplo, continuar con el siguiente producto o detener la ejecución
    }
}


function calcularTotal(lista){
    let total = 0
    lista.forEach(element => {
        console.log(element.price)
        let priceNum = element.price.toString().replace("$", "");
        console.log("-----------------")
        total = total + (element.count * priceNum);
        console.log(element.count + " " + priceNum)
        console.log(total)
    });

    return total






}