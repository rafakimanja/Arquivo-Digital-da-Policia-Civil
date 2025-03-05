package middlewares

import (
	"adpc/src/services"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func AuthMiddleware(c *gin.Context){

	authHeader := c.GetHeader("Authorization")

	if len(authHeader) == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid Token",
		})
		c.Abort()
		return
	}

	parts := strings.Split(authHeader, " ")
	if(parts[0] != "Bearer"){
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid Format Token",
		})
		c.Abort()
		return
	}

	token := parts[1]

	err := godotenv.Load()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro interno do servidor middleware",
		})
		return
	}

	jwt := services.JwtToken{SigningKey: os.Getenv("JWT_KEY_SIGNING")}

	if !jwt.VerifyToken(token) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid Token",
		})
		c.Abort()
		return
	} 

	c.Next()
}