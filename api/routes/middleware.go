package routes

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func AppConfigMiddleware(config core.AppConfig) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Set("AppConfig", config)
		ctx.Next()
	}
}

func AuthenticationMiddleware(authRequired bool, config core.AppConfig) gin.HandlerFunc {
	// TODO tidy, it works but the code is messy
	// TODO validate user id with DB (ensure they still exist)
	secret := []byte(config.Secret)

	return func(ctx *gin.Context) {
		if _, exists := ctx.Get("AuthenticatedUserID"); exists {
			// skip auth processing as it has already been set by prev middleware
			ctx.Next()
			return
		}
		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" {
			if authRequired {
				ctx.AbortWithStatus(http.StatusUnauthorized)
				return
			}
		} else {
			// get auth header
			authValues := strings.Split(authHeader, " ")
			if len(authValues) != 2 || authValues[0] != "Bearer" {
				ctx.AbortWithStatus(http.StatusUnauthorized)
				return
			}
			// validate jwt
			token, err := jwt.ParseWithClaims(authValues[1], &jwt.RegisteredClaims{}, func(t *jwt.Token) (interface{}, error) {
				if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
					// prevent attacks from using an unexpected algorithm
					return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
				}
				return secret, nil
			})
			if err != nil {
				ctx.AbortWithStatus(http.StatusUnauthorized)
				return
			}
			claims := token.Claims.(*jwt.RegisteredClaims)
			if claims.Subject == "" || claims.Valid() != nil {
				ctx.AbortWithStatus(http.StatusUnauthorized)
				return
			}
			userID, ok := strconv.Atoi(claims.Subject)
			if ok != nil {
				ctx.AbortWithStatus(http.StatusUnauthorized)
				return
			}
			ctx.Set("AuthenticatedUserID", uint(userID))
		}
		ctx.Next()
	}
}
