package routes

import (
	"adpc/src/controllers"
	"adpc/src/middlewares"

	"github.com/gin-gonic/gin"
)

func HandleRequest() {
	r := gin.Default()
	r.POST("/login", controllers.LoginAcess)
	grupo := r.Group("/index", middlewares.AuthMiddleware)
	{
		grupo.GET("/documentos", controllers.ExibeTodosDocumentos)
		grupo.GET("/documentos/:id", controllers.BaixaArquivo)
		grupo.DELETE("/documentos/:id", controllers.DeletaArquivo)
		grupo.POST("/form", controllers.CriaNovoArquivo)
		grupo.GET("/config", controllers.ExibeConfSistema)
		grupo.POST("/config", controllers.SalvaConfSistema)
		grupo.GET("/usuarios", controllers.ExibeTodosUsuarios)
		grupo.GET("/usuarios/:id", controllers.BuscaUsuario)
		grupo.POST("/usuarios/form", controllers.CriaNovoUsuario)
		grupo.DELETE("/usuarios/:id", controllers.DeletaUsuario)
	}
	r.Run()
}