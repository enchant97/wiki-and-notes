package routes

import (
	"net/http"

	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/enchant97/wiki-and-notes/api/db"
	"github.com/gin-gonic/gin"
)

func postBook(ctx *gin.Context) {
	var bodyValues core.CreateBook
	if err := ctx.ShouldBindJSON(&bodyValues); err != nil {
		ctx.AbortWithStatus(http.StatusBadGateway)
		return
	}
	book := db.Book{
		ShelfID:     bodyValues.ShelfID,
		Title:       bodyValues.Title,
		SystemTitle: bodyValues.SystemTitle,
	}
	if result := db.DB.Create(&book); result.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, result.Error)
		return
	}
	ctx.JSON(http.StatusCreated, book)
}

func getBookByID(ctx *gin.Context) {
	bookID := ctx.Param("bookID")
	var book db.Book
	if result := db.DB.First(&book, "id = ?", bookID); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	ctx.JSON(http.StatusOK, book)
}

func deleteBookByID(ctx *gin.Context) {
	bookID := ctx.Param("bookID")
	if result := db.DB.Delete(&db.Book{}, bookID); result.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, result.Error)
		return
	}
	ctx.Status(http.StatusNoContent)
}

func getPagesByBookID(ctx *gin.Context) {
	bookID := ctx.Param("bookID")
	var pages []db.Page
	if result := db.DB.Where("book_id = ?", bookID).Find(&pages); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	ctx.JSON(http.StatusOK, pages)
}
