Clone do twitter

* Routes
  - /login
    - Post {
        body: {
          email: string,
          password: string,
        },
        response: {
          token: string,
        }
      };

  - /user
    - Post {
      body: {
        email: string,
        endereco: string,
        name: string,
        password: string,
        pictureUrl: string
      },
      response: {
        token: string,
      }
    }

    <!-- - Get {
      body: {

      }
    } -->
  
  - /post
   - Post {}
   - Get "/profile/:endereco/:page" {}
   - Get "/global/:page" {}
  