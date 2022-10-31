package routes

import (
	"net/http"

	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/enchant97/wiki-and-notes/api/db"
	"github.com/gin-gonic/gin"
)

func postConvertUrl(ctx *gin.Context) {
	var titleParts core.URLTitleParts
	if err := ctx.ShouldBindJSON(&titleParts); err != nil {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}
	var shelf db.Shelf
	var book db.Book
	var page db.Page
	if result := db.DB.First(&shelf, "system_title = ?", titleParts.ShelfTitle); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	if titleParts.BookTitle != nil {
		if result := db.DB.First(book, "shelf_id = ?, system_title = ?", shelf.ID, titleParts.BookTitle); result.Error != nil {
			ctx.AbortWithError(http.StatusNotFound, result.Error)
			return
		}
	}
	if book.ID != 0 && titleParts.PageTitle != nil {
		if result := db.DB.First(page, "book_id = ?, system_title = ?", book.ID, titleParts.PageTitle); result.Error != nil {
			ctx.AbortWithError(http.StatusNotFound, result.Error)
			return
		}
	}
	ctx.JSON(
		http.StatusOK,
		core.ConvertedIDs{
			ShelfID: shelf.ID,
			BookID:  &book.ID,
			PageID:  &page.ID,
		})
}
