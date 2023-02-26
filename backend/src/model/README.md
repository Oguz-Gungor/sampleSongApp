## E/R Diagram

```mermaid
 erDiagram
    TRACK }o--o{ PLAYLIST : PlaylistTrack
    USER {
        int id
        string name
        string email
        string password
    }
    TRACK{
        string track 
        string artist 
        string album 
        string link 
        string image 
        string id 
    }
    PLAYLIST{
         string id
         string name
         number count
    }
    USER ||--o{ PLAYLIST : UserPlaylist
    TRACK ||--o{ USER : Anthem
```