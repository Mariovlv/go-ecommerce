package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mariovlv/go-commerce/initializers"
	"github.com/mariovlv/go-commerce/models"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	var body struct {
		Email    string
		Password string
		Username string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "error while binding body",
		})
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "error hashing password",
		})
	}

	user := models.User{
		Username: body.Username,
		Email:    body.Email,
		Password: string(hash),
	}

	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "error creating user record",
		})
	}

	c.JSON(http.StatusOK, gin.H{})
}

func SignIn(c *gin.Context) {

}
