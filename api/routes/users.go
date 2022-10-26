package routes

import (
	"net/http"

	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/enchant97/wiki-and-notes/api/db"
	"github.com/gin-gonic/gin"
)

func postUser(ctx *gin.Context) {
	var bodyValues core.CreateUser
	if err := ctx.ShouldBindJSON(&bodyValues); err != nil {
		ctx.AbortWithStatus(http.StatusBadGateway)
		return
	}
	user := db.User{
		Username: bodyValues.Username,
	}
	if result := db.DB.Create(&user); result.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, result.Error)
		return
	}
	ctx.JSON(http.StatusCreated, user)
}

func getUserMe(ctx *gin.Context) {
	userID := ctx.MustGet("AuthenticatedUserID")
	var user db.User
	if response := db.DB.First(&user, "id = ?", userID); response.Error != nil {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}
	ctx.JSON(http.StatusOK, user)
}
