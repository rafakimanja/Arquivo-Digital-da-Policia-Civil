package services

import (
	"os"
)

type Diretorio struct {
	Caminho string
}

// func (d *Diretorio) CriaCaminho(categoria string) (string, error){

// 	dirPath := d.Caminho+"/"+categoria

// 	if _, err := os.Stat(dirPath); os.IsNotExist(err) {
// 		err := os.Mkdir(dirPath, 0755)
// 		if err != nil {
// 			return "", err
// 		}
// 		return dirPath, nil
// 	} else {
// 		return "", err
// 	}
// }

func (d *Diretorio) GetCaminho() string {
	return d.Caminho
}

func (d *Diretorio) SetCaminho(caminho string) {
	d.Caminho = caminho
}

func (d *Diretorio) ValidaCaminho() bool {
	if _, err := os.Stat(d.Caminho); os.IsNotExist(err){
		return false
	} else {
		return true
	}
}

func (d *Diretorio) CriaPasta() bool {
	err := os.Mkdir(d.Caminho, 0755)
	if err != nil {
		return false
	} else {
		return true
	}
}