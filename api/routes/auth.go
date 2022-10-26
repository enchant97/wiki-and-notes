package routes

import (
	"fmt"
	"net/http"
	"time"

	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/enchant97/wiki-and-notes/api/db"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func postInternalToken(ctx *gin.Context) {
	config := ctx.MustGet("AppConfig").(core.AppConfig)
	var loginDetails core.Login
	if err := ctx.ShouldBindJSON(&loginDetails); err != nil {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var user db.User
	if result := db.DB.First(&user, "username = ?", loginDetails.Username); result.Error != nil {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// TODO add 'exp' for expiry time
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": fmt.Sprintf("%d", user.ID),
		"nbf": time.Now().UTC().Add(-5 * time.Second).Unix(),
	})
	tokenString, err := token.SignedString([]byte(config.Secret))
	if err != nil {
		panic(err)
	}
	ctx.String(http.StatusCreated, tokenString)
}
