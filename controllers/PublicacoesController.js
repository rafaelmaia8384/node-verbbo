const uuid = require('uuid/v4');
const db = require('../models/index.js');
const fs = require('fs');
const path = require('path');
const ServerResponse = require('../helpers/ServerResponse.js');
const storage = require('../helpers/StorageHelper.js');
const Op = db.Sequelize.Op;

class PublicacoesController {

    static async prever(request, response) {
        try {
            // console.log(request.body);
            // const json = JSON.parse(request.body.content_json);
            // console.log(json.elementos);

            //const html = fs.readFileSync(path.resolve(__dirname + '/../public/template-publicacao.html'), 'utf8');

            //response.status(200).send(html);

            const usuario = await db.usuarios.findOne({ where: { id: request.usuario.id_usuario } });

            const usuarioImagem = usuario.path_image;
            const usuarioNome = usuario.publicante_nome;
            const imgPath = request.body.path_image;
            const fonte = request.body.fonte;
            const titulo = request.body.titulo;
            const subTitulo = request.body.sub_titulo;

            ServerResponse.success(response, PublicacoesController.obterHtml(usuarioImagem, usuarioNome, imgPath, fonte, titulo, subTitulo));
        }
        catch(error) {
            console.log('Error: ' + error);
            ServerResponse.error(response, 'Erro ao prever publicação. Tente novamente em instantes.');
        }
    }

    static obterHtml(usuarioImagem, usuarioNome, imgPath, fonte, titulo, subTitulo) {
        
        const page = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>Document</title>
            <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet">
        </head>
        <body class="bg-gray-200">
            <div id="app">
                <div id="layoutImagem" class="fixed hidden w-full z-10">
                    <div class="relative">
                        <div id="buttonFecharImagem" class="absolute w-8 h-8 cursor-pointer" style="right: 8px; top: 8px;">
                            <i class="ml-1 fa fa-times" style="font-size: 32px; color: #cccccc;"></i>
                        </div>
                    </div>
                    <div class="w-full h-screen flex items-center justify-center" style="background-color: rgba(0, 0, 0, 0.8);">
                        <img id="imagemRoot" onclick="doNothing" src="" alt="">
                    </div>
                </div>
                <header class="border-b-4 border-gray-500" style="background-color: #434442;">
                </header> 
                <main class="container m-auto max-w-5xl">
                    <div class="md:pt-6 flex bg-white pb-10">
                        <div class="max-w-full">
                            <div class="md:pl-6 md:pr-3" style="max-width: 100%;">
                                <div class="items-center justify-center m-auto">
                                    <img id="imagem" class="cursor-pointer" src="${imgPath}" alt="">
                                    <div class="flex justify-end">
                                        <span class="px-2 py-1 bg-gray-200 text-gray-700" style="font-size: calc(6px + 0.4vmax);">${fonte}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="p-3">                        
                                <div class="p-3">
                                    <div class="max-w-5xl">
                                        <div class="flex items-center">
                                            <img class="rounded-full mt-2 h-16 w-16" src="${usuarioImagem}" alt="">
                                            <div class="mt-1 pl-3 max-w-sm">
                                                <i class="endtext-gray-700" style="font-size: 12px;">${usuarioNome}</i>
                                                <p class="mt-1 text-gray-500" style="font-size: 8px;">Publicado em: 00/00/0000 às 00:00:00</p>
                                                <div class="mt-2 flex flex-wrap items-start">
                                                    <div class="text-black mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px; background-color: #e0e0e0;">Economia</div>
                                                    <div class="text-black mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px; background-color: #fff176;">Saúde</div>
                                                    <div class="text-black mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px; background-color: #a1887f;">Segurança</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="mt-4 text-black font-bold leading-2" style="font-size: calc(14px + 1.5vmax);">${titulo}</p>
                                    <p class="mt-3 text-black font-bold leading-7" style="font-size: calc(14px + 0.7vmax);">${subTitulo}</p>
                                    <div class="mt-4 flex flex-wrap items-start"> 
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">ipsum</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">dolor sit</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">amet</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">consectetur</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">adipisicing</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">elit</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Doloribus</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
                                        <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div> 
                                    </div>
                                    <p class="py-3 endtext-gray-700 leading-7" style="font-size: calc(10px + 0.8vmax);">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum fugit reiciendis itaque non minima quae? Deleniti accusantium aut exercitationem sed labore corporis, velit vitae impedit doloribus ipsam dicta ducimus in distinctio perferendis culpa officia reprehenderit. Nam aperiam nulla illo non sit iste aut repellendus repellat. Doloremque deleniti reprehenderit assumenda animi accusantium ratione a dicta ab, odio eius. Nesciunt perferendis culpa, recusandae sequi obcaecati tempore excepturi odit cum ut est perspiciatis eligendi quae officia ducimus iste esse similique eius labore quasi placeat, amet, voluptatibus maxime minus. Necessitatibus quae recusandae voluptatum officia voluptate fugit, qui soluta vero maiores magni voluptatibus laborum iure.</p>
                                    <p class="py-3 endtext-gray-700 leading-7 italic" style="font-size: calc(10px + 0.8vmax);">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas consectetur fugit beatae reprehenderit laudantium quae sequi unde veniam accusantium aspernatur.</p>                    
                                    <div class="flex py-3">
                                        <div class="items-center justify-center m-auto">
                                            <img id="imagem" class="cursor-pointer" src="./img/img.jpg" alt="">
                                            <div class="flex justify-end">
                                                <span class="px-2 py-1 bg-gray-200 text-gray-700" style="font-size: calc(6px + 0.4vmax);">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur rerum dolorum atque id consequatur ducimus nemo voluptatem eius deleniti iure.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="py-3 endtext-gray-700 leading-7 font-bold" style="font-size: calc(10px + 0.8vmax);">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas consectetur fugit beatae reprehenderit laudantium quae sequi unde veniam accusantium aspernatur.</p>
                                    <div class="py-3 m-auto max-w-md ">
                                        <blockquote class="flex relative p-3 text-sm italic border-l-4 border-gray-500 bg-gray-200 text-neutral-600">
                                            <i class="fa fa-quote-left pl-1 pr-3 text-gray-500" style="font-size: 32px;"></i>
                                            <div class="w-full flex items-center justify-center">
                                                <p class="leading-7" style="font-size: calc(14px + 1.0vmax);">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero quia ad autem aliquam veniam corrupti fugit assumenda iste earum magni.</p>
                                            </div>
                                        </blockquote>
                                        <div class="flex justify-end">
                                            <span class="px-2 py-1 bg-gray-200 text-gray-700" style="font-size: calc(6px + 0.4vmax);">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                                        </div>
                                    </div>
                                    <p class="py-3 endtext-gray-700 leading-7" style="font-size: calc(10px + 0.8vmax);">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio id sequi alias voluptate ex, rem voluptas architecto inventore consequatur ut voluptates commodi perferendis perspiciatis temporibus totam placeat ducimus harum illo veniam obcaecati blanditiis quo. Ducimus sunt alias maiores laboriosam dolorem!</p>
                                    <div class="flex py-3">
                                        <div class="items-center justify-center m-auto">
                                            <img id="imagem" class="cursor-pointer" src="./img/640.png" alt="">
                                            <div class="flex justify-end">
                                                <span class="px-2 py-1 bg-gray-200 text-gray-700" style="font-size: calc(6px + 0.4vmax);">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur rerum dolorum atque id consequatur ducimus nemo voluptatem eius deleniti iure.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="py-3 endtext-gray-700 leading-7" style="font-size: calc(10px + 0.8vmax);">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio id sequi alias voluptate ex, rem voluptas architecto inventore consequatur ut voluptates commodi perferendis perspiciatis temporibus totam placeat ducimus harum illo veniam obcaecati blanditiis quo. Ducimus sunt alias maiores laboriosam dolorem!</p>
                                    <div class="py-3">
                                        <audio controls="controls" src="./sound/sound.mp3" style="width: 100%;">
                                            Seu navegador não suporta esse elemento HTML.
                                        </audio>
                                    </div>
                                    <div class="py-3 m-auto max-w-md">
                                        <blockquote class="flex relative p-3 text-sm border-l-4 border-gray-500 bg-gray-200 text-neutral-600">
                                            <i class="fa fa-link pl-2 pr-3 text-gray-500" style="font-size: 32px;"></i>
                                            <div class="w-full flex items-center justify-center">
                                                <a class="text-blue-500 leading-5 break-all" target="_blank" rel="noopener noreferrer" href="#"><u class="leading-4">https://www.google.com/search/awiudhawiudhwuai/audiehdeiuhiuwhiehiwuh/ewiufhewifewnfeobfiebofybewoyfbe</u></a>
                                            </div>
                                        </blockquote>
                                        <div class="flex justify-end">
                                            <span class="px-2 py-1 bg-gray-200 text-gray-700" style="font-size: calc(6px + 0.4vmax);">Link da matéria que fala sobre o possível assalto a banco na cidade de João Pessoa-PB.</span>
                                        </div>
                                    </div>
                                    <p class="py-3 endtext-gray-700 leading-7" style="font-size: calc(10px + 0.8vmax);">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nesciunt in iste voluptates corporis, unde exercitationem, quibusdam dolores accusamus doloribus labore officia repellendus fugiat? Nemo esse aut ex pariatur assumenda atque eum enim adipisci, deserunt totam quia quaerat officiis odit nisi, natus possimus repudiandae dolore officia quas fugiat? Dignissimos facilis possimus commodi repellat error tempora a, ab quo quod. Vero omnis quibusdam saepe perferendis sunt ea deleniti facere assumenda explicabo eveniet a error consequatur veniam libero, quos rerum nostrum necessitatibus odit provident vel iste ducimus nihil in quam. Dicta magni ipsa expedita est tempora eos ad modi, sint, corrupti eius eligendi. Alias sint voluptates, id reprehenderit qui architecto. Est ipsam eaque earum ut, iusto amet tempora in voluptates sapiente itaque! Quidem quos quasi quisquam saepe obcaecati. Illo, iste in. Excepturi minus consectetur eligendi quae impedit. Illo incidunt voluptates excepturi asperiores.</p>
                                    <div class="py-3">
                                        <div style="position:relative; padding-top: 56.25%;">
                                            <iframe src="https://www.youtube.com/embed/nckseQJ1Nlg" frameborder="0" allowfullscreen
                                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
                                        </div>
                                    </div>
                                    <p class="py-3 endtext-gray-700 leading-7" style="font-size: calc(10px + 0.8vmax);">Lorem ipsum dolor sit amet consectetur adipisicing elit. In reiciendis consectetur tenetur blanditiis asperiores aspernatur eligendi labore, facere itaque vel, praesentium nemo fugit veniam, quibusdam maiores quas harum voluptas atque..</p>
                                </div>
                                <div id="layoutVejaTambem" class="grid grid-cols-2 gap-3">    
                                </div>
                            </div>
                        </div>
                        <div id="layoutLateral" class="hidden md:block flex-1 ml-3 mr-6">
                            <div id="layoutAds"></div>
                            <div class="flex justify-start">
                                <p class="mt-2 text-gray-600 text-md border-b-2 border-gray-600 p-1 mb-3" style="font-size: calc(10px + 0.6vmax);">Destaques</p>
                            </div>
                            <div id="layoutDestaques" class="hidden md:block flex-1 mt-3"></div>
                        </div>
                    </div>
                </main>
            </div>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
            <script>
                $(document).ready(() => {
                    $('[id=imagem]').click(function(){
                        $('#layoutImagem').fadeIn(100);
                        const src = $(this).attr('src');
                        console.log(src);
                        $('#imagemRoot').attr('src', src);
                    });
                    $('#buttonFecharImagem').click(() => {
                        $('#layoutImagem').fadeOut(100);
                    });
                });
            </script>
        </body>
        </html>
        `;

        return page;
    }
}

// const page = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
//             <title>Document</title>
//             <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
//             <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
//             <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet">
//         </head>
//         <body class="bg-gray-200">
//             <div id="app">
//                 <div class="mt-40 fixed w-6 hidden xl:block">
//                     <div class="ml-1 a2a_kit a2a_kit_size_32 a2a_default_style">
//                         <a class="mb-1 a2a_button_facebook"></a>
//                         <a class="mb-1 a2a_button_twitter"></a>
//                         <a class="mb-1 a2a_button_whatsapp"></a>
//                         <a class="mb-1 a2a_button_telegram"></a>
//                         <a class="mb-1 a2a_button_google_gmail"></a>
//                         <a class="mb-1 a2a_button_linkedin"></a>
//                         <a class="mb-1 a2a_button_email"></a>
//                     </div>
//                 </div>
//                 <div id="layoutBusca" class="fixed w-full h-screen hidden z-10" style="background-color: rgba(0, 0, 0, 0.8);">
//                     <div class="w-full" style="background-color: #434442;">
//                         <div class="bg-black h-2"></div>
//                         <div class="relative">
//                             <div id="buttonFecharBusca" class="absolute w-6 h-6 cursor-pointer" style="right: 8px; top: 8px;">
//                                 <i class="ml-1 fa fa-times" style="font-size: 22px; color: #cccccc;"></i>
//                             </div>
//                             <div class="h-16 flex items-end justify-center pb-2">
//                                 <input class="p-2 bg-gray-200 rounded-md" style="font-size: 10px; width: 280px;" placeholder="Buscar conteúdo"></input>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                // <div id="layoutImagem" class="fixed hidden w-full z-10">
                //     <div class="relative">
                //         <div id="buttonFecharImagem" class="absolute w-8 h-8 cursor-pointer" style="right: 8px; top: 8px;">
                //             <i class="ml-1 fa fa-times" style="font-size: 32px; color: #cccccc;"></i>
                //         </div>
                //     </div>
                //     <div class="w-full h-screen flex items-center justify-center" style="background-color: rgba(0, 0, 0, 0.8);">
                //         <img id="imagemRoot" onclick="doNothing" src="" alt="">
                //     </div>
                // </div>
//                 <header class="border-b-4 border-gray-500" style="background-color: #434442;">
//                     <div class="h-2" style="background-color: #1b1b1b;">
//                     </div>
//                     <div class="container m-auto h-16 flex items-center justify-between">
//                         <div>
//                             <a href="#" class="ml-2" style="color: #43a047; font-size: 34px; font-weight: bold;">Verbbo<a class="mt-5" href="#" style="color: #43a047; font-size: 10px;">.com.br</a></a>
//                         </div>
//                         <div class="inline-flex items-center">
//                             <div class="sm:hidden inline-flex items-center"> 
//                                 <div id="buttonBusca" class="flex items-center mr-1 rounded-md cursor-pointer" style="width: 26px; height: 26px; background-color: #cccccc;">
//                                     <i class="ml-1 fa fa-search" style="font-size: 22px; color: #434442;"></i>
//                                 </div>
//                                 <div class="ml-1 mr-1 w-2 h-2 rounded-full" style="background-color: #cccccc;"></div>
//                             </div>
//                             <div class="hidden sm:block relative">
//                                 <div class="inline-flex items-center">
//                                     <input class="p-2 bg-gray-200 rounded-md mr-1" style="font-size: 10px; width: 280px;" placeholder="Buscar conteúdo"></input>
//                                     <div class="absolute" style="top: 3px; right: 22px;">
//                                         <i class="fa fa-search" style="font-size: 22px; color: #aaa;"></i>
//                                     </div>
//                                     <div class="ml-1 mr-1 w-2 h-2 rounded-full" style="background-color: #cccccc;"></div>
//                                 </div>
//                             </div>
//                             <div class="pr-4">
//                                 <a href="#"><i class="fa fa-facebook-square ml-1" style="font-size: 30px; color: #cccccc;"></i></a>
//                                 <a href="#"><i class="fa fa-instagram ml-1" style="font-size: 30px; color: #cccccc;"></i></a>
//                                 <a href="#"><i class="fa fa-twitter-square ml-1" style="font-size: 30px; color: #cccccc;"></i></a>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="bg-gray-400 p-2 flex items-center justify-center">
//                         <div>
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Política</a>
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Economia</a>
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Saúde</a>
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Segurança</a>
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Esportes</a>
//                         </div>
//                         <div class="lg:hidden">
//                             <a href="#" class=" p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Mais</a>
//                         </div>
//                         <div class="hidden lg:block ">
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Ciência e Tecnologia</a>
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Artes</a>
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Turismo</a>
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Moda e Beleza</a>
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Entretenimento</a>
//                             <a href="#" class="p-1 sm:p-2 md:py-3 lg:p-4 xl:p-5 text-gray-700 hover:text-green-700" style="font-size: calc(8px + 0.2vmax);">Educação</a>
//                         </div>
//                     </div>
//                 </header> 
//                 <main class="container m-auto max-w-5xl">
//                     <div class="md:pt-6 flex bg-white pb-10">
//                         <div class="max-w-full">
//                             <div class="md:pl-6" style="max-width: 100%;">
//                                 <div class="items-center justify-center m-auto">
//                                     <img id="imagem" class="cursor-pointer" src="${imgPath}" alt="">
//                                     <div class="flex justify-end">
//                                         <span class="px-2 py-1 bg-gray-200 text-gray-700" style="font-size: calc(6px + 0.4vmax);">Foto da entrevista no planalto central.</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="p-3">                        
//                                 <div class="p-3">
//                                     <div class="max-w-5xl">
//                                         <div class="flex items-center">
//                                             <img class="rounded-full mt-2 h-12 w-12" src="./img/profile.jpg" alt="">
//                                             <div class="mt-1 pl-3 max-w-sm">
//                                                 <i class="endtext-gray-700" style="font-size: 12px;">Raquel Lemos</i>
//                                                 <p class="mt-1 text-gray-500" style="font-size: 8px;">Publicado em: 00/00/0000 às 00:00:00</p>
//                                                 <div class="mt-2 flex flex-wrap items-start">
//                                                     <div class="text-black mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px; background-color: #e0e0e0;">Economia</div>
//                                                     <div class="text-black mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px; background-color: #fff176;">Saúde</div>
//                                                     <div class="text-black mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px; background-color: #a1887f;">Segurança</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <p class="mt-4 text-black font-bold leading-2" style="font-size: calc(14px + 1.5vmax);">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, molestiae.</p>
//                                     <p class="mt-3 text-black font-bold leading-7" style="font-size: calc(14px + 0.7vmax);">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure doloremque accusamus quae consequuntur id velit perferendis ut atque quas at? Et consequuntur quos odio itaque. Maxime totam vitae, esse deleniti provident aliquid ratione, quas laudantium facere voluptate expedita magni itaque.</p>
//                                     <div class="mt-4 flex flex-wrap items-start"> 
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">ipsum</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">dolor sit</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">amet</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">consectetur</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">adipisicing</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">elit</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Doloribus</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div>
//                                         <div class="endtext-gray-700 bg-gray-300 mr-1 mb-1 px-2 py-1 rounded-full" style="font-size: 8px;">Lorem</div> 
//                                     </div>
//                                     <div class="mt-4 mb-4">
//                                         <span class="text-gray-800" style="font-size: calc(8px + 0.2vmax);">Compartilhe nas redes sociais</span>
//                                         <div class="mt-1 a2a_kit a2a_kit_size_32 a2a_default_style">
//                                             <a class="a2a_button_facebook"></a>
//                                             <a class="a2a_button_twitter"></a>
//                                             <a class="a2a_button_whatsapp"></a>
//                                             <a class="a2a_button_telegram"></a>
//                                             <a class="a2a_button_google_gmail"></a>
//                                             <a class="a2a_button_linkedin"></a>
//                                             <a class="a2a_button_email"></a>
//                                         </div>
//                                     </div>
//                                     <p class="py-3 endtext-gray-700 leading-7" style="font-size: calc(10px + 0.8vmax);">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum fugit reiciendis itaque non minima quae? Deleniti accusantium aut exercitationem sed labore corporis, velit vitae impedit doloribus ipsam dicta ducimus in distinctio perferendis culpa officia reprehenderit. Nam aperiam nulla illo non sit iste aut repellendus repellat. Doloremque deleniti reprehenderit assumenda animi accusantium ratione a dicta ab, odio eius. Nesciunt perferendis culpa, recusandae sequi obcaecati tempore excepturi odit cum ut est perspiciatis eligendi quae officia ducimus iste esse similique eius labore quasi placeat, amet, voluptatibus maxime minus. Necessitatibus quae recusandae voluptatum officia voluptate fugit, qui soluta vero maiores magni voluptatibus laborum iure.</p>
//                                     <p class="py-3 endtext-gray-700 leading-7 italic" style="font-size: calc(10px + 0.8vmax);">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas consectetur fugit beatae reprehenderit laudantium quae sequi unde veniam accusantium aspernatur.</p>                    
//                                     <div class="flex py-3">
//                                         <div class="items-center justify-center m-auto">
//                                             <img id="imagem" class="cursor-pointer" src="./img/img.jpg" alt="">
//                                             <div class="flex justify-end">
//                                                 <span class="px-2 py-1 bg-gray-200 text-gray-700" style="font-size: calc(6px + 0.4vmax);">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur rerum dolorum atque id consequatur ducimus nemo voluptatem eius deleniti iure.</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <p class="py-3 endtext-gray-700 leading-7 font-bold" style="font-size: calc(10px + 0.8vmax);">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas consectetur fugit beatae reprehenderit laudantium quae sequi unde veniam accusantium aspernatur.</p>
//                                     <div class="py-3 m-auto max-w-md ">
//                                         <blockquote class="flex relative p-3 text-sm italic border-l-4 border-gray-500 bg-gray-200 text-neutral-600">
//                                             <i class="fa fa-quote-left pl-1 pr-3 text-gray-500" style="font-size: 32px;"></i>
//                                             <div class="w-full flex items-center justify-center">
//                                                 <p class="leading-7" style="font-size: calc(14px + 1.0vmax);">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero quia ad autem aliquam veniam corrupti fugit assumenda iste earum magni.</p>
//                                             </div>
//                                         </blockquote>
//                                         <div class="flex justify-end">
//                                             <span class="px-2 py-1 bg-gray-200 text-gray-700" style="font-size: calc(6px + 0.4vmax);">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
//                                         </div>
//                                     </div>
//                                     <p class="py-3 endtext-gray-700 leading-7" style="font-size: calc(10px + 0.8vmax);">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio id sequi alias voluptate ex, rem voluptas architecto inventore consequatur ut voluptates commodi perferendis perspiciatis temporibus totam placeat ducimus harum illo veniam obcaecati blanditiis quo. Ducimus sunt alias maiores laboriosam dolorem!</p>
//                                     <div class="flex py-3">
//                                         <div class="items-center justify-center m-auto">
//                                             <img id="imagem" class="cursor-pointer" src="./img/640.png" alt="">
//                                             <div class="flex justify-end">
//                                                 <span class="px-2 py-1 bg-gray-200 text-gray-700" style="font-size: calc(6px + 0.4vmax);">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur rerum dolorum atque id consequatur ducimus nemo voluptatem eius deleniti iure.</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <p class="py-3 endtext-gray-700 leading-7" style="font-size: calc(10px + 0.8vmax);">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio id sequi alias voluptate ex, rem voluptas architecto inventore consequatur ut voluptates commodi perferendis perspiciatis temporibus totam placeat ducimus harum illo veniam obcaecati blanditiis quo. Ducimus sunt alias maiores laboriosam dolorem!</p>
//                                     <div class="py-3">
//                                         <audio controls="controls" src="./sound/sound.mp3" style="width: 100%;">
//                                             Seu navegador não suporta esse elemento HTML.
//                                         </audio>
//                                     </div>
//                                     <div class="py-3 m-auto max-w-md">
//                                         <blockquote class="flex relative p-3 text-sm border-l-4 border-gray-500 bg-gray-200 text-neutral-600">
//                                             <i class="fa fa-link pl-2 pr-3 text-gray-500" style="font-size: 32px;"></i>
//                                             <div class="w-full flex items-center justify-center">
//                                                 <a class="text-blue-500 leading-5 break-all" target="_blank" rel="noopener noreferrer" href="#"><u class="leading-4">https://www.google.com/search/awiudhawiudhwuai/audiehdeiuhiuwhiehiwuh/ewiufhewifewnfeobfiebofybewoyfbe</u></a>
//                                             </div>
//                                         </blockquote>
//                                         <div class="flex justify-end">
//                                             <span class="px-2 py-1 bg-gray-200 text-gray-700" style="font-size: calc(6px + 0.4vmax);">Link da matéria que fala sobre o possível assalto a banco na cidade de João Pessoa-PB.</span>
//                                         </div>
//                                     </div>
//                                     <p class="py-3 endtext-gray-700 leading-7" style="font-size: calc(10px + 0.8vmax);">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nesciunt in iste voluptates corporis, unde exercitationem, quibusdam dolores accusamus doloribus labore officia repellendus fugiat? Nemo esse aut ex pariatur assumenda atque eum enim adipisci, deserunt totam quia quaerat officiis odit nisi, natus possimus repudiandae dolore officia quas fugiat? Dignissimos facilis possimus commodi repellat error tempora a, ab quo quod. Vero omnis quibusdam saepe perferendis sunt ea deleniti facere assumenda explicabo eveniet a error consequatur veniam libero, quos rerum nostrum necessitatibus odit provident vel iste ducimus nihil in quam. Dicta magni ipsa expedita est tempora eos ad modi, sint, corrupti eius eligendi. Alias sint voluptates, id reprehenderit qui architecto. Est ipsam eaque earum ut, iusto amet tempora in voluptates sapiente itaque! Quidem quos quasi quisquam saepe obcaecati. Illo, iste in. Excepturi minus consectetur eligendi quae impedit. Illo incidunt voluptates excepturi asperiores.</p>
//                                     <div class="py-3">
//                                         <div style="position:relative; padding-top: 56.25%;">
//                                             <iframe src="https://www.youtube.com/embed/nckseQJ1Nlg" frameborder="0" allowfullscreen
//                                             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
//                                         </div>
//                                     </div>
//                                     <p class="py-3 endtext-gray-700 leading-7" style="font-size: calc(10px + 0.8vmax);">Lorem ipsum dolor sit amet consectetur adipisicing elit. In reiciendis consectetur tenetur blanditiis asperiores aspernatur eligendi labore, facere itaque vel, praesentium nemo fugit veniam, quibusdam maiores quas harum voluptas atque..</p>
//                                     <div class="mt-4 mb-4">
//                                         <span class="text-gray-800" style="font-size: calc(8px + 0.2vmax);">Compartilhe nas redes sociais</span>
//                                         <div class="mt-1 a2a_kit a2a_kit_size_32 a2a_default_style">
//                                             <a class="a2a_button_facebook"></a>
//                                             <a class="a2a_button_twitter"></a>
//                                             <a class="a2a_button_whatsapp"></a>
//                                             <a class="a2a_button_telegram"></a>
//                                             <a class="a2a_button_google_gmail"></a>
//                                             <a class="a2a_button_linkedin"></a>
//                                             <a class="a2a_button_email"></a>
//                                         </div>
//                                         <script async src="https://static.addtoany.com/menu/page.js"></script>
//                                     </div>
//                                     <div class="flex justify-start mt-4">
//                                         <p class="text-gray-600 text-md border-b-2 border-gray-600 p-1 mb-3" style="font-size: calc(10px + 0.6vmax);">Veja também</p>
//                                     </div>
//                                 </div>
//                                 <div id="layoutVejaTambem" class="grid grid-cols-2 gap-3">    
//                                 </div>
//                             </div>
//                         </div>
//                         <div id="layoutLateral" class="hidden md:block flex-1 ml-3 mr-6">
//                             <div id="layoutAds"></div>
//                             <div class="flex justify-start">
//                                 <p class="mt-2 text-gray-600 text-md border-b-2 border-gray-600 p-1 mb-3" style="font-size: calc(10px + 0.6vmax);">Destaques</p>
//                             </div>
//                             <div id="layoutDestaques" class="hidden md:block flex-1 mt-3"></div>
//                         </div>
//                     </div>
//                 </main>
//                 <footer class="border-t-4 border-gray-500">
//                     <div class="p-12 bg-gray-200">
//                         <div class="flex justify-center ">
//                             <a href="#"><i class="fa fa-facebook-square ml-2 mr-2" style="font-size: 32px; color: #888888;"></i></a>
//                             <a href="#"><i class="fa fa-instagram ml-2 mr-2" style="font-size: 32px; color: #888888;"></i></a>
//                             <a href="#"><i class="fa fa-twitter-square ml-2 mr-2" style="font-size: 32px; color: #888888;"></i></a>
//                         </div>
//                         <div class="mt-2 flex justify-center text-gray-500" style="font-size: 10px;">
//                             <p>© Global Inotec Ltda</p>
//                         </div>
//                     </div>
//                 </footer>
//             </div>
//             <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
//             <script>
//                 $(document).ready(() => {
//                     $('#buttonBusca').click(() => {
//                         $('#layoutBusca').fadeIn(100);
//                     });
//                     $('#buttonFecharBusca').click(() => {
//                         $('#layoutBusca').fadeOut(100);
//                     });
//                     $('[id=imagem]').click(function(){
//                         $('#layoutImagem').fadeIn(100);
//                         const src = $(this).attr('src');
//                         console.log(src);
//                         $('#imagemRoot').attr('src', src);
//                     });
//                     $('#buttonFecharImagem').click(() => {
//                         $('#layoutImagem').fadeOut(100);
//                     });
//                 });
//             </script>
//         </body>
//         </html>
//         `;

module.exports = PublicacoesController;
