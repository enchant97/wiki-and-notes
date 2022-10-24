package routes

import (
	"io"
	"net/http"
	"strconv"

	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/enchant97/wiki-and-notes/api/db"
	"github.com/gin-gonic/gin"
)

func postPage(ctx *gin.Context) {
	var bodyValues core.CreatePage
	if err := ctx.ShouldBindJSON(&bodyValues); err != nil {
		ctx.AbortWithStatus(http.StatusBadGateway)
		return
	}
	page := db.Page{
		BookID:      bodyValues.BookID,
		Title:       bodyValues.Title,
		SystemTitle: bodyValues.SystemTitle,
	}
	if result := db.DB.Create(&page); result.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, result.Error)
		return
	}
	ctx.JSON(http.StatusCreated, page)
}

func getPageByID(ctx *gin.Context) {
	pageID := ctx.Param("pageID")
	var page db.Page
	if result := db.DB.First(&page, "id = ?", pageID); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	ctx.JSON(http.StatusOK, page)
}

func deletePageByID(ctx *gin.Context) {
	pageID := ctx.Param("pageID")
	if result := db.DB.Delete(&db.Page{}, pageID); result.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, result.Error)
		return
	}
	ctx.Status(http.StatusNoContent)
}

func postPageContent(ctx *gin.Context) {
	pageID := ctx.Param("pageID")
	// HACK this is really not good
	body, _ := io.ReadAll(ctx.Request.Body)
	pageIDInt, _ := strconv.Atoi(pageID)
	pageContent := db.PageContent{
		PageID:  uint(pageIDInt),
		Content: string(body),
	}

	if result := db.DB.Create(&pageContent); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	ctx.Status(http.StatusNoContent)
}

func getPageContent(ctx *gin.Context) {
	pageID := ctx.Param("pageID")
	var pageContent db.PageContent
	if result := db.DB.First(&pageContent, "id = ?", pageID); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	ctx.String(http.StatusOK, pageContent.Content)
}
