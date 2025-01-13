package routes

import (
	"adpc/src/controllers"
	"adpc/src/middlewares"

	"github.com/gin-gonic/gin"
)

func HandleRequest() {
	r := gin.Default()
	r.GET("/", controllers.Hello)
	r.POST("/login", controllers.LoginAcess)
	grupo := r.Group("/index", middlewares.BasicMiddleware)
	{
		grupo.GET("/documentos", controllers.ExibeTodosDocumentos)
		grupo.GET("/usuarios", controllers.ExibeTodosUsuarios)
		grupo.GET("/sistema", controllers.ExibeConfSistema)
	}
	r.Run()
}