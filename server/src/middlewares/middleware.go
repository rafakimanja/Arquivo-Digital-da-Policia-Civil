package middlewares

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func BasicMiddleware(c *gin.Context){
	fmt.Println("Teste Middleware")
	c.Next()
}