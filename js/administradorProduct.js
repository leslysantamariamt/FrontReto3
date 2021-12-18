let urlBaseProduct = "http://localhost:8080/api/cleaningprod";
$(document).ready(getProduct);
function getProduct() {
    $("#info").removeAttr("style");
    $.ajax({
        dataType: 'json',
        url: urlBaseProduct + "/all",
        type: "GET",
        success: function (response) {
            var misItems = response;

            for (let i = 0; i < misItems.length; i++) {
                $("#allItemsProduct").append("<tr>");
                $("#allItemsProduct").append("<td>" + misItems[i].id + "</td>");
                $("#allItemsProduct").append("<td>" + misItems[i].brand + "</td>");
                $("#allItemsProduct").append("<td>" + misItems[i].category + "</td>");
                $("#allItemsProduct").append("<td>" + misItems[i].presentation + "</td>");
                $("#allItemsProduct").append("<td>" + misItems[i].description + "</td>");
                $("#allItemsProduct").append("<td>" + misItems[i].price + "</td>");
                $("#allItemsProduct").append("<td>" + misItems[i].availability + "</td>");
                $("#allItemsProduct").append("<td>" + misItems[i].quantity + "</td>");
                $("#allItemsProduct").append("<td>" + misItems[i].photography + "</td>");
                $("#allItemsProduct").append('<td><button class="btn btn-outline-danger" onclick="deleteProduct(' + misItems[i].id + ')">Borrar Producto</button>');
                $("#allItemsProduct").append('<td><button class="btn btn-outline-info" onclick="getProductById(' + misItems[i].id + ')">Actualizar Producto</button>');
                $("#allItemsProduct").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function getProductById(id) {
    console.log("Ver id: " + id);
    $("#actualizarFormProducto").removeAttr("style");
    $("#tipousuario").attr("style", "display:none");
    $("#tipoproducto").attr("style", "display: none");
    $("#btncrearCliente").attr("style", "display: none");

    let opc = confirm('Recuerde que solo puede actualizar el nombre, edad y contraseña del cliente. / Remember that you just can update the client\'s name, age, password.');
    if (opc) {
        console.log("hola")
       $.ajax({
        dataType: 'json',
        url: urlBaseProduct + "/" + id,
        type: "GET",
        headers: {
            "Content-Type": "application/json"
        },
            success: function (response) {
                console.log(response);

                 var item = response;
                    $('#idp').val(item.id),
                    $("#brand").val(item.brand);
                    $("#category").val(item.category);
                    $("#presentation").val(item.presentation);
                    $("#description").val(item.description),
                    $("#price").val(item.price);
                    $("#quantity").val(item.quantity);
                    $("#photography").val(item.photography);
                    $("#availability").val(item.availability);
                var elemento = {
                    id: $('#idp').val(item.id),
                    brand: $("#brand").val(),
                    category: $("#category").val(),
                    presentation: $("#presentation").val(),
                    description: $("#description").val(),
                    price: $("#price").val(),
                    quantity: $("#quantity").val(),
                    photography: $("#photography").val(),
                    availability: $("#availability").val()
                };
                var dataToSend = JSON.stringify(item);

            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });
    }
}

function putProduct() {
    console.log("ejecutando funcion para actualizar");
    var elemento = {
        id: $('#idp').val(),
        brand: $("#brand").val(),
        category: $("#category").val(),
        presentation: $("#presentation").val(),
        description: $("#description").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val(),
        availability: $("#availability").val()
    };
    console.log(elemento);
    var dataToSend = JSON.stringify(elemento);
    if (camposLlenosP(elemento)) {
        let opc = confirm('¿Está seguro que desea actualizar este Usuario?\n Are you sure that you want update this User?');
        if (opc) {
            $.ajax({
                contentType: 'application/json',
                data: dataToSend,
                url: urlBaseProduct + "/update",
                type: "PUT",
                success: function (response) {
                    console.log(response);
                    alert("¡Cliente editada exitosamente!");
                    location.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}

function deleteProduct(id) {
    console.log(id);
    let opc = confirm('¿Está seguro que desea eliminar este producto?\n Are you sure that you want delete this producto?');
    if (opc) {
        $.ajax({

            dataType: 'json',
            url: urlBaseProduct + "/" + id,
            type: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function (response) {
                    success:{

                        alert('Se ha eliminado el producto');
                        getProduct();
                        window.location.reload();
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function validarRegistroProduct() {
    let product = {
        id: $("#idp").val(),
        brand: $("#brand").val(),
        category: $("#category").val(),
        presentation: $("#presentation").val(),
        description: $("#description").val(),
        price: $("#price").val(),
        availability: $("#availability").val(),
        quantity:$("#quantity").val(),
        photography: $("#photography").val(),
    };
    console.log(product);
    if (camposLlenosP(product)) {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(product),
            url: urlBaseProduct + "/new",
            statusCode: {
                201: function (response) {
                    success: {
                        console.log(response);
                        alert("Se registró el usuario correctamente, por seguridad indicale al usuario ingresar su correo electrónico y contraseña");
                        window.location.href = "Administrador.html";
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("¡Ya existe una cuenta con este usuario! El usuario no se registró correctamente. Por favor ingresa con su correo electrónico y contraseña");
                let opc = confirm('¡Ya existe una cuenta con este usuario! El usuario no se registró correctamente. Por favor verifica si el correo electrónico es el correcto y haz clic en Aceptar, de lo contrario haz clic en Cancelar y registrate con un correo electrónico y contraseña nuevos');
                    if (opc) {
                        window.location.href = "registrarProduct.html";
                    } else {
                        email.focus();
                        return 0;
                    }
                window.location.href = "Administrador.html";
            }
        });
    }
}

function camposLlenosP(user){
    const id= document.getElementById('idp');
    console.log(id.value)
    const brand= document.getElementById('brand');
    console.log(brand.value)
    const category = document.getElementById('category');
    console.log(category.value)
    const presentation= document.getElementById('presentation');
    console.log(presentation.value)
    const description= document.getElementById('description');
    console.log(description.value)
    const price = document.getElementById('price');
    console.log(price.value)    
    const availability= document.getElementById('availability');
    console.log(availability.value)   
    const quantity= document.getElementById('quantity');
    console.log(quantity.value)   
    const photography = document.getElementById('photography');
    console.log(photography.value)
    
    if (id.value.length !=0 && brand.value.length !=0 && category.value.length !=0 && presentation.value.length !=0 && description.value.length !=0 && price.value.length !=0 && availability.value.length !=0 && quantity.value.length !=0 && photography.value.length !=0){
        console.log("Campos Llenos");
            console.log("campos OK");
            return true;
        
    }else {
        if (id.value.length==0 && brand.value.length==0 && category.value.length==0 && presentation.value.length==0 && description.value.length==0 && price.value.length==0 && availability.value.length==0 && quantity.value.length==0 && photography.value.length==0){
            alert("Recuerde que todos los campos son obligatorios, por favor escriba los datos del producto");
            id.focus();
            return false;
        }else{
            if (id.value.length==0){
                alert("Recuerde que todos los campos son obligatorios, por favor escriba su id.");
                id.focus();
                return false;
            }else{
                if (brand.value.length==0){
                    alert("Recuerde que todos los campos son obligatorios, por favor escriba su marca.");
                    brand.focus();
                    return false;
                }else{
                    if (category.value.length==0){
                        alert("Recuerde que todos los campos son obligatorios, por favor escriba su categoria.");
                        category.focus();
                        return false;
                    }else{
                        if (presentation.value.length==0){
                            alert("Recuerde que todos los campos son obligatorios, por favor escriba su presentación.");
                            presentation.focus();
                            return false; 
                        }else{
                            if(description.value.length ==0){
                                alert("Recuerde que todos los campos son obligatorios, por favor escriba su descripción.");
                                description.focus();
                                return false;
                            }else {
                                if(price.value.length ==0){
                                    alert("Recuerde que todos los campos son obligatorios, por favor escriba su precio.");
                                    price.focus();
                                    return false;
                                }else {
                                    if(availability.value.length ==0){
                                        alert("Recuerde que todos los campos son obligatorios, por favor escriba la disponibilidad del producto.");
                                        availability.focus();
                                        return false;
                                    }else {
                                        if(quantity.value.length ==0){
                                            alert("Recuerde que todos los campos son obligatorios, por favor escriba la cantidad del producto.");
                                            quantity.focus();
                                            return false;
                                        }else {
                                            if(photography.value.length ==0){
                                                alert("Recuerde que todos los campos son obligatorios, por favor indique la url de la foto.");
                                                photography.focus();
                                                return false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }   
            }
            
        }
    }
}

