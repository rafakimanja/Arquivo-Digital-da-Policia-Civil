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
		grupo.POST("/form", controllers.CriaNovoArquivo)
		grupo.GET("/config", controllers.ExibeConfSistema)
		grupo.POST("/config")
		grupo.GET("/usuarios", controllers.ExibeTodosUsuarios)
		grupo.POST("/usarios/form")
	}
	r.Run()
}