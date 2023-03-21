mudancaCards();
// pega o elemento select
var select = document.getElementById("selecao");

// adiciona um evento onchange ao select
select.onchange = function() {
  mudancaCards(select.value)
}

  // pega o valor selecionado
function mudancaCards(valor){
  // verifica se o valor selecionado é a opção
  if (valor == "Grupo 1") {
    // mostra os campos e o botão
    document.getElementById("informacoesGrupo").style.display = "flex";
    document.getElementById("botao").style.display = "block";
  } else {
    // oculta os campos e o botão
    document.getElementById("informacoesGrupo").style.display = "none";
    document.getElementById("botao").style.display = "none";
    
  }
}

