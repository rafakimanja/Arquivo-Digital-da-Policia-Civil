package controllers

import (
	"adpc/src/database"
	"adpc/src/models"
	"adpc/src/services"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func LoginAcess(c *gin.Context) {

	type LoginUser struct {
		RG    string
		Senha string
	}

	var userLogin LoginUser
	var user models.Usuario

	if err := c.ShouldBindJSON(&userLogin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
	}

	database.DB.First(&user, userLogin)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "User Not Found",
		})
		return
	}
	
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

	c.JSON(http.StatusOK, gin.H{
		"message": "login sucefull",
		"token":   token,
	})

}