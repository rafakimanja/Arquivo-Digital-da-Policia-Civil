package services

import (
	"adpc/src/models"

	"github.com/golang-jwt/jwt/v5"
)

type JwtToken struct {
	SigningKey string
}

func (j *JwtToken) CreateToken(usuario models.Usuario) (string, error) {
	
	claims := jwt.MapClaims{
		"sub":       usuario.RG,
		"name":      usuario.Nome,
		"superuser": usuario.Admin,
	}
	//generate token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	//signtoken
	return token.SignedString([]byte(j.SigningKey))
}

func (j *JwtToken) VerifyToken() ([]byte, error) {
	return []byte("assigned"), nil
}
