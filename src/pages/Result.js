import React from "react";
import "./result.css";

function result() {

    return (
        <body>
            <header class="cabecalho">
                <h1>Curso PHP</h1>
                <h2>Índice dos Exercícios</h2>
            </header>
            <main class="principal">
                <div class="conteudo">
                    <nav class="modulos">
                        <div class="modulo verde">
                            <h3>Básico</h3>
                            <ul>
                                <li>
                                    <a href="exercicio.php?dir=basico&file=ola">
                                        Olá PHP
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </main>
            <footer class="rodape">

            </footer>
        </body>  
    );
}

export default result;

