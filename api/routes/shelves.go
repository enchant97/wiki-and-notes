package routes

import (
	"net/http"

	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/enchant97/wiki-and-notes/api/db"
	"github.com/gin-gonic/gin"
)

func postShelf(ctx *gin.Context) {
	var bodyValues core.CreateShelf
	if err := ctx.ShouldBindJSON(&bodyValues); err != nil {
		ctx.AbortWithStatus(http.StatusBadGateway)
		return
	}
	shelf := db.Shelf{
		OwnerID:     bodyValues.OwnerID,
		Title:       bodyValues.Title,
		SystemTitle: bodyValues.SystemTitle,
	}
	if result := db.DB.Create(&shelf); result.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, result.Error)
		return
	}
	ctx.JSON(http.StatusCreated, shelf)
}

func getShelfByID(ctx *gin.Context) {
	shelfID := ctx.Param("shelfID")
	var shelf db.Shelf
	if result := db.DB.First(&shelf, "id = ?", shelfID); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	ctx.JSON(http.StatusOK, shelf)
}

func deleteShelfByID(ctx *gin.Context) {
	shelfID := ctx.Param("shelfID")
	if result := db.DB.Delete(&db.Shelf{}, shelfID); result.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, result.Error)
		return
	}
	ctx.Status(http.StatusNoContent)
}

func getBooksByShelfID(ctx *gin.Context) {
	shelfID := ctx.Param("shelfID")
	var books []db.Book
	if result := db.DB.First(&books, "shelf_id = ?", shelfID); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	ctx.JSON(http.StatusOK, books)
}
