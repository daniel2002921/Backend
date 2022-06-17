import todoModel from "../Models/data.js"
const LoginController = {
    // 傳入參數 req, res
    index: (req, res) => {
      
        const todo = todoModel.getAll()

        // res.send(todo)
        res.render('hello', {
            todos:todo
          })
      
    }
  }



   export default LoginController