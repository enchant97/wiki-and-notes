package routes

import (
	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/gin-gonic/gin"
)

func AppConfigMiddleware(config core.AppConfig) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set("AppConfig", config)
		ctx.Next()
	}
}
