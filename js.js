document.getElementById("nuevo").addEventListener("click", function(){
    document.getElementById("inicio").classList.add("hidden")
    document.getElementById("ingresar").classList.remove("hidden")
})
document.getElementById("guardar").addEventListener("click", function(){
    const data = document.getElementById("data").value;
    if(data){
        //agregar al html y localStorage
        AgregarDato(data)
        guardarDatoLocal(data)
        document.getElementById("ingresar").classList.add("hidden")
        document.getElementById("inicio").classList.remove("hidden")

        document.getElementById("data").value = "";
    }else{
        alert("Por favor ingresar algo.")
    }
})
function AgregarDato(dato){
    const tarjeta = document.createElement("div")
    tarjeta.classList.add("tarjeta")

    const parrafo = document.createElement("p");
    parrafo.textContent = dato;
    tarjeta.appendChild(parrafo)

    const acciones = document.createElement("div")
    acciones.classList.add("acciones")

    const eliminar = document.createElement("a")
    eliminar.href = "#"
    eliminar.textContent = "Eliminar"
    eliminar.classList.add("eliminar")
    eliminar.addEventListener("click", function(){
        tarjeta.remove();
        eliminarDatos(dato)
    })
    // eliminamos 

    const modificar = document.createElement("a")
    modificar.href = "#"
    modificar.textContent = "Modificar"
    modificar.classList.add("modificar")
    modificar.addEventListener("click", function(){
        const nuevoDato = prompt("modificar dato: ", parrafo.textContent)
        if(nuevoDato){
            modificarDatos(dato, nuevoDato)
            parrafo.textContent = nuevoDato;
        }
    })
    // modificamos

    acciones.appendChild(eliminar)
    acciones.appendChild(modificar)
    tarjeta.appendChild(acciones)

    document.getElementById("misservice").appendChild(tarjeta)
}

function guardarDatoLocal(dato){
    let datos = JSON.parse(localStorage.getItem("datos")) || [];

    datos.push(dato);

    localStorage.setItem("datos", JSON.stringify(datos))
}

function cargarDatos(){
    let datos = JSON.parse(localStorage.getItem("datos")) || [];
    datos.forEach(dato => {
        AgregarDato(dato)
    });
}

function eliminarDatos(dato){
    let datos = JSON.parse(localStorage.getItem("datos")) || [];
    datos = datos.filter(d => d != dato)
    localStorage.setItem("datos", JSON.stringify(datos))
}

function modificarDatos(datoViejo, datoNuevo){
    let datos = JSON.parse(localStorage.getItem("datos")) || [];
    const index = datos.indexOf(datoViejo)
    if(index !== -1){
        datos[index] = datoNuevo;
        localStorage.setItem("datos", JSON.stringify(datos))
    }
}

cargarDatos()