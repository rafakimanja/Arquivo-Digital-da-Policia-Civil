package main

import (
	"adpc/src/database"
	"adpc/src/routes"
	"log"
)

func main(){
	_, err := database.ConectaDB()
	if err != nil {
		log.Fatal(err.Error())
	}
	routes.HandleRequest()
}