```
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:18.0.1 start-dev
```
``` http://localhost:8080/admin/master/console/ ```
``` https://www.keycloak.org/getting-started/getting-started-docker#_start_keycloak ```
