package routes

import (
	"adpc/src/controllers"
	"adpc/src/middlewares"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func HandleRequest() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Disposition", "Content-Length", "Authorization"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))
	r.POST("/login", controllers.LoginAcess)
	grupo := r.Group("/index", middlewares.AuthMiddleware)
	{
		grupo.GET("/documentos", controllers.ExibeTodosDocumentos)
		grupo.GET("/documentos/:id", controllers.BuscaArquivo)
		grupo.GET("/documentos/donwload/:id", controllers.BaixaArquivo)
		grupo.POST("/documentos", controllers.CriaNovoArquivo)
		grupo.PUT("/documentos/:id", controllers.AtualizaArquivo)
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
