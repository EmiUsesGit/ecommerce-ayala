
//Declaro constante del método de pago.
    const metodosDePago = document.querySelectorAll("[name='paymentMethod']");
//Función para validar selección del método de pago.
    function cargarEventListenersCheck() {
        metodosDePago.forEach(metodoDePago => {
            metodoDePago.addEventListener("change", function (e) {
                //e.target.id me trae el elemento seleccionado.
                let metodoSeleccionado = document.getElementById(e.target.id);
                if(e.target.value == "paypal"){
                    document.querySelectorAll(".methodPayment").forEach(item => {
                        item.style.display = "none";
                    });
                }
                else{
                    document.querySelectorAll(".methodPayment").forEach(item => {
                        item.style.display = "flex";
                    });
                }
            });
        });
    }
    cargarEventListenersCheck();