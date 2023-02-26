
# Proje Başlığı

SongApp backend to manage CRUD actions & middleware

## API Kullanımı

### Authotization & Authentication

#### Login
API to sign in with existing user credentials

```http
  GET /login
```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Name of user |
| `password` | `string` | **Required**. Password of user |

#### Register
API to sign up with new credentials

```http
  POST /register
```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Name of user |
| `email` | `string` | **Required**. Email of user |
| `password` | `string` | **Required**. Password of user |


#### Validate
API to validate JWT token 

```http
  GET /validate
```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `JWT Token` | `string` | **Required**. JWT token to be validated |

### Tracks

#### Get Tracks of playlist

```http
  GET /tracks
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `JWT Token` | `string` | **Required**. JWT token to be validated |
| `id` | `string` | **Required**. Id of playlist tracks belongs to |

#### Add Track to playlist

```http
  POST /tracks
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `JWT Token` | `string` | **Required**. JWT token to be validated |
| `trackInfo` | `TrackInfo` | **Required**. Information of track to be added|
| `playlistId` | `number` | **Required**. Id of playlist track will be added to|

#### Remove Track from playlist

```http
  DELETE /tracks
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `JWT Token` | `string` | **Required**. JWT token to be validated |
| `trackId` | `string` | **Required**. Information of track to be added|
| `playlistId` | `number` | **Required**. Id of playlist track will be added to|

### Playlists

#### Get Tracks of playlist

```http
  GET /playlists
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `JWT Token` | `string` | **Required**. JWT token to be validated |

#### Add Track to playlist

```http
  POST /playlists
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `JWT Token` | `string` | **Required**. JWT token to be validated |
| `playlistData` | `PlaylistData` | **Required**. Information of playlist to be added|

### Anthem

#### Get anthem for user

```http
  GET /anthem
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `JWT Token` | `string` | **Required**. JWT token to be validated |

#### Add Track to playlist

```http
  POST /anthem
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `JWT Token` | `string` | **Required**. JWT token to be validated |
| `trackInfo` | `TrackInfo` | **Required**. Information of track to be set as anthem|

### Spotify

#### Get Spotify client token

```http
  GET /spotifyToken
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `JWT Token` | `string` | **Required**. JWT token to be validated |