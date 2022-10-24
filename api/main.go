package main

import (
	"fmt"
	"log"
	"os"

	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/enchant97/wiki-and-notes/api/db"
	"github.com/enchant97/wiki-and-notes/api/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	var appConfig core.AppConfig
	if err := appConfig.ParseConfig(); err != nil {
		log.Fatalln(err)
		os.Exit(1)
	}

	r := gin.Default()

	routes.InitRoutes(r, appConfig)

	if err := db.InitDB(appConfig.SQLitePath); err != nil {
		log.Fatalln(err)
		os.Exit(1)
	}

	r.Run(fmt.Sprintf("%s:%d", appConfig.Host, appConfig.Port))
}
