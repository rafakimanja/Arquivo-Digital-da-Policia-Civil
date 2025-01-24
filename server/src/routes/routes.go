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
		grupo.POST("/documentos", controllers.CriaNovoArquivo)
		grupo.PUT("documentos/:id", controllers.AtualizaArquivo)
		grupo.DELETE("/documentos/:id", controllers.DeletaArquivo)
		grupo.GET("/config", controllers.ExibeConfSistema)
		grupo.POST("/config", controllers.SalvaConfSistema)
		grupo.GET("/usuarios", controllers.ExibeTodosUsuarios)
		grupo.GET("/usuarios/:id", controllers.BuscaUsuario)
		grupo.POST("/usuarios/form", controllers.CriaNovoUsuario)
		grupo.PATCH("usuarios/:id", controllers.AtualizaUsuario)
		grupo.DELETE("/usuarios/:id", controllers.DeletaUsuario)
	}
	r.Run(":5000")
}