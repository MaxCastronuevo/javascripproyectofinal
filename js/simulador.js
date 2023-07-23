let listaProductos=[]

const pedirDatos = async () => {
    const resp = await fetch("../json/data.json")
    const data = await resp.json()
    mostrarProductos(data)
    
}

function mostrarProductos(productos) {
    const contenedorProd = document.querySelector("#grid-principal")
    listaProductos=productos
    listaProductos.forEach(prod => {
        let contenedor = document.createElement("div"); 
        contenedor.innerHTML=`
        <div class="grid-producto">
              <img src="${prod.imagen}" alt="">
              <h6 class="nombre"> ${prod.nombre}</h6>
              <p class="precio"><strong>\$${prod.precio}</strong></p>
              <div class="style-button">
                <button type="button" class="btn btn-success agregar" value=${prod.id}>Agregar</button>
                <button type="button" class="btn btn-danger eliminar" value=${prod.id}>Eliminar</button>
              </div>
        </div>
        `;
        contenedorProd.appendChild(contenedor);
    })
    let btnsAgregar = document.querySelectorAll(".btn.btn-success.agregar")
    let btnsEliminar = document.querySelectorAll(".btn.btn-danger.eliminar")

    btnsAgregar.forEach(btn => {
        btn.addEventListener("click", () => {
        agregarProducto (btn.value)
    })
    });
    
    btnsEliminar.forEach(btn => {
        btn.addEventListener("click", () => {
        eliminarProducto (btn.value)    
        })
    })
}

let listaCarrito = [];
let carrito = JSON.parse(localStorage.getItem("listaCarrito"))
if (carrito != null && carrito.length > 0) {
    listaCarrito = carrito;
}

let span = document.getElementById("span")
span.textContent = listaCarrito.length

let btnMostrarCarrito = document.querySelector(".btn.btn-light.miCarrito")


function agregarProducto (idProducto) {
   let producto = buscarProducto(idProducto);
   listaCarrito.push (producto)
   localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito))
   span.textContent = listaCarrito.length
   Toastify({

    text: "Se agrego el producto",
    
    duration: 1000
    
    }).showToast();
}; 

function eliminarProducto (idProducto) {
    idProducto = parseInt(idProducto);
    let posproducto = buscarProducto2(idProducto, listaCarrito);
    if (posproducto != -1) {
    listaCarrito.splice (posproducto, 1)
    localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito)) 
    span.textContent = listaCarrito.length
    Toastify({

        text: "Se elimino el producto",
        
        duration: 1000
        
        }).showToast();
    }
}

function buscarProducto (idBuscado) {
    let producto;
    listaProductos.forEach(element => {
        if(element.id == idBuscado) {
            producto = element;
        }  
    });
    return producto; 
}

function buscarProducto2 (idBuscado, lista) {
    let contador = -1; 
    let posicionEncontrada = -1;
    lista.forEach(element => {
        contador ++; 
        if(element.id == idBuscado) {
        posicionEncontrada = contador; 
        }  
    });
    return posicionEncontrada
};

pedirDatos ();





























// POR AHORA NO SE UTILIZA ESTE CODIGO// 



function totalRecargo (importe,recargo) {
    let total = importe * recargo;
    return total.toFixed(2); 
}

function valorCuota (importe, cuotas) {
    let cuota = importe / cuotas;
    return cuota.toFixed(2);    
}

function menuSelector (lista) {
    let texto = "Que productos desea agregar al carrito?\n";
    lista.forEach(element => {
        texto = texto + element.id +": "+ element.nombre + "= " + "$" + element.precio + "\n"
    });
    texto += "0: Ir a pagar";
    texto += "\n+: Filtrar productos"
    return (prompt(texto));
}

function filtroProductos (lista, filtro) {
    let nuevaLista = lista.filter(element => element.nombre.includes (filtro));
    return nuevaLista;   
}



/*let nombreok; 
let nombre
let apellido





/*do {
    nombreok = false; 
    nombre = prompt("Ingrese su nombre")
    if (nombre != "") {
        nombreok = true;
    } else {
        alert ("Por favor ingrese nuevamente su nombre")
    }
} while (!nombreok);
do {
    nombreok = false; 
    apellido = prompt("Ingrese su apellido")
    if (apellido != "") {
        nombreok = true;
    } else {
        alert("Por favor ingrese nuevamente su apellido")
    } 
} while (!nombreok);

alert("¡Bienvenido " + nombre + " " + apellido + "!");


let opcion;
let subtotal = 0;
let tarjeta;
let interes; 


/*do {
    let productoSeleccionado = {};
    opcion = menuSelector (listaProductos);
    if (opcion == "+") {
      let texto = prompt("Escriba el producto buscado");  
      let listaFiltrada = filtroProductos (listaProductos, texto);
      opcion = menuSelector (listaFiltrada)
    }
    if (opcion != "+" && opcion != "0") {
    productoSeleccionado = buscarProducto (parseInt(opcion), listaProductos); 
    alert("El precio total de la caja es: " + productoSeleccionado.precio);
    subtotal += productoSeleccionado.precio;
    }    

}  while (opcion != "0");

alert ("Su total a pagar es " + "$" + subtotal)

do {
    tarjeta = parseInt(prompt(`Su total a pagar es ` + "$" + subtotal + `\nElija la cantidad de cuotas: 
    1: 1 cuota sin interes.
    2: 3 cuotas con interes. 5% de recargo.
    3: 6 cuotas con interes. 15% de recargo. 
    `));

    let total = 0; 
    let cuotas = 0;

    switch (tarjeta) {
        case 1:
            total = totalRecargo(subtotal,1);
            cuotas = valorCuota(total,1)
            alert("Su total a pagar es: $" + total + " en 1 cuota de $" + cuotas);
            break;
        case 2:
            total = totalRecargo(subtotal,1.05);
            cuotas = valorCuota(total,3)
            alert("Su total a pagar es: $" + total + " en 3 cuotas de $" + cuotas); 
            break;
        case 3: 
            total = totalRecargo(subtotal,1.15);
            cuotas = valorCuota(total,6)
            alert("Su total a pagar es: $" + total + " en 6 cuotas de $" + cuotas);
            break;
        default:
            alert("Elija una opcion correcta")
            break;
    }       
} while (tarjeta !== 1 && tarjeta !== 2 && tarjeta !== 3);


alert("¡Su pago se realizo con exito!");
*/


