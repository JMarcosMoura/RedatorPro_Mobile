//INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady, false);
var app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },
  // Add default routes
  routes: [
    {
      path: '/index/',
      url: 'index.html',
      options: {
        transition: 'f7-dive',
      },
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
          $("#menuPrincipal").show("fast");
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
          //app.views.main.router.navigate('/detalhes/');
          $.getScript('js/index.js');

          var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: true,
            delay: 3000,
            loop: true,

            breakpoints: {
              50:{
                slidesPerView: 1,
                spaceBetween: 30,
              },
              640:{
                slidesPerView: 2,
                spaceBetween: 30,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });

          var swiper2 = new Swiper(".categorias", {
            slidesPerView: 3,
            spaceBetween: 10,
            freeMode: true,

            breakpoints: {
              50:{
                slidesPerView: 3,
                spaceBetween: 10,
              },
              640:{
                slidesPerView: 6,
                spaceBetween: 10,
              },
              992: {
                slidesPerView: 8,
                spaceBetween: 10,
              },
              1200: {
                slidesPerView: 12,
                spaceBetween: 10,
              },
            },
          });

        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      }
    },
    {
      path: '/link2/',
      url: 'link2.html',
      options: {
        transition: 'f7-dive',
      },
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
          $("#menuPrincipal").show("fast");
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada

          $.getScript('js/filtro.js');

          //ALIMENTAR DE FORMA DINÂMICA A TELA LINK2 ( CORRETORES )
          fetch('js/corretores.json')
          .then(response => response.json())
          .then(data => {
              // Ordenar dados por nome com localeCompare para considerar acentuação
              data.sort((a, b) => a.nome.localeCompare(b.nome));



              //SALVAR DADOS DO BACK-END LOCALMENTE
              localStorage.setItem('corretores', JSON.stringify(data));
              console.log('Dados dos corretores salvos no localStorage');
              
              //SImULAR CARREGAMNETO ONLINE
              setTimeout(() => {

                  //ESVAZIAR A ÁREA DA LISTA DE CORRETORES
                  $("#person-list").empty();

                  data.forEach(corretor => {
                      var corretorHTML = `
                      <a data-id="${corretor.id}" href="#" class="item">
                          <div class="person-card" data-name="${corretor.nome}" data-specialty="${corretor.especialidade}">
                              <div class="person-info">
                                  <img src="${corretor.imagem}" alt="${corretor.nome}" class="person-photo">
                                  <div class="person-details">
                                      <h3 class="person-name">${corretor.nome}</h3>
                                      <p class="person-specialty">${corretor.especialidade}</p>
                                  </div>
                              </div>
                              <div class="person-rating">
                                  <i class="mdi mdi-star" style="color: orange;"></i>
                                  <span class="rating-score">${corretor.rating}</span>
                              </div>
                          </div>
                      </a>
                      `;
              
                      $("#person-list").append(corretorHTML)
              
                  });

                  $(".item").on('click', function () {
                      var id = $(this).attr('data-id');
                      localStorage.setItem('detalhe', id);
                      app.views.main.router.navigate('/detalhes/')
                  });

              }, 1200);


          })
          .catch(error => console.error('Error ao fazer fetch dos dados: '+error));

        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      }
    },
    {
      path: '/favoritos/',
      url: 'favoritos.html',
      animate: false,
      options: {
        transition: 'f7-dive',
      },
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
          //$("#menuPrincipal").hide("fast");
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
          $.getScript('js/favoritos.js');
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      }
    },
    {
      path: '/link4/',
      url: 'link4.html',
      animate: false,
      options: {
        transition: 'f7-dive',
      },
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      }
    },
    {
      path: '/detalhes/',
      url: 'detalhes.html',
      animate: false,
      options: {
        transition: 'f7-dive',
      },
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
          $("#menuPrincipal").hide("fast");
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
          $.getScript('js/detalhes.js');
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
        },
      }
    },
  ],
  // ... other parameters
});

//Para testes direto no navegador
var mainView = app.views.create('.view-main', { url: '/index/' });

//EVENTO PARA SABER O ITEM DO MENU ATUAL
app.on('routeChange', function (route) {
  var currentRoute = route.url;
  console.log(currentRoute);
  document.querySelectorAll('.tab-link').forEach(function (el) {
    el.classList.remove('active');
  });
  var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
  if (targetEl) {
    targetEl.classList.add('active');
  }
});


function onDeviceReady() {
  //Quando estiver rodando no celular
  var mainView = app.views.create('.view-main', { url: '/index/' });

  //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID 	
  document.addEventListener("backbutton", function (e) {

    if (mainView.router.currentRoute.path === '/index/') {
      e.preventDefault();
      app.dialog.confirm('Deseja sair do aplicativo?', function () {
        navigator.app.exitApp();
      });
    } else {
      e.preventDefault();
      mainView.router.back({ force: true });
    }
  }, false);

}
