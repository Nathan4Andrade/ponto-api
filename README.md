localhost:4000

Criar Manager
POST
/employees/manager

```json
{
  "user": "admin@user",
  "name": "admin name",
  "password": "123456"
}
```

Login
POST
/auth/sign-in

```json
{
  "user": "admin@user",
  "password": "123456"
}
```

---

Criar Subordinate
POST
/employees/subordinate

```json
{
  "user": "subordinate@user",
  "name": "subordinate name",
  "password": "123456"
}
```

Ver todos os Pontos
GET
/points/manager/allPoints

```json
[
  {
    "id": 3,
    "employeeId": 4,
    "date": "2024-01-08",
    "status": "PENDING APPROVAL",
    "entryTime": "16:42:22",
    "exitTime": "16:43:05",
    "justification": "Sai mais cedo pois estava doente no dia",
    "createdAt": "2024-01-08T19:42:22.158Z",
    "updatedAt": "2024-01-08T19:46:03.230Z"
  }
]
```

Ver Ponto por Subordinate
GET
/points/manager/:employeeId

```json
{
  "id": 3,
  "employeeId": 4,
  "date": "2024-01-08",
  "status": "PENDING APPROVAL",
  "entryTime": "16:42:22",
  "exitTime": "16:43:05",
  "justification": "Sai mais cedo pois estava doente no dia",
  "createdAt": "2024-01-08T19:42:22.158Z",
  "updatedAt": "2024-01-08T19:46:03.230Z"
}
```

Aprovar ponto
PUT
/points/manager/:pointId/approve

```json
{
  "id": 3,
  "employeeId": 4,
  "date": "2024-01-08",
  "status": "APPROVED",
  "entryTime": "16:42:22",
  "exitTime": "16:43:05",
  "justification": "Sai mais cedo pois estava doente no dia",
  "createdAt": "2024-01-08T19:42:22.158Z",
  "updatedAt": "2024-01-09T14:32:02.658Z"
}
```

---

Bater ponto
POST
/points

```json
{
  "id": 4,
  "employeeId": 4,
  "date": "2024-01-09",
  "status": "PENDING",
  "entryTime": "11:32:42",
  "exitTime": null,
  "justification": null,
  "createdAt": "2024-01-09T14:32:42.631Z",
  "updatedAt": "2024-01-09T14:32:42.631Z"
}
```

Justificar ponto
PUT
/points/:pointId/justify

```json
{
  "id": 3,
  "employeeId": 4,
  "date": "2024-01-08",
  "status": "PENDING APPROVAL",
  "entryTime": "16:42:22",
  "exitTime": "16:43:05",
  "justification": "Sai mais cedo pois estava doente no dia",
  "createdAt": "2024-01-08T19:42:22.158Z",
  "updatedAt": "2024-01-09T14:33:50.437Z"
}
```

Ver meus Pontos
GET
/points

```json
[
  {
    "id": 4,
    "employeeId": 4,
    "date": "2024-01-09",
    "status": "PENDING",
    "entryTime": "11:32:42",
    "exitTime": null,
    "justification": null,
    "createdAt": "2024-01-09T14:32:42.631Z",
    "updatedAt": "2024-01-09T14:32:42.631Z"
  },
  {
    "id": 3,
    "employeeId": 4,
    "date": "2024-01-08",
    "status": "PENDING APPROVAL",
    "entryTime": "16:42:22",
    "exitTime": "16:43:05",
    "justification": "Sai mais cedo pois estava doente no dia",
    "createdAt": "2024-01-08T19:42:22.158Z",
    "updatedAt": "2024-01-09T14:33:50.437Z"
  }
]
```

Finalizar Ponto
/PUT
/points/:pointId/end

```json
{
  "id": 4,
  "employeeId": 4,
  "date": "2024-01-09",
  "status": "FINISHED",
  "entryTime": "11:32:42",
  "exitTime": "11:50:53",
  "justification": null,
  "createdAt": "2024-01-09T14:32:42.631Z",
  "updatedAt": "2024-01-09T14:50:53.927Z"
}
```
