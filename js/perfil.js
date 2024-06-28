$(document).ready(function() {
        $.ajax({
            url: 'http://107.23.165.138:8080/invoice/listUnpaid/2', //cambiar por un id valido
            method: 'GET',
            success: function(data) {
                var productHtml = '';
                data.forEach(function(compra) {

                    let date = new Date(compra.date+ 'Z');

                    productHtml += `
                    <div class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
                        <div class="flex items-center gap-4">
                            <div class="text-[#171411] flex items-center justify-center rounded-lg bg-[#f4f2f0] shrink-0 size-12" data-icon="MapPin" data-size="24px" data-weight="regular">
                                <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect x="192" y="256" width="640" height="640" rx="50" ry="50" stroke="black" stroke-width="50" fill="none"/>
                                  <path d="M312 256 V196 C312 140 356 96 412 96 H612 C668 96 712 140 712 196 V256" stroke="black" stroke-width="50" fill="none"/>
                                  <line x1="312" y1="256" x2="712" y2="256" stroke="black" stroke-width="50"/>
                                </svg>
                            </div>
                            <div class="flex flex-col justify-center">
                                <p class="text-[#171411] text-base font-medium leading-normal line-clamp-1">fecha: ${formatDate(compra.fecha)} estado: ${compra.estado}</p>
                                <p class="text-[#877264] text-sm font-normal leading-normal line-clamp-2">total de la compra: ${compra.total}</p>
                            </div>
                        </div>
                        <div class="shrink-0">
                            <div class="text-[#171411] flex size-7 items-center justify-center" data-icon="CaretRight" data-size="24px" data-weight="regular">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                `;

                });
                console.log(data)
                // Agregar tarjetas al contenedor de productos
                $('#container').html(productHtml);

                // Ocultar pantalla de carga y mostrar productos
                $('#container').show();
            },
            error: function() {


            }
        });


    }
);












function formatDate(dateStr){
    const date = new Date(dateStr);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',

    };

    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
    console.log(formattedDate); // Ejemplo de salida: 7 de junio de 2024, 09:54:10 GMT+2
    return formattedDate;
}







