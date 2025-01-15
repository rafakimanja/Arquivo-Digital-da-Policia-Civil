package controllers

import (
	"adpc/src/models"
	"adpc/src/services"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func Hello(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Bem-Vindo ao Sistema Gerenciador de Arquivos da Policia Civil",
	})
}

func LoginAcess(c *gin.Context) {

	type LoginUser struct {
		RG    string
		Senha string
	}

	var userLogin LoginUser

	if err := c.ShouldBindJSON(&userLogin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
	}

	for _, user := range models.Usuarios {
		if user.RG == userLogin.RG && user.Senha == userLogin.Senha {

			err := godotenv.Load()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Erro interno do servidor",
				})
				return
			}

			jwt := services.JwtToken{SigningKey: os.Getenv("JWT_KEY_SIGNING")}

			token, err := jwt.CreateToken(user)

			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Error generated token",
				})
				return
			}

			c.JSON(200, gin.H{
				"message": "login sucefull",
				"token":   token,
			})
			return
		}
	}

	c.JSON(401, gin.H{
		"message": "User Not Found",
	})
}