let urlBaseOrder = "http://localhost:8080/api/order";
$(document).ready(getOrder);
function getOrder() {
    $("#info").removeAttr("style");
    $.ajax({
        dataType: 'json',
        url: urlBaseOrder + "/all",
        type: "GET",
        success: function (response) {
            var misItems = response;

            for (let i = 0; i < misItems.length; i++) {
                $("#allItemsUser").append("<tr>");
                $("#allItemsUser").append("<td>" + misItems[i].id + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].registerDay.split("T")[0] + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].status + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].salesMan.name + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].products.brand + "</td>");
                $("#allItemsUser").append("<td>" + misItems[i].quantities + "</td>");
                $("#allItemsUser").append('<td><button class="btn btn-outline-danger" onclick="deleteUser(' + misItems[i].id + ')">Borrar Usuario</button>');
                $("#allItemsUser").append('<td><button class="btn btn-outline-info" onclick="getUserById(' + misItems[i].id + ')">Actualizar Usuario</button>');
                $("#allItemsUser").append("</tr>");
            }
            console.log(misItems)
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function putUser() {
    console.log("ejecutando funcion para actualizar");
    var elemento = {
        id: $('#idorder').val(),
        identification: $('#ssn').val(),
        name: $("#nameU").val(),
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#emailC").val(),
        password: $("#passwordC").val(),
        passwordC: $("#passwordCC").val(),
        zone: $("#zone").val(),
        type: $('#type').val()
    };
    console.log(elemento);
    var dataToSend = JSON.stringify(elemento);
    if (camposLlenos(elemento)) {
        let opc = confirm('¿Está seguro que desea actualizar este Usuario?\n Are you sure that you want update this User?');
        if (opc) {
            $.ajax({
                contentType: 'application/json',
                data: dataToSend,
                url: urlBaseUser + "/update",
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


function deleteUser(id) {
    console.log(id);
    let opc = confirm('¿Está seguro que desea eliminar este usuario?\n Are you sure that you want delete this user?');
    if (opc) {
        $.ajax({

            dataType: 'json',
            url: urlBaseUser + "/" + id,
            type: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function (response) {
                    success:{

                        alert('Se ha eliminado el usuario');
                        getUser();
                        window.location.reload();
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function validarOrder() {
    let order = {
        id: $("#idorder").val(),
        registerDay: $("#registerDay").val(),
        status: $("#status").val(),
        salesMan: $("#salesMan").val()
    };
    console.log(order);
    if (camposLlenos(order)) {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(order),
            url: urlBaseOrder + "/new",
            statusCode: {
                201: function (response) {
                    success: {
                        console.log(response);
                        alert("Se registró el pedido correctamente.");
                        window.location.href = "user.html";
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("¡Ya existe un pedido! ");
                window.location.href = "user.html";
            }
        });
    }
}

function camposLlenos(order){
    const id= document.getElementById('id');
    console.log(id.value)
    const registerDay= document.getElementById('registerDay');
    console.log(registerDay.value)
    const status = document.getElementById('status');
    console.log(status.value)
    const salesMan= document.getElementById('salesMan');
    console.log(salesMan.value)
    
    if (id.value.length !=0 && registerDay.value.length !=0 && status.value.length !=0 && salesMan.value.length !=0 ){
        console.log("Campos Llenos");
        console.log("campos OK");
            return true;
    }else {
        if (id.value.length==0 && registerDay.value.length==0 && status.value.length==0 && salesMan.value.length==0 ){
            alert("Recuerde que todos los campos son obligatorios, por favor escriba los datos del usuario");
            id.focus();
            return false;
        }else{
            if (id.value.length==0){
                alert("Recuerde que todos los campos son obligatorios, por favor escriba el id del usuario.");
                id.focus();
                return false;
            }else{
                if (registerDay.value.length==0){
                    alert("Recuerde que todos los campos son obligatorios, por favor escriba su identificación.");
                    registerDay.focus();
                    return false;
                }else{
                    if (status.value.length==0){
                        alert("Recuerde que todos los campos son obligatorios, por favor escriba su nombre.");
                        status.focus();
                        return false;
                    }else{
                        if (salesMan.value.length==0){
                            alert("Recuerde que todos los campos son obligatorios, por favor escriba su dirección.");
                            salesMan.focus();
                            return false;
                    
                            }
                    }   
                }
            }
        }
    }
}

