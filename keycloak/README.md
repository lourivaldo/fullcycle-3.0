### Tutorial docker
```
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:18.0.1 start-dev
```
``` 
https://www.keycloak.org/getting-started/getting-started-docker#_start_keycloak 
```
Abrir keycloak
``` 
http://localhost:8080/admin/master/console/ 
```

### Golang
```
go mod init goclient
go run main.go
```

### Exemplo URL callback
```
http://localhost:8081/auth/callback?
state=123&
session_state=b6a55b01-497f-4fc0-8b39-4108f20ba27a&code=0131d4ac-3d8a-453c-a316-ac0770dd555b.b6a55b01-497f-4fc0-8b39-4108f20ba27a.bff14173-d558-48d2-b62c-1dcded4db15b
```