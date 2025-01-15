package controllers

import (
	"adpc/src/models"
	"github.com/gin-gonic/gin"
)

func ExibeConfSistema(c *gin.Context) {
	c.JSON(200, models.ConfSistema)
}
