Clone do Twitter - X

----- BACKEND -----

POST host/user/create -> espera receber um objeto do seguinte tipo: {
  customName: string,
  tagName: string,
  picture: string,
  password: string,
  email: string,
  description: string,
}

POST host/user/login -> espera receber um objeto do seguinte tipo: {
  email: string, password: string
}

Rotas que precisam de verificação por Token no Header da requisição:

DELETE host/user/delete -> Espera receber um body vazio.

POST host/post/create -> espera receber um objeto do seguinte tipo: {
  content: "Esse twitter é melhor que o original."
}

GET host/post/global/:page -> Não espera nenhum body.
GET host/post/:userId/:limit -> Não espera nenhum body.

DELETE host/post/delete -> espera receber um objeto do seguinte tipo: {
  postId: number
}
