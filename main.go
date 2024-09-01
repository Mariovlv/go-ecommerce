package main

import (
	"github.com/gin-gonic/gin"
	"github.com/mariovlv/go-commerce/controllers"
	"github.com/mariovlv/go-commerce/initializers"
)

func init() {
	initializers.LoadVariables()
	initializers.ConnectToDatabase()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()

	r.GET("/ping", controllers.Ping)
	r.POST("/signup", controllers.SignUp)

	r.Run(":8080")
}
