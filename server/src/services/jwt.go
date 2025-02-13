package services

import (
	"adpc/src/models"
	"fmt"
	"time"

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
		"exp": time.Now().Add(time.Minute * 90).Unix(),
	}
	
	//generate token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	//signtoken
	return token.SignedString([]byte(j.SigningKey))
}

func (j *JwtToken) VerifyToken(tokenStr string) bool {
	//parse
	token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok{
			return nil, fmt.Errorf("token invalido")
		}
		return []byte(j.SigningKey), nil
	})
	if err != nil{
		return false
	}

	//check validity
	if !token.Valid {
		return false
	}

	//claims token
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return false
	}

	//check expire time
	expiracao := claims["exp"].(float64)
	return time.Now().Unix() <= int64(expiracao)
}
