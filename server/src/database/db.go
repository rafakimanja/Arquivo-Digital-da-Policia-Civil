package database

import (
	"adpc/src/models"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB *gorm.DB
	err error
)

func ConectaDB() (*gorm.DB, error) {
	err = godotenv.Load()
	if err != nil {
		return nil, err
	}

	strConexao := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), 
	os.Getenv("DB_NAME"), os.Getenv("DB_PORT"))

	DB, err = gorm.Open(postgres.Open(strConexao))
	if err != nil {
		log.Panic("Erro ao conectar com o banco de dados")
		return nil, err
	}

	DB.AutoMigrate(&models.Usuario{})
	DB.AutoMigrate(&models.Sistema{})
	DB.AutoMigrate(&models.Documento{})

	return DB, nil
}