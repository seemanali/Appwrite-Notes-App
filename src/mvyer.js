const config = {
    Project_Id: String(import.meta.env.VITE_PROJECT_ID),
    DataBaseId: String(import.meta.env.VITE_DATABASE_ID),
    CollectionIdForNotes : String(import.meta.env.VITE_COLLECTION_ALL_NOTES),
    CollectionIdForUsers : String(import.meta.env.VITE_COLLECTION_UserInfo),
    BucketIdForUsers : String(import.meta.env.VITE_BUCKET_USERS)

}




export default config;