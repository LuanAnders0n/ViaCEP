document.getElementById('consultar').addEventListener('click', function () {
  const cep = document.getElementById('cep').value.trim();

  if (!/^\d{8}$/.test(cep)) {
    document.getElementById('resultado').innerHTML =
      '<p class="erro">CEP inválido. Insira um CEP com 8 dígitos numéricos.</p>';
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const xhr = new XMLHttpRequest();

  document.getElementById('loader').style.display = 'block';
  document.getElementById('resultado').innerHTML = '';

  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      document.getElementById('loader').style.display = 'none';

      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        if (response.erro) {
          document.getElementById('resultado').innerHTML =
            '<p class="erro">CEP não encontrado.</p>';
        } else {
          document.getElementById('resultado').innerHTML = `
                      <p><strong>Logradouro:</strong> ${response.logradouro}</p>
                      <p><strong>Bairro:</strong> ${response.bairro}</p>
                      <p><strong>Cidade:</strong> ${response.localidade}</p>
                      <p><strong>Estado:</strong> ${response.uf}</p>
                  `;
        }
      } else {
        document.getElementById('resultado').innerHTML =
          '<p class="erro">Erro ao consultar o CEP.</p>';
      }
    }
  };

  xhr.send();
});
