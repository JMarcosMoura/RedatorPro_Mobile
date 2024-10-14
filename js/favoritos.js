var localFavoritos = localStorage.getItem('listafav');

if(localFavoritos){
    var listafav = JSON.parse(localFavoritos);
    if(listafav.length > 0) {
        //TEM ITEM NA LISTA FAVORITOS
        //REDERIZAR LISTA FAVORITOS
        redenrizarLista();
    } else {
        //MOSTRAR LISTA VAZIA
        listaVazia();
    }
} else {
    //MOSTRAR A LISTA VAZIA
    listaVazia();
}

function redenrizarLista(){
    //ESVAZIAR A ÁREA DOS ITENS
    $('#listaFavoritos').empty();

    //PECORRER A LISTA E ALIMENTAR A ÁREA
    $.each(listafav, function(index, itemFavorito){
        var itemDiv = `
        <!--CORRETOR FAVORITO-->
        <div class="item-favorito">
            <div class="area-img">
                <img src="${itemFavorito.item.imagem}">
            </div>
            <div class="area-details">
                <div class="sup">
                    <span class="name-corretor">
                         ${itemFavorito.item.nome}
                    </span>
                    <a data-index=${index} class="delete" href="#">
                        <i class="mdi mdi-close"></i>
                    </a>
                </div>
                <div class="middle">
                    <span>${itemFavorito.item.especialidade}</span>
                </div>
            </div>
        </div>
        `;

        $("#listaFavoritos").append(itemDiv);
    });
}

function listaVazia(){
    console.log('Lista está vazia');
    $('#listaFavoritos').empty();

    //MOSTRAR SACOLINHA VAZIA
    $("#listaFavoritos").html(`
        <div class="text-align-center">
            <img style="max-width: 100%; height: auto;" src="img/empty.gif">
            <br><span class="color-gray">Ninguém por enquanto...</span>
        </div>
        `);
}

//ESVAZIAR A LISTA
$("#esvaziar").on('click', function(){
    app.dialog.confirm('Tem certeza que deseja esvaziar sua lista de corretores favoritos?', '<strong>Esvaziar</strong>', function(){
        //APAGAR O LOCALSTORAGE DA LISTA
        localStorage.removeItem('listafav');
        app.views.main.router.refreshPage();
    });
});

$(".delete").on('click', function (){
    var index = $(this).data('index');
    console.log('O índice é: ', index);

    //CONFIRMAR
    app.dialog.confirm('Tem certeza que deseja remover esse corretor?', '<strong>REMOVER</strong>', function(){
        //REMOVER O ITEM DA LISTA
        listafav.splice(index, 1);
        //ATUALIZAR CARINHO COM O ITEM REMOVIDO
        localStorage.setItem('listafav', JSON.stringify(listafav))
        //ATUALIZAR A PÁGINA
        app.views.main.router.refreshPage();
    });
});

