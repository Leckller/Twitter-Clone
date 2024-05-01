Clone do Twitter - X

POST host/user/create -> espera receber um objeto do seguinte tipo: {
  pass
}

DELETE host/user/delete -> espera receber um objeto do seguinte tipo: {
  pass
}

Rotas que precisam de verificação por Token no Header da requisição:

POST host/post/create -> espera receber um objeto do seguinte tipo: {
  content: "Esse twitter é melhor que o original."
}
