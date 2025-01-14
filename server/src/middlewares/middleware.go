package middlewares

import (
	"adpc/src/services"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const JWT_KEY_SIGNING = "meutokenjwt"

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

	jwt := services.JwtToken{SigningKey: JWT_KEY_SIGNING}

	if !jwt.VerifyToken(token) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid Token",
		})
		c.Abort()
		return
	} 

	c.Next()
}